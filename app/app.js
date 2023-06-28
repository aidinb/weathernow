import React, {useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {renderScreens} from './router/index';
import {navigationRef} from './router/NavigationService';
import {useStores} from './store';

const App = () => {
  const {realmStore} = useStores();

  useEffect(() => {
    realmStore.openRealm();
  }, []);

  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        {renderScreens()}
      </NavigationContainer>
    </View>
  );
};

export default observer(App);
