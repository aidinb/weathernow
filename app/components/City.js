import React from 'react';
import {Dimensions, Text, TouchableOpacity, Image} from 'react-native';

import {observer} from 'mobx-react';
import {COLORS} from '../style';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const City = props => {
  const {t} = useTranslation();
  const city = props.city || null;
  const name = city.name || null;
  const picture = city.picture || null;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        props.style,
        {
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
      ]}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{t(name)}</Text>
      <Image
        source={{
          uri: picture,
        }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
        }}
      />
    </TouchableOpacity>
  );
};

export default observer(City);
