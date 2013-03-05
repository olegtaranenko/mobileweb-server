/**
 * The file is a part of Bootcamp project
 * (c) 2013 oDesk Corp all rights reserved
 */


// Use Bootcamp namespace as a jQuery plugin to get access from anywhere
(function($){

  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())),
    tapEvent = mobile ? 'touchstart' : 'vclick';

  var config = {

    mobile   : mobile,

    tapEvent : tapEvent,

    generateEvents: function(events, originalEvents) {
      var ret = originalEvents || {} ;
      $.each(events, function(key, value) {
        console.log(arguments);
        var eventKey = tapEvent + ' ' + key;
        ret[eventKey] = value;
      });
      return ret;
    }
  };


  $.extend($, {
    Bootcamp: function(options) {
      return $.extend(config, options);
    }
  });

  $.extend($.fn, {
    Bootcamp: function (options) {
      return this.each(function () {
        console.log(this);
        $.Bootcamp(options);
      });
    }
  });

}(jQuery));


$(document).bind("mobileinit", function () {
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = false;
  $.mobile.hashListeningEnabled = false;
  $.mobile.pushStateEnabled = false;
  $.mobile.defaultPageTransition = "slide";
  $.mobile.loader.prototype.options.theme = "b";


  // Remove page from DOM when it's being replaced.
  $(document).on("pagehide", "div[data-role='page']", function (event, ui) {
    $(event.currentTarget).remove();
  });
});