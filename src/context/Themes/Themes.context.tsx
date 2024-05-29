import { defaultTheme } from '@config/themes.config.ts';
import { createContext } from 'react';
import type ThemeContextType from './_interface/ThemeContextType.ts';

const defaultValue: ThemeContextType = {
  theme: defaultTheme,
  setTheme: () => {},
};
const ThemesContext = createContext<ThemeContextType>(defaultValue);

export default ThemesContext;
