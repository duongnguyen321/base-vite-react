import type { languages } from '@i18n';
import { i18n, type TFunction } from 'i18next';

type LanguageContextType = {
  t: TFunction<'translation'>;
  i18n: i18n;
  // eslint-disable-next-line no-unused-vars
  setLanguage: (lang: string) => void;
  languages: typeof languages;
  lang: keyof typeof languages;
};

export default LanguageContextType;
