define([
  'app',
  'models/cell'
], function(app, Cell) {

  'use strict';

  var Board = function(data) {
    this.data = this.parse(data);

    app.on('restart', function() {

      this.data = this.parse(app.games[app.currentGame]);

      app.trigger('game-start');
    }.bind(this));

    app.on('newGame', function() {

      var randomGame = Math.floor(Math.random() * app.games.length);

      // lazy prevention of same-game
      if (randomGame === app.currentGame) {
        app.currentGame === app.games.length - 1 ?
          randomGame = 0 :
          randomGame++;
      }

      this.data = this.parse(app.games[randomGame]);
      app.currentGame = randomGame;

      app.trigger('game-start');

    }.bind(this));
  };

  Board.prototype.parse = function(data) {
    var rowedData = [];

    var that = this;

    this.cellsRemaining = 0;

    // parse out rows of nine characters each
    // from our input string
    var i = 0, len = data.length;

    while (i < len) {
      rowedData.push(data.slice(i, i + 9));
      i += 9;
    }

    // take each row and make a Cell out of each character
    return rowedData.map(function(row, rowIndex) {
      return row.split('').map(function(c, cellIndex) {
        (+c) || that.cellsRemaining++;
        return new Cell(c, rowIndex, cellIndex);
      });
    });
  };

  // just a convenience method. Could probably have just made this
  // inherit from array or copy over _ methods like backbone does.
  // seemed like that'd be an overkill here, although not just
  // accessing `.data` is probably an overkill
  Board.prototype.map = function() {
    return Array.prototype.map.apply(this.data, arguments);
  };

  Board.prototype.get = function(row, col) {
    return this.data[row][col];
  };

  Board.prototype.set = function(row, col, value) {
    var cell = this.get(row, col);

    if (cell.value === value) {
      return true;
    }

    // if the cell already has a value, it's about to get blanked out
    if (!cell.value && value) {
      this.cellsRemaining--;
    }
    else if (!value && cell.value) {
      this.cellsRemaining++;
    }

    cell.value = value;

    var result = this.validate(row, col);

    app.trigger('change');

    // if we're all out of cells and the last entry was valid,
    // let's validate everything else and then declare victory
    if (result && this.cellsRemaining === 0) {
      this.validateAll() && app.trigger('gameComplete');
    }

    return result;
  };

  // validate the value of a cell at the given coordinates
  Board.prototype.validate = function(row, col) {

    if (arguments.length < 2) {
      // validate every cell
      return this.validateAll();
    }

    if (!this.get(row, col).value) {
      return true;
    }

    return this.validateRow(row) &&
           this.validateColumn(col) &&
           this.validateSection(row, col);
  };

  Board.prototype.validateAll = function() {

    var
        // row/col coordinates
        row = 9, col = 9,

        // section coordinates
        i, j;

    while (row--) {
      if (!this.validateRow(row)) {
        return false;
      }
    }

    while (col--) {
      if (!this.validateColumn(col)) {
        return false;
      }
    }

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (!this.validateSection(i * 3, j * 3)) {
          return false;
        }
      }
    }

    return true;
  };

  Board.prototype.validateRow = function(rowIndex) {

    var seen = {};

    return !this.data[rowIndex].some(function(cell) {

      if (!cell.value) {
        return false;
      }

      if (seen[cell.value]) {
        return true;
      }

      seen[cell.value] = true;
      return false;
    });
  };

  Board.prototype.validateColumn = function(colIndex) {

    var seen = {};

    return !this.data.some(function(row) {
      var cell = row[colIndex];

      if (!cell.value) {
        return false;
      }

      if (seen[cell.value]) {
        return true;
      }

      seen[cell.value] = true;
      return false;
    });
  };

  // validate a 3x3 section of the puzzle
  Board.prototype.validateSection = function(row, col) {

    var value, i, j;

    // finds the top-left cell in a given section
    var sectionStartColumn = col - (col % 3);
    var sectionStartRow = row - (row % 3);

    var seen = {};

    for (i = sectionStartRow; i < sectionStartRow + 3; i++) {
      for (j = sectionStartColumn; j < sectionStartColumn + 3; j++) {

        value = this.get(i, j).value;

        if (!value) {
          continue;
        }

        if (seen[value]) {
          return false;
        }

        seen[value] = true;
      }
    }

    return true;
  };

  return Board;
});
