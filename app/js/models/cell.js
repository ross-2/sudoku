define(function() {

  'use strict';

  var Cell = function(value) {

    var n = +value;

    // was the cell a part of the original game board and
    // therefore immuatable?
    this.provided = !!n;

    // game boards store empty values as '0', but we don't
    // want that
    this.value = n ? n : '';
  };

  return Cell;

});
