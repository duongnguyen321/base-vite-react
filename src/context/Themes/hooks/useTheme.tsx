import ThemesContext from '../Themes.context.tsx';
import { useContext } from 'react';

const useTheme = () => useContext(ThemesContext);
export default useTheme;
