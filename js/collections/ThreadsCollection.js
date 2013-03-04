/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */

define(['backbone', 'ThreadModel'],
  function(Backbone, ThreadModel) {

    return Backbone.Collection.extend({
      model: ThreadModel,

      url: 'api/v0/threads.json',

      parse: function(response) {
        return response.threads
      }
    });
  }
);
