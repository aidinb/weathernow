import {AppRegistry} from 'react-native';
import WeatherNow from './App';
import appConfig from './appConfig';

// @ts-ignore
AppRegistry.registerComponent(appConfig.name, () => WeatherNow);
