define([
  'jquery',
  'data/games',
  'views/board',
  'views/controls',
  'model/board'
], function($, games, boardView, controlsView, BoardModel) {
  'use strict';

  $(function() {

    // TODO: cache current game data

    var board = new BoardModel(games[0]);

    boardView.render(board);
    controlsView.render();


    board.validate(0, 2);
  });
});
