define([
  'jquery',
  'hbs!templates/keyboard'
], function($, keyboardTemplate) {

  'use strict';

  var Keyboard = function() {};

  Keyboard.prototype.init = function() {
    return this.render();
  };

  Keyboard.prototype.render = function() {
    var keyboard = keyboardTemplate();

    $('#keyboard').empty().append(keyboard);

    return this;
  };

  return Keyboard;
});
