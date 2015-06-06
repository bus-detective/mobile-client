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
    var ref = cordova.InAppBrowser.open('http://app.busdetective.com', '_blank', 'location=no,hidden=yes,toolbar=no');
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

    webLinkOpener(ref);
  },

  onAppLoaded: function () {
    // This function runs twice for some reason, add a flag to run only once
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

var webLinkOpener = function (ref) {
  var checkForLinkToOpen = function () {
    ref.executeScript({
      code: 'window.cordovaWrapper.openLink'
    }, function (value) {
      var url = value[0];
      if (url) {
        openLink(value[0]);
        ref.executeScript({
          code: 'window.cordovaWrapper.openLink=null'
        });
      }
    });
  };

  var openLink = function (url) {
    cordova.InAppBrowser.open(url, '_system');
  };

  setInterval(checkForLinkToOpen, 500);
};

cordovaWrapper.initialize();
