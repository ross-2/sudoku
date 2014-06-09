define([
  'chai',
  'data/games',
  'models/board'
], function(chai, games, Board) {

  'use strict';

  // phantomjs has some sort of problem with function.bind
  // see https://github.com/ariya/phantomjs/issues/10522
  // just pulling this from MDN to keep going
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          FNop = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof FNop && oThis ?
                    this :
                    oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      FNop.prototype = this.prototype;
      fBound.prototype = new FNop();

      return fBound;
    };
  }


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
