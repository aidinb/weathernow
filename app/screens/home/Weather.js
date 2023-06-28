import React, {useEffect} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';

import {observer} from 'mobx-react';
import {COLORS} from '../../style';
import {useTranslation} from 'react-i18next';
import {useStores} from '../../store';
import moment from 'moment';

const {width} = Dimensions.get('window');

const Weather = ({navigation}) => {
  const {t} = useTranslation();
  const {homeStore} = useStores();

  useEffect(() => {
    navigation.setOptions({
      title: homeStore.selectedCity.name,
    });
  }, [homeStore.selectedCity.name]);

  return (
    <FlatList
      data={homeStore.selectedCity.temperatures}
      keyExtractor={item => item.date}
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
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            borderRadius: 7,
            width: width - 20,
            marginTop: 15,
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowColor: COLORS.shadow,
            shadowRadius: 3,
            padding: 10,
            backgroundColor: COLORS.white,
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
            {moment(item.date).format('YYYY-MM-DD HH:mm')}
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
            {t('{{tempNumber}} Celsius', {
              tempNumber: homeStore.returnTemperature(item),
            })}
          </Text>
        </View>
      )}
    />
  );
};

export default observer(Weather);
