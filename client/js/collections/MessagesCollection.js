/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */
define(['backbone', 'MessageModel'],
  function(Backbone, MessageModel) {

    return Backbone.Collection.extend({
      model: MessageModel
    });
  }
);
 
 