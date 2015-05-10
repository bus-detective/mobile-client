// Splash screen sizes for Android - https://github.com/phonegap/phonegap/wiki/App-Splash-Screen-Sizes
// Use squares that are 20px smaller to add some padding
var androidSplashScreens = [
  {
    name: 'ldpi',
    height: 200
  },
  {
    name: 'mdpi',
    height: 320
  },
  {
    name: 'hdpi',
    height: 480
  },
  {
    name: 'xhdpi',
    height: 720
  }
];

var lwip = require('lwip');
var transparent = { r: 255, g: 255, b: 255, a: 0 };


function generateAndroidSplashScreen (originalImage, index) {
  if (index === androidSplashScreens.length) {
    return;
  }

  var splashScreen = androidSplashScreens[index];

  var tmpHeight;
  var tmpWidth;
  var tmpRatio;

  var actualHeight;
  var actualWidth;

  tmpHeight = splashScreen.height - 20;
  tmpRatio = tmpHeight / originalImage.height();
  tmpWidth = Math.round(tmpRatio * originalImage.width());

  actualHeight = tmpHeight + 20;
  actualWidth = tmpWidth + 20;

  originalImage.clone(function (err, image) {
    image.batch()
         .resize(tmpWidth, tmpHeight, 'cubic')
         .pad(9, 9, 9, 9, 'white')
         .pad(1, 1, 1, 1, transparent)

         // top left
         .setPixel(0, 1, 'black')
         .setPixel(1, 0, 'black')

         // bottom left
         .setPixel(0, actualHeight - 2, 'black')
         .setPixel(1, actualHeight - 1, 'black')

         // top right
         .setPixel(actualWidth - 2, 0, 'black')
         .setPixel(actualWidth - 1, 1, 'black')

         .writeFile('resources/splash/splash-android-' + splashScreen.name + '.9.png', function (err) {
           console.log(err);
           generateAndroidSplashScreen(originalImage, index + 1);
         });
  });
}

lwip.open('splash.png', function (err, image) {
  var i;
  generateAndroidSplashScreen(image, 0);
});
