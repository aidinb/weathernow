import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from '@cfaester/enzyme-adapter-react-18'
import Enzyme, {shallow} from 'enzyme'
import chai from 'chai'




Enzyme.configure({adapter: new Adapter()})
global.React = React
global.renderer = renderer
global.shallow = shallow


global.assert = chai.assert
global.expect = chai.expect
global.should = chai.should
chai.should()
jest.mock('@react-native-firebase/crashlytics', () => {
  const recordErrorMock = jest.fn();
  const logMock = jest.fn();

  return () => ({
    recordError: recordErrorMock,
    log: logMock,
  });
})
jest.mock('@react-native-firebase/analytics', () => {
    return {
        analytics: jest.fn(() => ({
            default: jest.fn(),
            setLogEvent: jest.fn(),
            logEvent: jest.fn(),
            setUserProperty: jest.fn(),
            setUserproperties: jest.fn(),
            setUserId: jest.fn(),
        }))
    }
})
jest.mock('react-native-device-info', () => {
    return {
        DeviceInfo: jest.fn(),
        getUniqueId: jest.fn(),
    }
})

jest.mock('react-native-localize', () => {
    return {
        findBestLanguageTag: jest.fn(),
    }
})

jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        AsyncStorage: jest.fn(),
    }
})


jest.mock("react-i18next", () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    initReactI18next: {
        type: "3rdParty",
        init: jest.fn(),
    },
    I18nextProvider:jest.fn()
}))

jest.mock('@react-navigation/native', () => {
    return {
        createNavigationContainerRef: jest
          .fn()
          .mockReturnValue(function NavigationContainer(props) {
              return null
          }),
        NavigationContainer: jest
          .fn()
          .mockReturnValue(function NavigationContainer(props) {
              return null
          }),
        useIsFocused: jest
          .fn()
          .mockReturnValue(function NavigationContainer(props) {
              return null
          }),
        navigation: {
            setOptions: jest.fn()
        }
    }
});

jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: jest.fn(() => {
        // Mock implementation of createStackNavigator
        return {
            Navigator: jest.fn(),
            Screen: jest.fn(),
            Stack: jest.fn(),
            Group: jest.fn(),
        };
    }),
}))


jest.mock('@react-navigation/stack', () => {});
