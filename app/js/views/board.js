define([
  'app',
  'jquery',
  'hbs!templates/cell'
], function(app, $, cellTemplate) {

  'use strict';

  var Board = function() {};

  Board.prototype.init = function() {
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
      var $target = $(e.target);

      if (!$target.hasClass('gameboard-cell')) {
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

  return Board;
});
