import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import NavigationService from './NavigationService';
// @ts-ignore
import En from '../../public/images/en.svg';
// @ts-ignore
import Nl from '../../public/images/nl.svg';
import Home from '../screens/home/Home';
import Weather from '../screens/home/Weather';
import ChooseLanguage from '../screens/home/ChooseLanguage';
import i18n from 'i18next';

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

export const renderScreens = () => {
  return (
    <RootStack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => NavigationService.navigate('ChooseLanguage')}>
              {i18n.language === 'en' ? (
                <En width={30} height={30} />
              ) : i18n.language === 'nl' ? (
                <Nl width={30} height={30} />
              ) : null}
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
      </Stack.Group>
    </RootStack.Navigator>
  );
};
