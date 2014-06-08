define([
  'chai',
  'data/games',
  'model/board'
], function(chai, games, Board) {

  'use strict';

  var assert = chai.assert;

  describe('Game board parsing', function() {
    it('Each game board in the sample data should be parsable and valid', function() {

      var boards;

      try {
        boards = games.map(function(game) {
          return new Board(game);
        });

        assert.ok(boards.every(function(game) {
          return game.validate();
        }));
      }
      catch (e) {
        assert.ok(false);
      }
    });

    it('A game board should have nine rows and nine columns', function() {

      var data = new Board('003020600900305001001806400008102900700000008006708200002609500800203009005010300').data;

      assert.equal(data.length, 9);
      assert.equal(data[0].length, 9);
    });

    it('Invalid entries should be invalid', function() {
      var boardWithInvalidSection = new Board('103020600900305001001806400008102900700000008006708200002609500800203009005010300');

      assert.ok(!boardWithInvalidSection.validateSection(0, 0));
      assert.ok(!boardWithInvalidSection.validate());

      var boardWithInvalidRow = new Board('203020600900305001001806400008102900700000008006708200002609500800203009005010300');

      assert.ok(!boardWithInvalidRow.validateRow(0, 0));
      assert.ok(!boardWithInvalidRow.validate());


      var boardWithInvalidColumn = new Board('803020600900305001001806400008102900700000008006708200002609500800203009005010300');

      assert.ok(!boardWithInvalidColumn.validateColumn(0, 0));
      assert.ok(!boardWithInvalidColumn.validate());
    });

  });

  mocha.run();

});
