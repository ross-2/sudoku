define([
  'jquery',
  'hbs!templates/cell'
], function($, cellTemplate) {

  'use strict';

  var Board = function(board) {
    this.board = board;
  };

  Board.prototype.init = function() {
    return this.render().attachEvents();
  };

  Board.prototype.render = function() {
    var rows = this.board.map(function(rowData) {
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

    // handle user input via the input field
    $('#board').change(function(e) {

      var $target = $(e.target);
      $target.parent().removeClass('gameboard-cell-error');

      var $cell = $target.parent();

      var coords = this.getCoordinates($cell);

      if (!this.board.set(coords.row, coords.col, +$target.val())) {
        $target.parent().addClass('gameboard-cell-error');
      }
    }.bind(this))

    // filter out non-numeric entry and zeros because the
    // tel input type doesn't enforce anything
    .keyup(function(e) {
      var $input = $(e.target);

      if (!$input.is('input')) {
        return;
      }

      $input.val($input.val().replace(/[0\D]/g, ''));
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

  return Board;
});
