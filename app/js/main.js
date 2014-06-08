define([
  'app',
  'jquery',
  'data/games',
  'model/board',
  'views/game'
], function(app, $, games, BoardModel, GameView) {
  'use strict';

  $(function() {

    // TODO: cache current game data

    var board = new BoardModel(games[0]);
    app.board = board;

    var gameView = new GameView();
    gameView.init(board);
  });
});
