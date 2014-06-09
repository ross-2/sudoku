define([
  'app',
  'jquery',
  'models/board',
  'hbs!templates/cell'
], function(app, $, BoardModel, cellTemplate) {

  'use strict';

  var Board = function() {};

  Board.prototype.init = function() {

    app.on('game-start', function() {

      // clear out the victory message, if it's around
      $('#victory').removeClass('victory-fadeIn');

      this.render();
    }.bind(this));

    app.on('setCellValue', function(val) {
      this.setSelectedCellValue(val);
    }.bind(this));

    return this.render().attachEvents();
  };

  Board.prototype.render = function() {
    var rows = app.board.map(function(rowData) {
      var $row = $('<tr class=gameboard-row>');
      $row.append(rowData.map(function(cell) {
        return cellTemplate(cell);
      }));

      return $row;
    });

    $('#board').empty().append(rows);

    return this;
  };

  Board.prototype.attachEvents = function() {

    // provide "focus" simulation since I don't want to show a keyboard
    $('#board').click(function(e) {

      // skip out if we just won
      if ($('#victory').is(':visible')) {
        return;
      }

      var $target = $(e.target);

      if (!$target.hasClass('gameboard-cell') || $target.hasClass('gameboard-cell-provided')) {
        return;
      }

      $('#board').find('.gameboard-cell-selected').removeClass('gameboard-cell-selected');
      $target.addClass('gameboard-cell-selected');
    });

    return this;

  };

  // conveniently, tables keep track of their indices
  Board.prototype.getCoordinates = function($cell) {
    return {
      col: $cell[0].cellIndex,
      row: $cell.parent()[0].rowIndex
    };
  };

  Board.prototype.setSelectedCellValue = function(val) {
    var $cell = $('#board').find('.gameboard-cell-selected');

    // case when we haven't selected anything
    if (!$cell[0]) {
      return;
    }

    // filter out non-numeric entry and zeros
    $cell.text(val);

    $cell.removeClass('gameboard-cell-error');

    var coords = this.getCoordinates($cell);

    if (!app.board.set(coords.row, coords.col, val)) {
      $cell.addClass('gameboard-cell-error');
    }

    $cell.removeClass('gameboard-cell-selected');
  };

  return Board;
});
