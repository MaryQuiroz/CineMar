import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es';
import en from './locales/en';
import ca from './locales/ca';
import fr from './locales/fr';

i18n.use(initReactI18next).init({
  resources: {
    es,
    en,
    ca,
    fr
  },
  fallbackLng: 'es',
  ns: ['common', 'movies', 'navigation', 'errors', 'tickets'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['navigator']
  }
});

export default i18n;
