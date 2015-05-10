# Bus Detective - Mobile Client

## Installation

* install [xcode](https://developer.apple.com/xcode/)
* `npm install -g cordova`
* `npm install -g ios-sim`

## Running / Development

    cordova run ios
    cordova run android

## Deployment

## Generating New Icons

## Generating New Splash Screens

For Android, we take in a 1024x1024 square image of the splash screen and use a
script to generate the sizes and formats needed.

* Update `splash.png` to be the new splash screen
* Run `node generate-assets.js` to generate the splash screens for Android
