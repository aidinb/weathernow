import React from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react';
import {COLORS} from '../style';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

interface CityProps {
  city: {
    name: string;
    picture: string;
  };
  onPress: () => void;
  style?: object;
}

const City: React.FC<CityProps> = ({city, onPress, style}) => {
  const {t} = useTranslation();
  const {name, picture} = city || {};

  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemContainer, style]}>
      <Text style={styles.itemText}>{t(name)}</Text>
      <FastImage
        source={{
          uri: picture || 'https://placehold.co/600x400', // Replace with a placeholder image URL or a default image URL
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.itemImage}
        placeholderStyle={styles.itemImage}
        placeholder={<ActivityIndicator size="large" color={COLORS.primary} />}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    flexDirection: 'row',
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
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});

export default observer(City);
