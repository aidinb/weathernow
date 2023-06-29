import React from 'react';
import HomeStore from '../screens/home/homeStore';
import RealmStore from '../realm/realmStore';

class RootStore {
  constructor() {
    this.realmStore = new RealmStore();
    this.homeStore = new HomeStore(this.realmStore);
  }
}
const storesContext = React.createContext(new RootStore());
// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(storesContext);

// this Stores implemented in case we need to directly use one store inside another,
// but is not recommended since make the cycles problem
export const Stores = storesContext._currentValue;
