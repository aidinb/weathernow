import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {renderScreens} from './router/index';
import {navigationRef} from './router/NavigationService';
import {useStores} from './store';

const App = () => {
  const {realmStore} = useStores();

  useEffect(() => {
    realmStore.openRealm();
  });

  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        {renderScreens()}
      </NavigationContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
});

export default observer(App);
