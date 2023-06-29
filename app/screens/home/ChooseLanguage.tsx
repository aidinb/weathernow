import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react';
import {COLORS} from '../../style';
import {useTranslation} from 'react-i18next';
import Nl from '../../../public/images/nl.svg';
import En from '../../../public/images/en.svg';
import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const ChooseLanguage: React.FC<{navigation: any}> = ({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t('Choose Language'),
    });
  }, [navigation]);

  const handleLanguageSelection = async (language: string) => {
    await AsyncStorage.setItem('language', language);
    await i18n.changeLanguage(language);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleLanguageSelection('en')}
        style={styles.itemContainer}>
        <En width={30} height={30} />
        <Text style={styles.itemText}>{t('English')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleLanguageSelection('nl')}
        style={styles.itemContainer}>
        <Nl width={30} height={30} />
        <Text style={styles.itemText}>{t('Dutch')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  itemContainer: {
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
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default observer(ChooseLanguage);
