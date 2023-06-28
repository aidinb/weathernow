import React from 'react';
import HomeStore from '../screens/home/homeStore';
import RealmStore from '../realm/realmStore';

class RootStore {
  constructor() {
    this.homeStore = new HomeStore();
    this.realmStore = new RealmStore();
  }
}
const storesContext = React.createContext(new RootStore());
// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(storesContext);

export const Stores = storesContext._currentValue;
