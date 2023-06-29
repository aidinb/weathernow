import React  from 'react'
import {
   initReactI18next,
} from 'react-i18next'
import i18n from 'i18next'
import { findBestLanguageTag } from "react-native-localize";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Firebase from './app/actions/firebase'
import en from './public/locales/en/translation.json'
import nl from './public/locales/nl/translation.json'

const availableLanguages = ['en', 'nl']
const fallbackLanguage = 'en'


const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback) => {
    AsyncStorage.getItem('language')
      .then((language) => {
        if (language) {
          return callback(language)
        }
        const fallback = {
          languageTag: fallbackLanguage, isRTL: false,
        }
        const {
          languageTag,
        } = findBestLanguageTag(availableLanguages) || fallback
        return callback(languageTag.split('-')[0])
      })
      .catch((err) => {
        console.log("languageDetector err", err);
        Firebase.recordErrorCrashlytics(err, 'languageDetector')
      })
  },
  init: () => {},
}

i18n // loads translations from locize.com -> change to i18next-xhr-backend to load them from your own server
  // @ts-ignore
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
  })

export default i18n;
