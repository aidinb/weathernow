import React, {useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';

import {observer} from 'mobx-react';
import {useStores} from '../../store';
import City from '../../components/City';
import ScreenLoading from "../../components/ScreenLoading";
import { COLORS } from "../../style";
import { useTranslation } from "react-i18next";
import { useIsFocused } from '@react-navigation/native'

const {width} = Dimensions.get('window');

const Home = ({ navigation }) => {
  const {homeStore} = useStores();
  const {t} = useTranslation();
  const isFocused = useIsFocused()

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

  return (
    <View testID={'home'} style={styles.container}>
      <FlatList
        data={homeStore.cities}
        keyExtractor={item => item.name}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        onRefresh={async () => {
          await homeStore.initialLoad();
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
      {homeStore.loading
        ? <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.shadow,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 6,
        }}
        >
          <ScreenLoading />
        </View>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  list: {
    width,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default observer(Home);
