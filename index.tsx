import { AppRegistry } from 'react-native';
import WeatherNow from './App';
import appConfig from './app';

AppRegistry.registerComponent(appConfig.name, () => WeatherNow);
