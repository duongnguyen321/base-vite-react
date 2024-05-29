import { useContext } from 'react';
import LanguageContext from '../Translation.context.tsx';

const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
