/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */
require.config({
  baseUrl: 'js',
  paths: {
    config: 'config',
    backbone: 'lib/backbone',
    jquery: 'lib/jquery',
    jaauldeCookies: 'lib/jaaulde.cookies',
    jqueryCookiesPlugin: 'lib/plugins/jquery.cookies',
    mobile: 'lib/jquery.mobile',
    underscore: 'lib/underscore',
    underscoreDate: 'lib/plugins/underscore.date',
    text: 'lib/plugins/text',
    ThreadList: 'views/threads/ThreadList',
    ThreadDetails: 'views/threads/ThreadDetails',
    ThreadModel: 'model/ThreadModel',
    MessageModel: 'model/MessageModel',
    ThreadsCollection: 'collections/ThreadsCollection',
    MessagesCollection: 'collections/MessagesCollection'
  }
});

requirejs.config({
  shim: {
    'underscore': {
      deps: [],
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'jquery': {
      deps: ['underscore'],
      exports: '$'
    },
    "jaauldeCookies": {
      deps: ['jquery']
    },
    "jqueryCookiesPlugin": {
      deps: ['jaauldeCookies']
    },
    "config": {
      deps: ['jquery'],
      exports: 'config'
    },
    'mobile': {
      deps: ['config', 'jquery'],
      exports: 'mobile'
    },
    underscoreDate: {
      deps: ['underscore']
    },
    text: {
      deps: ['backbone'],
      exports: 'text'
    },
    three: {
      deps: ['underscore'],
      exports: 'three'
    },
    ThreadModel: {
      deps: ['backbone', 'config'],
      exports: 'ThreadModel'
    },
    MessageModel: {
      deps: ['backbone', 'config'],
      exports: 'MessageModel'
    },
    ThreadList: {
      deps: ['backbone', 'config'],
      exports: 'ThreadList'
    },
    ThreadDetails: {
      deps: ['backbone', 'config'],
      exports: 'ThreadDetails'
    },
    ThreadsCollection: {
      deps: ['backbone', 'ThreadModel'],
      export: 'ThreadsCollection'
    },
    MessagesCollection: {
      deps: ['backbone', 'MessageModel'],
      export: 'MessagesCollection'
    },
    router: {
      deps: [
        'ThreadList', 'ThreadDetails'
      ],
      export: 'router'
    }
  }
});

require([
  'backbone',
  'router',
  'jqueryCookiesPlugin',
  'underscore', 'underscoreDate',
  'mobile',
  'text', 'jquery', 'config',
  'ThreadList',
  'ThreadDetails'
],

function(Backbone, AppRouter) {
  $(document).ready(function () {
    console.log('document ready');
    app = new AppRouter({
      pushState: true
    });
    Backbone.history.start();
  });
});
