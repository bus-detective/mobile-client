var cordovaWrapper = {
  initialize: function () {
    this.bindEvents();
  },

  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function () {
    busDetectiveApp.initialize();
  }
};

var busDetectiveApp = {
  appWindow: null,

  initialize: function () {
    var ref = cordova.InAppBrowser.open('http://app.busdetective.com', '_blank', 'location=no,hidden=yes,toolbar=no');
    this.bindEvents(ref);
    busDetectiveApp.appWindow = ref;
  },

  bindEvents: function (ref) {
    ref.addEventListener('exit', busDetectiveApp.onExit, false);
    ref.addEventListener('loadstop', busDetectiveApp.onAppLoaded, false);
  },

  onAppLoaded: function () {
    busDetectiveApp.appWindow.show();
    cordova.InAppBrowser.open('http://teamgaslight.com', '_system');
  },

  onExit: function () {
    // Close wrapper if they back out of the app
    navigator.app.exitApp();
  }
};

cordovaWrapper.initialize();
