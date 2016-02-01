# UC Maps Mobile App

[![Build Status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![dev-dependencies][dev-dependencies-image]][dev-dependencies-url]

Multi-platform mobile app built with [React Native](http://www.reactnative.com/).

Client of [almapp/uc-maps](https://github.com/almapp/uc-maps)

## Development

Clone this repository:

```sh
git clone https://github.com/almapp/uc-maps-mobile.git
cd uc-maps-mobile
```

### Dependencies

Make sure you have installed `react-native-cli` and `rnpm`:

```sh
npm install -g react-native-cli rnpm
```

Project dependencies:

```sh
npm install
```

### API Keys

To run on Android, first you need a valid Google Maps API Key. Then put it in `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="API_KEY"/>
```

### Run

Start the development server with:

```sh
npm start
```

To run on an Android device, first you need the Android SDK and allow development options on the device. Then:

```sh
npm run android
```

To run on an iOS emulator:

```sh
npm run ios
```

[ci-image]: https://travis-ci.org/almapp/uc-maps-mobile.svg
[ci-url]: https://travis-ci.org/almapp/uc-maps-mobile
[dependencies-image]: https://david-dm.org/almapp/uc-maps-mobile.svg
[dependencies-url]: https://david-dm.org/almapp/uc-maps-mobile
[dev-dependencies-image]: https://david-dm.org/almapp/uc-maps-mobile/dev-status.svg
[dev-dependencies-url]: https://david-dm.org/almapp/uc-maps-mobile#info=devDependencies
