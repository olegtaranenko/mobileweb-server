/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */
define([
  'backbone', 'jquery', 'underscore',
  'ThreadList', 'ThreadDetails',
  'ThreadsCollection', 'ThreadModel'
],
  function(Backbone, $, _, ThreadList, ThreadDetails, ThreadsCollection, ThreadModel) {

    return Backbone.Router.extend({

      routes: {
        "": 'threadlist',
        "list(/:opt)": 'threadlist',
        "details/:id": 'details'
      },

      initialize: function () {
        this.firstPage = true;
      },


      threadlist: function (opt) {
        $.mobile.showPageLoadingMsg();
        var lastVisited = $.cookies.get('lastvisited'),
          initialLoad = lastVisited == null;

        var webView = this,
          back = opt == 'back';

        var threads = new ThreadsCollection();

        threads.fetch({
          params: {
            offset: 0,
            count: 20
          },

          success: function(collection, response, options) {

            console.log('threads loaded:', response);

            var newMessages = 0;
            if (initialLoad) {
              newMessages = collection.length;
            } else {
              var now = (new Date()).getTime();

              collection.each(function(thread) {
                var updated = thread.get('updated');
                if (updated > lastVisited) {
                  newMessages++;
                }
              });
            }


            var page = new ThreadList({
              threads: collection.models,
              newMessages: newMessages
            });
            webView.changePage(page, back);

            $.mobile.hidePageLoadingMsg();
          },
          error: function() {
            console.error('error loading threads!');
          }
        });
      },

      /**
       * Shows thread details view.
       *
       * @param id {int} thread id
       */
      details: function (id) {
        $.mobile.showPageLoadingMsg();

        var webView = this;

        var thread = new ThreadModel({
          id: id
        });

        thread.fetch({
          success: function(model) {
            console.log('thread loaded', model);
            var page = new ThreadDetails({
              thread: model
            });

            model.set({read: true});
            webView.changePage(page);

            $.mobile.hidePageLoadingMsg();
          },
          error: function() {
            console.error('error loading model ', id);
          }
        });

      },

      /**
       * Process change page on the client (in browser) using jquery mobile facility
       *
       * @private
       * @param page {Backbone.View} Backbone View page
       * @param back {boolean} to manage slide direction
       */
      changePage: function (page, back) {
        var element = $(page.el);

        element.attr('data-role', 'page');
        element.attr('data-theme', 'g');

        page.render();

        $('body').append(element);

        var transition = $.mobile.defaultPageTransition;

        // We don't want to fade the first page. Slide, and risk the annoying "jump to top".
        if (this.firstPage) {
          transition = "none";
          this.firstPage = false;
        }

        $.mobile.changePage(element, {
          changeHash:false,
          transition: transition,
          reverse: back
        });
      }
    });
  }
);
 