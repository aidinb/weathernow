import {action, makeObservable, observable} from 'mobx';
import Firebase from '../../actions/firebase';
import {getCities} from '../../api/api';
import NavigationService from '../../router/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';

class HomeStore {
  cities: Array<any> = [];
  loading = false;
  isConnected = true;
  selectedCity: any = {};
  realmStore: any = {};

  constructor(realmStore: any) {
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

  setCities = (array: Array<any>) => {
    this.cities = array;
  };

  setLoading = (bool: boolean) => {
    this.loading = bool;
  };

  setSelectedCity = (object: any) => {
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

      const cityWithTemperature = Object.entries(
        cities.reduce((result: any, {city, temp, date, tempType}: any) => {
          const {name: cityName} = city;

          if (!result[cityName]) {
            result[cityName] = {
              city,
              temps: [],
            };
          }

          result[cityName].temps.push({temp, date, tempType});
          return result;
        }, {}),
      );

      await Promise.all(
        cityWithTemperature.map(([_, cityData]: any) =>
          this.realmStore.addCityToRealm(cityData),
        ),
      );
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

      const sortedCities = realmCities.sort((a: any, b: any) =>
        a.name.localeCompare(b.name),
      );
      sortedCities.forEach((cityData: any) => {
        const {temperatures} = cityData;
        if (temperatures) {
          cityData.temperatures.sort(
            // @ts-ignore
            (a: any, b: any) => new Date(a.date) - new Date(b.date),
          );
        }
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

  navigateToCityDetail = async (cityName: string) => {
    try {
      this.setLoading(true);
      const selectedCity = this.cities.find(
        (item: any) => item.name === cityName,
      );
      this.setSelectedCity(selectedCity);
      NavigationService.navigate('Weather');
      Firebase.logCrashlytics('navigateToCityDetail');
    } catch (err) {
      Firebase.setLogEvent('navigateToCityDetail');
      console.log('error in navigateToCityDetail', err);
      Firebase.recordErrorCrashlytics('navigateToCityDetail', err);
    } finally {
      this.setLoading(false);
    }
  };

  returnTemperature = (item: any) => {
    const {temp, tempType} = item;

    switch (tempType) {
      case 'F':
        return ((temp - 32) / 1.8).toFixed(2);
      case 'K':
        return (temp - 273.15).toFixed(2);
      default:
        return temp.toFixed(2);
    }
  };

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
