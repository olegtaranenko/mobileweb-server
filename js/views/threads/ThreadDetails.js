/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */

define([
  'underscore',
  'backbone',
  'MessageModel',
  'text!../templates/thread/details.html',
  'text!../templates/thread/rowdetails.html'
], function(_, Backbone, MessageModel, tpl, row) {

  return Backbone.View.extend({
    template: _.template(tpl),
    rowTemplate: _.template(row),

    hideReplyForm: function(loadingIcon, textarea) {
      var replyForm = $('#replyForm'),
        replyQuestion = $('#replyQuestion');

      replyForm.hide();
      replyQuestion.show();
      if (loadingIcon) {
        $(loadingIcon).css('visibility', 'hidden');
      }
      if (textarea) {
        textarea.value = '';
      }
    },

    appendMessageUI: function (message, index) {
      var list = $('ul')[0],
        row = this.renderRow(message, index),
        el = $(list);

      el.append(row);
      el.listview('refresh');
    },

    initialize: function () {
      var Bootcamp = $.Bootcamp(),
        eventsProto = {
          "#replyQuestion": 'startReply',
          "#replyForm input[type=submit]": 'doReply'
        },
        events = {
          "keydown #replyForm textarea" : 'replyKeyPressed'
        };

      this.events = Bootcamp.generateEvents(eventsProto, events);
    },

    startReply: function(e) {
      console.log('reply to thread', e);

      var replyQuestion = $('#replyQuestion'),
        replyForm = $('#replyForm'),
        textarea = $('textarea', replyForm)[0];

      replyForm.show();
      replyQuestion.hide();
      this.replyKeyPressed({
        target: textarea
      });
      textarea.focus();
      $(textarea).css('height', '50px');
    },

    doReply: function(e) {
      var submit = e.target,
        parent = submit.parentNode,
        loadingIcon = $('.ui-icon-loading', parent)[0];

      $(submit).button('disable');
      $(loadingIcon).css('visibility', 'visible');

      var model = this.options.thread,
        messages = model.get('Messages'),
        textarea = $('#replyForm textarea')[0],
        text = textarea.value,
        updateBody = {
          body: text
        },
        me = this;

      model.set(updateBody);

      // emulate delay
      setTimeout(function() {
        Backbone.sync('update', model, {
          attrs: updateBody,
          success: function(result, collection) {
            console.log('update is successful!');
            // update UI
            me.hideReplyForm(loadingIcon, textarea);
            var message = new MessageModel({
              body: text,
              // take sender info from apps authentication subsystem, which is not scope of current project
              sender: {
                name: 'Mamta Jain',
                iconurl: 'css/images/avatar2.png'
              },
              created: (new Date()).getTime()
            });
            messages.push(message);
            var index = messages.length - 1;
            me.appendMessageUI(message, index);
          },
          error: function() {
            console.error('update failed');
            me.hideReplyForm(loadingIcon);
          }
        });
      }, 1000);

    },

    doCancelReply: function(e) {
      console.log('doReplyCancel!!');
      this.hideReplyForm();
    },

    replyKeyPressed: function(e) {
      var textarea = e.target,
        replyForm = $('#replyForm'),
        submit = $('input[type=submit]', replyForm),
        value = textarea.value;

      if (value && value.length) {
        submit.button('enable');
      } else {
        submit.button('disable');
      }
    },

    renderRow: function(message, index) {
      return this.rowTemplate({
        message: message,
        index: index
      });
    },

    render: function() {
      var options = this.options,
        thread = options.thread;

      $(this.el).html(
        this.template({
          thread: thread
        })
      );
      return this;
    }
  });

});
