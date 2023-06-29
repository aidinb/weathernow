import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';
import crashlytics from '@react-native-firebase/crashlytics';

const firebase = {
  init(): void {
    analytics().setAnalyticsCollectionEnabled(true);
  },

  setUserId(userId: string): void {
    analytics().setUserId(userId);
  },

  setUserProperty(name: string, value: string): void {
    analytics().setUserProperty(name, value);
  },

  trackScreenView(screenName: string): void {
    analytics().logEvent('screen_view', {screen_name: screenName});
  },

  trackEvent(category: string, action: string, params: object): void {
    analytics().logEvent(category + '_' + action, params);
  },

  async setUserProperties(params: object): Promise<object> {
    const deviceId = await DeviceInfo.getUniqueId();
    const properties = {
      ...params,
      deviceId: deviceId,
    };

    return properties;
  },

  async setLogEvent(name: string): Promise<void> {
    try {
      const logEventParams = await this.setUserProperties({});
      analytics().logEvent(name, logEventParams);
    } catch (err) {
      console.log('setLogEvent', err);
      this.recordErrorCrashlytics('setLogEvent', err);
    }
  },

  logCrashlytics(name: string): void {
    crashlytics().log(name);
  },

  recordErrorCrashlytics(name: string, error: any): void {
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

export default firebase;
