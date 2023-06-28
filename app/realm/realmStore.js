import {action, makeObservable, observable} from 'mobx';
import schema from './realm';
import Realm from 'realm';

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
    }
  };
  realmGetCities = () => {
    this.openRealm();
    const realmCity = this.realm.objects('City');
    return Object.values(JSON.parse(JSON.stringify(realmCity)));
  };
}

export default RealmStore;
