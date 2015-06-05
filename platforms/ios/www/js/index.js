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
  hasAppLoaded: false,

  initialize: function () {
    // var ref = cordova.InAppBrowser.open('http://app.busdetective.com', '_blank', 'location=no,hidden=yes,toolbar=no');
    var ref = cordova.InAppBrowser.open('http://artemis:4200/', '_blank', 'location=no,hidden=yes,toolbar=no');

    this.bindEvents(ref);

    busDetectiveApp.appWindow = ref;
  },

  bindEvents: function (ref) {
    ref.addEventListener('exit', busDetectiveApp.onExit, false);
    ref.addEventListener('loadstop', busDetectiveApp.onAppLoaded, false);
  },

  injectAppScripts: function (ref) {
    ref.executeScript({
      file: 'js/bus-detective-cordova.js'
    });
  },

  onAppLoaded: function () {
    if (!busDetectiveApp.hasAppLoaded) {
      busDetectiveApp.injectAppScripts(busDetectiveApp.appWindow);
      busDetectiveApp.appWindow.show();
      busDetectiveApp.hasAppLoaded = true;
    }
  },

  onExit: function () {
    // Close wrapper if they back out of the app
    navigator.app.exitApp();
    busDetectiveApp.hasAppLoaded = false;
  }
};

cordovaWrapper.initialize();
