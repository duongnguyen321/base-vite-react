import cn from '@translation/cn.json';
import en from '@translation/en.json';
import vi from '@translation/vi.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define the supported language codes.
export type LanguageCode = 'vi' | 'en' | 'cn';
const languageCodes: LanguageCode[] = ['vi', 'en', 'cn'];

/**
 * Defines the native names for the supported languages.
 * Each language code is mapped to an object containing its native name.
 */
export const languages: {
  // eslint-disable-next-line no-unused-vars
  [key in LanguageCode]: {
    nativeName: string;
  };
} = {
  vi: { nativeName: 'Tiếng Việt' },
  en: { nativeName: 'English' },
  cn: { nativeName: '中文' },
};

// Define the type for the resources object, mapping language codes to their translations.
type ResourcesType = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof typeof languages]: {
    translation: object;
  };
};

/**
 * Resources object containing translations for each supported language.
 * Maps language codes to their respective translation objects imported from JSON files.
 */
const resources: ResourcesType = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
  cn: {
    translation: cn,
  },
};

// Set the default language to the first language code in the array.
export const defaultLanguage = languageCodes[0];

// Initialize i18next with the react-i18next framework.
i18next.use(initReactI18next).init({
  resources, // The translations resources
  lng: defaultLanguage, // Initial language to use
  fallbackLng: defaultLanguage, // Fallback language when the current language doesn't have the needed string
  interpolation: {
    escapeValue: false, // Not needed for React as it escapes by default
  },
});

export default i18next;
