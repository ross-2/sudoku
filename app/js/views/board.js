define([
  'jquery',
  'hbs!templates/cell'
], function($, cellTemplate) {

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

      return this;
    }
  };
});