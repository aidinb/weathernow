import {action, makeObservable, observable} from 'mobx';
import schema from './realm';
import Realm from 'realm';
import Firebase from '../actions/firebase';

class RealmStore {
  constructor() {
    makeObservable(this, {
      realm: observable,
      realmGetCities: action,
      openRealm: action,
      addCityToRealm: action,
    });
  }
  realm = {};

  openRealm = () => {
    this.realm = new Realm({
      schema: schema,
      deleteRealmIfMigrationNeeded: true,
    });
  };

  addCityToRealm = city => {
    try {
      this.openRealm();

      this.realm.write(() => {
        this.realm.create(
          'City',
          {
            name: city.city.name,
            picture: city.city.picture,
            temperatures: city.temps,
          },
          true,
        );
      });
    } catch (err) {
      console.log('addCityToRealm err', err);
      Firebase.recordErrorCrashlytics('addCityToRealm', err);
    }
  };
  realmGetCities = () => {
    try {
      this.openRealm();
      let realmCities = this.realm.objects('City');
      realmCities = Object.values(JSON.parse(JSON.stringify(realmCities)));
      const sortedCities = realmCities.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      sortedCities.forEach(cityData => {
        cityData.temperatures.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
      });
      return sortedCities;
    } catch (err) {
      console.log('realmGetCities err', err);
      Firebase.recordErrorCrashlytics('realmGetCities', err);
    }
  };
}

export default RealmStore;
