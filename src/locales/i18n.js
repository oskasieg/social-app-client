import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationPL from './pl/translate.json';

const resources = {
  pl: {
    translation: translationPL,
  },
  en: {
    translation: {},
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
