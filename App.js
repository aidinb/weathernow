import React from 'react';
import {View} from 'react-native';

import App from './app/app';
import './i18n';

const WeatherNow = () => {
  return (
    <View style={{flex: 1}}>
      <App />
    </View>
  );
};

export default WeatherNow;
