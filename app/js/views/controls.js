define([
  'jquery',
  'hbs!templates/controls'
], function($, controlsTemplate) {

  'use strict';

  var Controls = function() {};

  Controls.prototype.init = function() {
    return this.render();
  };

  Controls.prototype.render = function() {
    var controls = controlsTemplate();

    $('#controls').empty().append(controls);

    return this;
  };

  return Controls;
});