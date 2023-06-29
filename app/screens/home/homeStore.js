import {action, makeObservable, observable} from 'mobx';
import Firebase from '../../actions/firebase';
import {getCities} from '../../api/api';
import NavigationService from '../../router/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';

class HomeStore {
  constructor(realmStore) {
    this.realmStore = realmStore;
    makeObservable(this, {
      cities: observable,
      loading: observable,
      isConnected: observable,
      selectedCity: observable,
      setCities: action,
      setLoading: action,
      getCitiesFromRealm: action,
      navigateToCityDetail: action,
      setSelectedCity: action,
      returnTemperature: action,
      addCitiesToRealm: action,
      initialLoad: action,
      checkUserLanguage: action,
    });
  }

  cities = [];

  loading = false;
  isConnected = true;
  selectedCity = {};

  setCities = array => {
    this.cities = array;
  };

  setLoading = bool => {
    this.loading = bool;
  };
  setSelectedCity = object => {
    this.selectedCity = object;
  };
  initialLoad = async () => {
    try {
      await this.addCitiesToRealm();
      await this.getCitiesFromRealm();
    } catch (err) {
      console.log('initialLoad err', err);
      Firebase.recordErrorCrashlytics('initialLoad', err);
    }
  };

  addCitiesToRealm = async () => {
    try {
      this.setLoading(true);
      const cities = await getCities();
      const cityWithTemprature = Object.values(
        cities.reduce((result, item) => {
          const cityName = item.city.name;
          if (!result[cityName]) {
            result[cityName] = {
              city: item.city,
              temps: [],
            };
          }
          result[cityName].temps.push({
            temp: item.temp,
            date: item.date,
            tempType: item.tempType,
          });
          return result;
        }, {}),
      );
      cityWithTemprature.forEach(cityData => {
        this.realmStore.addCityToRealm(cityData);
      });
    } catch (err) {
      console.log('addCitiesToRealm err', err);
      Firebase.recordErrorCrashlytics('addCitiesToRealm', err);
    } finally {
      this.setLoading(false);
    }
  };

  getCitiesFromRealm = async () => {
    try {
      this.setLoading(true);

      Firebase.logCrashlytics('getCities');
      const realmCities = this.realmStore.realmGetCities();

      const sortedCities = realmCities.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      sortedCities.forEach(cityData => {
        cityData.temperatures.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
      });
      console.log('sortedCities', sortedCities);
      this.setCities(sortedCities);
    } catch (err) {
      Firebase.setLogEvent('getCities');
      console.log('error in getCities', err);
      Firebase.recordErrorCrashlytics('getCities', err);
    } finally {
      this.setLoading(false);
    }
  };
  navigateToCityDetail = async cityName => {
    try {
      Firebase.logCrashlytics('navigateToCityDetail');
      this.setLoading(true);
      const selectedCity = this.cities.find(item => item.name === cityName);
      this.setSelectedCity(selectedCity);
      NavigationService.navigate('Weather');
    } catch (err) {
      Firebase.setLogEvent('navigateToCityDetail');
      console.log('error in navigateToCityDetail', err);
      Firebase.recordErrorCrashlytics('navigateToCityDetail', err);
    } finally {
      this.setLoading(false);
    }
  };

  returnTemperature(item) {
    if (item.tempType === 'F') {
      return ((item.temp - 32) / 1.8).toFixed(2);
    } else if (item.tempType === 'K') {
      return (item.temp - 273.15).toFixed(2);
    } else {
      return item.temp.toFixed(2);
    }
  }

  checkUserLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
      }
    } catch (err) {
      console.log('checkUserLanguage', err);
      Firebase.recordErrorCrashlytics('checkUserLanguage', err);
    }
  };
}

export default HomeStore;
