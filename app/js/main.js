define([
  'jquery',
  'data/games',
  'views/board',
  'views/controls',
  'model/app',
  'model/board'
], function($, games, boardView, controlsView, app, BoardModel) {
  'use strict';

  $(function() {

    // TODO: cache current game data

    var board = new BoardModel(games[0]);

    boardView.render(board);
    controlsView.render();

    app.board = board;
  });
});
