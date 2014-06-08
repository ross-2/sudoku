define([
  'jquery',
  'model/app',
  'hbs!templates/cell'
], function($, app, cellTemplate) {

  'use strict';

  return {
    render: function(board) {

      var rows = board.map(function(rowData) {

        var $row = $('<tr>');
        $row.append(rowData.map(function(cell) {
          return cellTemplate(cell);
        }));

        return $row;
      });

      $('#board').empty().append(rows);

      this.attachEvents();

      return this;
    },

    attachEvents: function() {
      $('#board').change(function(e) {

        var $target = $(e.target);
        $target.removeClass('cell-error');

        var $cell = $target.parent();

        var col = $cell[0].cellIndex;
        var row = $cell.parent()[0].rowIndex;

        console.log($target.val());

        app.board.set(row, col, +$target.val());

        if (!app.board.validate(row, col)) {
          $target.addClass('cell-error');
        }
      });
    }
  };
});