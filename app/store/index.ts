import React from 'react';
import HomeStore from '../screens/home/homeStore';
import RealmStore from '../realm/realmStore';

class RootStore {
  realmStore: RealmStore;
  homeStore: HomeStore;

  constructor() {
    this.realmStore = new RealmStore();
    this.homeStore = new HomeStore(this.realmStore);
  }
}

const storesContext = React.createContext<RootStore>(new RootStore());

// This will be the function available for the app to connect to the stores
export const useStores = (): RootStore => React.useContext(storesContext);

// These stores are implemented in case we need to directly use one store inside another,
// but it's not recommended since it can create cyclic dependencies
export const Stores: RootStore = storesContext._currentValue;
