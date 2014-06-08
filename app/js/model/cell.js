define(function() {

  'use strict';

  var Cell = function(value) {

    var n = +value;

      // was the cell a part of the original game board and
      // therefore immuatable?
    this.provided = !!n;

      // game boards stored empty values as '0', but we don't
      // want that in the input
    this.value = n ? n : '';

    // stores user notes so they can keep track of potential
    // values
    this.annotations = [];
  };

  return Cell;

});