define([
  'app',
  'jquery',
  'data/games',
  'views/board',
  'views/controls',
  'views/status',
  'model/board'
], function(app, $, games, BoardView, ControlsView, StatusView, BoardModel) {
  'use strict';

  $(function() {

    // TODO: cache current game data

    var board = new BoardModel(games[0]);
    app.board = board;

    var boardView = new BoardView(board);
    var controlsView = new ControlsView();
    var statusView = new StatusView();

    boardView.init();
    controlsView.init();
    statusView.init();
  });
});
