/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */
define([
  'backbone',
  'MessagesCollection'
],
  function(Backbone, MessagesCollection) {

    return Backbone.Model.extend({
      defaults: {
        id: 0,
        author: '',
        subject: '',
        participants: [],
        starred: false,
        read: false,
        type: "Message",
        updated: null,
        Messages: null,
        date: 0,      // time in millis
        relative: ''  // relative date: 1 hour, about 1 week, etc...
      },

      initialize: function() {
        var date = this.get('date');

        if ( date ) {
          this.set({
            relative: _.distanceOfTimeInWords(new Date(date))
          });
        }

        this.on("change:Messages", function(model) {
          var messages = this.get('Messages');
          if (_.isArray(messages)) {
            var models = new MessagesCollection(messages);
            model.unset('Messages', {silent: true});
            model.set( {Messages: models}, {silent: true} );
          }
        });

        this.on("change:read", function(model) {
          var read = model.get('read'),
            previous = model._previousAttributes,
            prevRead = previous.read;

          if (!prevRead && read) {
            // call PUT query
            console.log('about to sync model to server (read: true}');
            Backbone.sync('update', model, {
              attrs: {
                read: read
              },
              success: function() {
                console.log('update is successful!');
              },
              error: function() {
                console.error('update failed');
              }
            })
          }
        });
      },

      urlRoot: 'api/v0/threads'
    });

  }
);
