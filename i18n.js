import React from 'react';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import en from './public/locales/en/translation.json';
import nl from './public/locales/nl/translation.json';

const availableLanguages = ['en', 'nl'];
const fallbackLanguage = 'en';

const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: cb => cb('en'),
  init: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: fallbackLanguage,
    load: 'languageOnly', // optional - load only languages without regions
    whitelist: availableLanguages, // optional - allowed languages
    resources: {
      en: {
        translation: en,
      },
      nl: {
        translation: nl,
      },
    },
    nsSeparator: '|',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
