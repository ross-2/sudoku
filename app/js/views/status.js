define([
  'app',
  'jquery',
  'hbs!templates/status'
], function(app, $, statusTemplate) {

  'use strict';

  var Status = function() {
    var render = this.render.bind(this);
    app.on('change', render);
    app.on('game-start', render);
  };

  Status.prototype.init = function() {
    return this.render();
  };

  Status.prototype.render = function() {

    if (!app.board) {
      return;
    }

    var statusView = statusTemplate({
      count: app.board.cellsRemaining
    });

    $('#status').empty().append(statusView);

    return this;
  };

  return Status;
});
