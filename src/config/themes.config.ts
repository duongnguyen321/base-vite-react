export const themes = [
  'green',
  'blue',
  'red',
  'orange',
  'light',
  'dark',
] as const;
export type ThemeType = (typeof themes)[number];
export const defaultTheme: ThemeType = 'green';
