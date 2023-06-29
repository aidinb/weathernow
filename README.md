# WeatherNow App

WeatherNow is a mobile application developed using React Native that provides users with real-time
weather information for different locations. The app utilizes MobX for state management
and facilitates store sharing between multiple screens with the same content.
For larger projects, the MVVM (Model-View-ViewModel) architecture with MobX is
the preferred approach. Here's a brief explanation of the different components
and technologies used in WeatherNow:

# MobX Store Sharing

WeatherNow utilizes MobX for state management and facilitates store sharing between
multiple screens that display similar content. With MobX, the shared data,
such as weather information for different locations,
can be accessed and updated across different screens easily.
This approach promotes code reusability, reduces duplication,
and improves overall efficiency and maintainability of the application.
By leveraging MobX store sharing, larger projects can benefit from a consistent
and centralized data management approach.

# MVVM Architecture

Model: The Model represents the data and business logic of the application.
View: The View corresponds to the user interface and displays the weather information and other relevant data to the user.
ViewModel: The ViewModel acts as a bridge between the Model and the View.
It provides the necessary data and methods to update and manipulate the UI.

# Realm for Offline Capability

WeatherNow integrates Realm, a mobile database, to support offline functionality.
Realm is chosen for its ease of use and efficient handling of schemas,
allowing them to align closely with the backend structure.
By utilizing Realm, the app can store and retrieve weather data even when the device is offline,
ensuring a seamless user experience. Users can access previously fetched weather information
without an internet connection.

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
- Node greater than 16

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

```
cd ./ios pod install
```
or
```
cd ./ios arch -x86_64 pod install for M1 Mac 
```

### Configure Firebase

1. Create a Firebase project on the Firebase console.
2. Enable Firebase Analytics and Crashlytics for your project.
3. Retrieve your Firebase configuration (Api keys, project ID, etc.).
4. Update the Firebase configuration in the app by replacing the placeholders 
5. in `src/firebase.ts` with your own Firebase credentials.

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
npm run e2e:ios:debug  build and run the ios on debug version
npm run e2e:android:debug  build and run the android on debug version
npm run e2e:ios:release  build and run the ios on release version
npm run e2e:android:release  build and run the android on release version

```


## Contributing

Contributions to the WeatherNow app are welcome!

## License

This project is licensed under the WeatherNow Aidin Bazarchi.
