define([
  'model/cell'
], function(Cell) {

  'use strict';

  function parse(data) {
    var rowedData = [];

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
        return new Cell(c, rowIndex, cellIndex);
      });
    });
  }

  var Board = function(data) {
    this.data = parse(data);
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

    cell.value = value;
  };

  // validate the value of a cell at the given coordinates
  Board.prototype.validate = function(row, col) {

    if (arguments.length < 2) {
      // validate every cell
      return this.validateAll();
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

  Board.prototype.validateSection = function(row, col) {

    var value, i, j;

    var sectionStartColumn = col - (col % 3);
    var sectionStartRow = col - (col % 3);

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