import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './locales/fr.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    // Remove fixed lng to enable auto-detection
    supportedLngs: ['fr', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Prioritize navigator language detection for automatic country-based detection
      order: ['navigator', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
      // Map country codes to languages
      convertDetectedLanguage: (lng: string) => {
        // Extract base language code (e.g., 'en-US' -> 'en', 'fr-FR' -> 'fr')
        const baseLng = lng.split('-')[0].toLowerCase();
        // Return supported language or fallback
        return ['fr', 'en'].includes(baseLng) ? baseLng : 'fr';
      },
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
