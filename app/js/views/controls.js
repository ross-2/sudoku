define([
  'jquery',
  'hbs!templates/controls'
], function($, controlsTemplate) {

  'use strict';

  var Controls = function() {};

  Controls.prototype.init = function() {
    return this.render().attachEvents();
  };

  Controls.prototype.render = function() {
    var controls = controlsTemplate();

    $('#controls').empty().append(controls);

    return this;
  };

  Controls.prototype.attachEvents = function() {
    $('#controls').click(function(e) {

      var $target = $(e.target);
      console.log($target.text());
    });

    return this;
  };

  return Controls;
});