import React from 'react';
import {View} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import App from './app/app';
import i18n from './i18n';

const WeatherNow = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <View style={{flex: 1}}>
        <App />
      </View>
    </I18nextProvider>
  );
};

export default WeatherNow;
