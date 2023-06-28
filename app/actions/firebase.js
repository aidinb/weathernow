import analytics from '@react-native-firebase/analytics';

// import mainStore from '../store/mainStore'
import DeviceInfo from 'react-native-device-info';
import crashlytics from '@react-native-firebase/crashlytics';

export default {
  init() {
    analytics().setAnalyticsCollectionEnabled(true);
  },

  setUserId(userId) {
    analytics().setUserId(userId);
  },

  setUserProperty(name, value) {
    analytics().setUserProperty(name, value);
  },

  trackScreenView(screenName) {
    analytics().logEvent('screen_view', {screen_name: screenName});
  },

  trackEvent(category, action, params) {
    analytics().logEvent(category + '_' + action, params);
  },
  async setUserproperties(params) {
    const deviceId = await DeviceInfo.getUniqueId();
    let properties = {
      ...params,
      deviceId: deviceId,
    };

    return properties;
  },
  async setLogEvent(name) {
    try {
      const logEventParams = await this.setUserproperties();
      analytics().logEvent(name, logEventParams);
    } catch (err) {
      console.log('setLogEvent', err);
      this.recordErrorCrashlytics('setLogEvent', err);
    }
  },

  logCrashlytics(name) {
    crashlytics().log(name);
  },

  recordErrorCrashlytics(name, error) {
    if (error?.response?.data?.message) {
      crashlytics().recordError(new Error(error.response.data.message), name);
    } else if (
      error?.response?.data &&
      typeof error.response.data === 'string'
    ) {
      crashlytics().recordError(new Error(error.response.data), name);
    } else {
      crashlytics().recordError(error, name);
    }
  },
};
