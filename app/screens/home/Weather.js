import React, {useEffect} from 'react';
import {Dimensions, FlatList, Text, View, StyleSheet} from 'react-native';

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
  }, [navigation]);

  return (
    <FlatList
      data={homeStore.selectedCity.temperatures}
      keyExtractor={item => item.date}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      onRefresh={async () => {
        await homeStore.getCities();
      }}
      refreshing={homeStore.loading}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            {moment(item.date).format('YYYY-MM-DD HH:mm')}
          </Text>
          <Text style={styles.itemText}>
            {t('{{tempNumber}} Celsius', {
              tempNumber: homeStore.returnTemperature(item),
            })}
          </Text>
        </View>
      )}
    />
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
  itemContainer: {
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
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default observer(Weather);
