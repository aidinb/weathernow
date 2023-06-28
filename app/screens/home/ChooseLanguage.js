import React, {useEffect} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';

import {observer} from 'mobx-react';
import {COLORS} from '../../style';
import {useTranslation} from 'react-i18next';
import {useStores} from '../../store';
import moment from 'moment';
import Nl from '../../../public/images/nl.svg';
import En from '../../../public/images/en.svg';
import NavigationService from '../../router/NavigationService';
import i18n from 'i18next';

const {width} = Dimensions.get('window');

const ChooseLanguage = ({navigation}) => {
  const {t} = useTranslation();
  const {homeStore} = useStores();

  useEffect(() => {
    navigation.setOptions({
      title: homeStore.selectedCity.name,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={async () => {
          await i18n.changeLanguage('en');
          NavigationService.goBack();
        }}
        style={{
          alignItems: 'center',
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
          flexDirection: 'row',
        }}>
        <En width={30} height={30} />
        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>
          {t('English')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          await i18n.changeLanguage('nl');
          NavigationService.goBack();
        }}
        style={{
          alignItems: 'center',
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
          flexDirection: 'row',
        }}>
        <Nl width={30} height={30} />

        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>
          {t('Dutch')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default observer(ChooseLanguage);
