define([
  'app',
  'views/board',
  'views/keyboard',
  'views/status'
], function(app, BoardView, KeyboardView, StatusView) {

  'use strict';

  var GameView = function() {
    app.on('gameComplete', function() {

      var cells = $('#board').find('td').sort(function(e1, e2) {

        var t1 = $(e1).text().trim();
        var t2 = $(e2).text().trim();

        if (t1 === t2) {
          return 0;
        }

        return t1 > t2 ? 1 : -1;
      }).toArray();

      function showVictory() {
        $('#victory').addClass('victory-fadeIn');
      }

      (function doGameDoneAnimationStep() {
        if (!cells.length) {

          showVictory();
          return;
        }

        var cell = cells.shift();

        $(cell).addClass('gameboard-cell-complete');

        window.requestAnimationFrame(doGameDoneAnimationStep);
      }());

    });
  };

  GameView.prototype.init = function() {
    this.render().attachEvents();
  };

  GameView.prototype.render = function() {
    this.boardView = new BoardView();
    this.keyboardView = new KeyboardView();
    this.statusView = new StatusView();

    this.boardView.init();
    this.keyboardView.init();
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

    $('#keyboard').click(function(e) {
      var val = $(e.target).data('value');

      this.setSelectedCellValue(val);
    }.bind(this));

    $('#restartButton').click(function() {
      app.trigger('restart');
    });

    $('.js-new-game').click(function() {
      app.trigger('newGame');
    });

    return this;
  };

  GameView.prototype.setSelectedCellValue = function(val) {
    app.trigger('setCellValue', val);
  };

  return GameView;
});
