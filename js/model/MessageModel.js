/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */
define([
  'backbone'
], function(Backbone) {

  return Backbone.Model.extend({
    defaults: {
      sender: {
        name: '',
        iconurl: '/css/images/user.png'
      },
      body: '',
      attachment: [],
      created: 0, // time in millis
      relative: '' // calculated, relative date: 1 hour, about 1 week, etc...
    },

    initialize: function() {
      var date = this.get('created');

      if ( date ) {
        this.set({
          relative: _.distanceOfTimeInWords(new Date(date))
        });
      }
    }
  });
});
 
 