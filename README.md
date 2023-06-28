# WeatherNow App

WeatherNow is a mobile application developed using React Native.
It provides users with real-time weather information for different locations.

## Features

- Real-time weather information for different locations.
- Store management using MobX.
- Analytics and error reporting with Firebase Analytics and Crashlytics.
- Translation support using i18n.
- Seamless navigation using React Navigation.
- Unit testing with Jest.
- End-to-end testing using Detox.
- Realm Database storage for handling the offline mode.

## Installation

Follow the instructions below to set up and run the WeatherNow app on your local machine.

### Prerequisites

Before starting, ensure that you have the following software installed:

- React native Prerequisites 

### Clone the repository

```
git clone <repository-url>
cd WeatherNow
```

### Install dependencies

```
npm install
```
or
```
yarn install
```

### Configure Firebase

1. Create a Firebase project on the Firebase console.
2. Enable Firebase Analytics and Crashlytics for your project.
3. Retrieve your Firebase configuration (API keys, project ID, etc.).
4. Update the Firebase configuration in the app by replacing the placeholders in `src/firebase.js` with your own Firebase credentials.

### Configure i18n

1. Open the `src/i18n.js` file.
2. Customize the translation files located in `src/locales` to support the languages you desire.
3. Update the language configurations in `src/i18n.js` to include the languages you want to support.

### Run the app

```
npm start
```
or
```
yarn start
```

This command will start the development server for the WeatherNow app.

### Build and run on Android

```
Add local.properties inside tha android folder which is point to android sdk in the local computer

```
```
npm run android
```
or
```
yarn android
```

### Build and run on iOS

```
npm run ios
```
or
```
yarn ios
```

## Testing

The WeatherNow app utilizes Jest for unit testing and Detox for end-to-end testing.
The test cases are just very simple ones as a samples.
To run the tests, use the following commands:

### Run unit tests

```
npm test
```
or
```
yarn test
```

### Run end-to-end tests

```
npm run e2eIosDebug  build and run the ios on debug version
npm run e2eAndroidDebug  build and run the android on debug version
npm run e2eIosRelease  build and run the ios on release version
npm run e2eAndroidRelease  build and run the android on release version

```


## Contributing

Contributions to the WeatherNow app are welcome!
If you want to contribute, please follow the guidelines outlined in the `CONTRIBUTING.md` file.

## License

This project is licensed under the WeatherNow Aidin.
