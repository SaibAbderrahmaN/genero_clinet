import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './contexts/en.json'; // Import your translation files
import arTranslation from './contexts/ar.json';
import frTranslation from './contexts/fr.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};



i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language here
  fallbackLng: 'en', // Fallback language if a translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values by default
  },
});

export default i18n;
