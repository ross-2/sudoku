/*
 * Maintains global state and provides pub/sub
 */
define(function() {

  'use strict';

  var handlers = {};

  return {

    // simple pub sub. Functions are expected to be bound
    // to a scope on their own
    on: function(message, fn) {
      if (handlers[message]) {
        handlers[message].push(fn);
      }
      else {
        handlers[message] = [fn];
      }
    },

    trigger: function(message) {
      if (!handlers[message]) {
        return;
      }

      handlers[message].forEach(function(fn) {
        fn();
      });
    }
  };
});