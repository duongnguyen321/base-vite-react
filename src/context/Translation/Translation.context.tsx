import { defaultLanguage, languages } from '@i18n';
import { i18n } from 'i18next';
import { createContext } from 'react';
import type LanguageContextType from './_interface/LanguageContextType.ts';

const defaultValue: LanguageContextType = {
  // @ts-expect-error @ts-ignore
  t: () => '',
  i18n: {} as i18n,
  setLanguage: () => {},
  languages,
  lang: defaultLanguage,
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

export default LanguageContext;
