import React, {useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';

import {observer} from 'mobx-react';
import {useStores} from '../../store';
import City from '../../components/City';

const {width} = Dimensions.get('window');

const Home = () => {
  const {homeStore} = useStores();

  useEffect(() => {
    homeStore.initialLoad();
  });

  return (
    <View testID={'home'}>
      <FlatList
        data={homeStore.cities}
        keyExtractor={item => item.name}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        onRefresh={async () => {
          await homeStore.getCities();
        }}
        refreshing={homeStore.loading}
        renderItem={({item}) => (
          <City
            onPress={async () => {
              await homeStore.navigateToCityDetail(item.name);
            }}
            city={item}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default observer(Home);
