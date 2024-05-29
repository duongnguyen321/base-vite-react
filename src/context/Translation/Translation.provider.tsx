import type ProviderProps from '@context/interface/Provider.types.ts';
import { defaultLanguage, languages, LanguageCode } from '@i18n'; // Ensure LanguageCode is exported and used here
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageContext from './Translation.context.tsx';

function LanguageProvider({ children }: ProviderProps) {
  const { t, i18n } = useTranslation();

  const getInitialLanguage = (): LanguageCode => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && Object.keys(languages).includes(storedLang)) {
      return storedLang as LanguageCode;
    }
    return defaultLanguage;
  };

  const [lang, setLang] = useState<LanguageCode>(getInitialLanguage);

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && Object.keys(languages).includes(storedLang)) {
      i18n.changeLanguage(storedLang);
      setLang(storedLang as LanguageCode);
    }
  }, [i18n]);

  const setLanguage = (langCode: string) => {
    if (langCode in languages) {
      i18n.changeLanguage(langCode);
      localStorage.setItem('language', langCode);
      setLang(langCode as LanguageCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ t, i18n, setLanguage, languages, lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
