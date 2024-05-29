import { ThemeType } from '@config/themes.config.ts';

type ThemeContextType = {
  theme: ThemeType;
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: ThemeType) => void;
};

export default ThemeContextType;
