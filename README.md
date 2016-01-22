
# Barebone Ionic
This project is a generic Ionic application with ingredients that can be part of every modern Ionic application.

## Run the app
Use `ionic serve` to run the app for a browser preview

or

use `ionic serve --lab` to run the app in a browser on two platforms at the same time.

### Add hooks
```bash
$ ionic hooks add
```

### Install plugins using package.json
The required plugins should be installed before any platform addition and build. This could be done by calling the `ionic state restore` command.

### Add a platform

```bash
$ ionic platform add ios
```

Supported Cordova platforms:

```bash
$ ionic platform add ios
$ ionic platform add android
```

### Build the app

```bash
$ ionic build ios
```

### Εmulate the app on simulator
iOS:

```bash
$ ionic emulate ios
```

Android:

```bash
$ ionic emulate android
```

For more information, see [Ionic Documentation](http://ionicframework.com/docs/).

### Plugins installation

Use the following commands and install all the plugins required by the app:
```bash
$ cordova plugin add {plugin id or url}
```

eg:

```bash
cordova plugin add cordova-plugin-inappbrowser
```

#### Used Cordova plugins
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

## AdMob integration

**To use AdMob you need:**
1. Create an account on https://apps.admob.com
2. Create an app
3. Put iOS and Android keys to Gruntfile from the AdMob account

## Third Party Licences
* [Apache License](http://www.apache.org/licenses/)
* [MIT License](https://opensource.org/licenses/MIT)
