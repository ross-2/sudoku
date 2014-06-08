define([
  'jquery',
  'hbs!templates/controls'
], function($, controlsTemplate) {

  'use strict';

  return {
    render: function() {

      var controls = controlsTemplate();

      $('#controls').empty().append(controls);

      this.attachButtonEvents();

      return this;
    },

    attachButtonEvents: function() {
      $('#controls').click(function(e) {

        var $target = $(e.target);
        console.log($target.text());
      });

      return this;
    }
  };
});