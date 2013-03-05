﻿/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/thread/list.html'
], function($, _, Backbone, tpl) {

  return Backbone.View.extend({
    template: _.template(tpl),

    initialize: function () {
      var Bootcamp = $.Bootcamp(),
        eventsProto = {
          "#nav a.add": 'addThread',
          "#nav a.menu": 'showNew'
        };

      this.events = Bootcamp.generateEvents(eventsProto);
    },

    addThread: function() {
      console.log('new thread about to add...');
      alert('addThread');
    },

    showNew: function() {
      console.log('show new threads...');
    },

    render: function() {
      var options = this.options,
        threads = options.threads,
        newMessages = options.newMessages;

      $(this.el).html(this.template({
        threads: threads,
        newMessages: newMessages
      }));
      return this;
    }
  });

});
