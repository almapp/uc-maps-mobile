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

### Run

Start the development server with:

```sh
npm start
```

To run on an Android device, first you need the Android SDK and allow development options on the device. Then:

```sh
npm run android
```

On iOS, go and open `ios/UCMaps.xcodeproj` with XCode and run the app.

[ci-image]: https://travis-ci.org/almapp/uc-maps-mobile.svg
[ci-url]: https://travis-ci.org/almapp/uc-maps-mobile
[dependencies-image]: https://david-dm.org/almapp/uc-maps-mobile.svg
[dependencies-url]: https://david-dm.org/almapp/uc-maps-mobile
[dev-dependencies-image]: https://david-dm.org/almapp/uc-maps-mobile/dev-status.svg
[dev-dependencies-url]: https://david-dm.org/almapp/uc-maps-mobile#info=devDependencies
