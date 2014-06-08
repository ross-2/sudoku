define([
  'app',
  'views/board',
  'views/controls',
  'views/status'
], function(app, BoardView, ControlsView, StatusView) {

  'use strict';

  var GameView = function() {};

  GameView.prototype.init = function() {
    this.render().attachEvents();
  };

  GameView.prototype.render = function() {
    this.boardView = new BoardView();
    this.controlsView = new ControlsView();
    this.statusView = new StatusView();

    this.boardView.init();
    this.controlsView.init();
    this.statusView.init();

    return this;
  };

  GameView.prototype.attachEvents = function() {

    // handle user input simulating an input field.
    $('body').keydown(function(e) {

      var keyCode = e.which;

      var val;

      // backspace and delete. Not a huge fan of overriding these,
      // but based on the design of not rejecting invalid input
      // and instead hightlighting it, this was the only way
      if (keyCode === 8 || keyCode === 46) {
        e.preventDefault();
        val = '';
      }
      else if (keyCode < 49 || keyCode > 57) {
        return;
      }
      else {
        val = keyCode - 48;
      }

      this.setSelectedCellValue(val);

    }.bind(this));

    $('#controls').click(function(e) {
      var val = $(e.target).data('value');

      this.setSelectedCellValue(val);
    }.bind(this));

    return this;
  };

  GameView.prototype.setSelectedCellValue = function(val) {
    var $cell = $('#board').find('.gameboard-cell-selected');

    // filter out non-numeric entry and zeros
    $cell.text(val);

    $cell.removeClass('gameboard-cell-error');

    var coords = this.boardView.getCoordinates($cell);

    if (!app.board.set(coords.row, coords.col, val)) {
      $cell.addClass('gameboard-cell-error');
    }
  };

  return GameView;
});