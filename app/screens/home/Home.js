import React, {useEffect} from 'react';
import {Dimensions, FlatList, View} from 'react-native';

import {observer} from 'mobx-react';
import {useTranslation} from 'react-i18next';
import {useStores} from '../../store';
import City from '../../components/City';

const {width} = Dimensions.get('window');

const Home = () => {
  const {t} = useTranslation();
  const {homeStore} = useStores();

  useEffect(() => {
    homeStore.initialLoad();
  }, []);

  return (
    <View testID={'home'}>
      <FlatList
        data={homeStore.cities}
        keyExtractor={item => item.name}
        style={{
          width,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 100,
        }}
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

export default observer(Home);
