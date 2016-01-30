
# Arcade City
Arcade City app and server components

## System Requirements
* **Node.js** [http://nodejs.org](http://nodejs.org)
* **Cordova** [http://cordova.apache.org](http://cordova.apache.org)
* **Ionic Framework** [http://ionicframework.com](http://ionicframework.com)

### For building and testing
* **Ionic Command Line Tools** [Setup Guide](https://www.npmjs.com/package/ionic)
* **iOS Development Platform** [Setup Guide](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/ios/index.html)
* **Android Development Platform** [Setup Guide](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/android/index.html)

 
## Setup
```bash
$ ./install.sh
```
or manually run the commands:


```bash
$ npm install
$ ionic state restore
$ ionic resources
$ cd ./server
$ npm install
$ cd ..
$ cp www/scripts/configuration.js.sample www/scripts/configuration.js
$ cp server/config.js.sample server/config.js
```

## Run the app
Use `ionic serve -c -s` to run the app for a browser preview

or

use `ionic serve --lab -c -s` to run the app in a browser on two platforms at the same time.

## Build the app

```bash
$ ionic build ios
```

## Testing the app on the simulator
###iOS:

* If the simulator environment is not yet installed, run:

```bash
$ sudo npm -g install ios-sim
```

* Switch to the root folder of your project
* Start the app in the simulator

```bash
$ ionic emulate ios -c -s -l
```

* To test on different devices (iPad, iPhone 4s, iPhone 5s, iPhone6, etc.), first list the available devices you have installed:

```bash
$ ios-sim showdevicetypes
```

* Then, to test on a specific device from the list, such as the iPad-Air, use:

```bash
$ ionic emulate ios --target="iPad-Air" -c -s -l
```

###Android:

The Android simulator is notoriously slow.  Genymotion is highly recommended as an alternative, plus it offers dozens of different device configurations for all the most-popular Android hardware:

* Install **Genymotion** [Genymotion website](https://www.genymotion.com)
* Create a virtual device
* Start the virtual device
* Switch to the root folder of your project
* Then run the following command to start the app in the virtual device:

```bash
$ ionic run android -c -s -l
```


## Ionic Framework
For more information, see [Ionic Documentation](http://ionicframework.com/docs/).

## Used Cordova plugins
In case that the required Cordova plugins are not installed while installing NodeJS dependencies, Cordova's command mentioned previously can be used to install the following plugins:

* **com.ionic.keyboard** - It provides functions to make interacting with the keyboard easier, and fires events to indicate that the keyboard will hide/show.
* **cordova-plugin-console** - This plugin is meant to ensure that console.log() is as useful as it can be. It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows.
* **cordova-plugin-device** - This plugin defines a global device object, which describes the device's hardware and software.
* **cordova-plugin-inappbrowser** - Provides a web browser view. It could be used to open images, access web pages, and open PDF files.
* **cordova-plugin-geolocation** - Grab the current location of the user, or grab continuous location changes
* **cordova-plugin-network-information** - This plugin provides an implementation of an old version of the Network Information API. It provides information about the device's cellular and wifi connection, and whether the device has an internet connection.
* **cordova-plugin-whitelist** - This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
* **cordova-plugin-camera** - This plugin defines a global navigator.camera object, which provides an API for taking pictures and for choosing images from the system's image library.
* **cordova-plugin-transport-security** - Cordova / PhoneGap Plugin to allow 'Arbitrary Loads' by adding a declaration to the Info.plist file to bypass the iOS 9 App Transport Security
* **cordova-admob-pro** - Powerful Ad Plugin for Google AdMob and DFP. Easy use, show mobile Ad with single line of JavaScript. Stable and up to date with latest SDK. Compatible with Cordova CLI, PhoneGap Build, Intel XDK/Crosswalk, Google ChromeApp, IBM Worklight. (https://github.com/floatinghotpot/cordova-admob-pro)
* **de.appplant.cordova.plugin.email-composer** - The plugin provides access to the standard interface that manages the editing and sending an email message (https://github.com/katzer/cordova-plugin-email-composer.git).
* **com.phonegap.plugins.PushPlugin** - This plugin is for use with Cordova, and allows your application to receive push notifications on Amazon Fire OS, Android, iOS, Windows Phone and Windows8 devices (https://github.com/phonegap-build/PushPlugin.git).
* **nl.x-services.plugins.socialsharing** - Share images, text, messages via Facebook, Twitter, Email, SMS, WhatsApp, etc using this plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git).
* **com.keosu.cordova.stream** - The plugin allows to play audio stream (https://github.com/skounis/cordova-audio-stream-plugin)
* **cordova-plugin-apprate** - The AppRate plugin makes it easy to prompt the user to rate your app, either now or later, or never (https://github.com/pushandplay/cordova-plugin-apprate.git).
* **cordova-sqlite-storage** - Native interface to sqlite in a Cordova/PhoneGap plugin for Android, iOS, Windows "Universal" (8.1), Amazon Fire-OS, and WP(7/8) with API similar to HTML5/Web SQL API (https://github.com/litehelpers/Cordova-sqlite-storage.git).
* **com.telerik.stripe** - Stripe is a payment infrastructure for the internet. Stripe Cordova SDK is built around the well organized REST API (https://github.com/Telerik-Verified-Plugins/Stripe).

## Run the server
```bash
$ cd ./server
$ node ArcadeCityServer.js
```
### Run CouchDB locally
* **CouchDB** [http://couchdb.apache.org](http://couchdb.apache.org)

## Third Party Licences
* [Apache License](http://www.apache.org/licenses/)
* [MIT License](https://opensource.org/licenses/MIT)
