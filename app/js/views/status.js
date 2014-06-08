define([
  'app',
  'jquery',
  'hbs!templates/status'
], function(app, $, statusTemplate) {

  'use strict';

  var Status = function() {
    app.on('change', function() {
      this.render();
    }.bind(this));
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