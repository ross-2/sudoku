define([
  'app',
  'data/games',
  'models/board',
  'views/game'
], function(app, games, BoardModel, GameView) {

  'use strict';

  // TODO: cache current game data

  var board = new BoardModel(games[0]);
  app.board = board;

  app.games = games;
  app.currentGame = 0;

  var gameView = new GameView();
  gameView.init(board);

});
