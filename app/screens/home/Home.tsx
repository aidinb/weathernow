import React, {useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import City from '../../components/City';
import ScreenLoading from '../../components/ScreenLoading';
import {COLORS} from '../../style';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const {homeStore} = useStores();
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  useEffect(() => {
    homeStore.initialLoad();
  }, []);

  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        title: t('Cities'),
      });
    }
  }, [isFocused]);

  const handleRefresh = async () => {
    await homeStore.initialLoad();
  };

  const renderCity = ({item}: {item: any}) => (
    <City
      onPress={async () => {
        await homeStore.navigateToCityDetail(item.name);
      }}
      city={item}
    />
  );

  return (
    <View testID={'home'} style={styles.container}>
      <FlatList
        extraData={homeStore.loading}
        data={homeStore.cities}
        keyExtractor={item => item.name}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        onRefresh={handleRefresh}
        refreshing={homeStore.loading}
        renderItem={renderCity}
      />
      {homeStore.loading ? (
        <View style={styles.loading}>
          <ScreenLoading />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width,
    flex: 1,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.shadow,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 6,
  },
});

export default observer(Home);
