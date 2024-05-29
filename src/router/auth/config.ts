import LoginPage from '@pages/auth/login/page.tsx';
import type { RoutesMapInterface } from '@router/interface/routesMap.interface.ts';

const authRoutesMap: RoutesMapInterface[] = [
  {
    link: '/auth/login',
    title: 'nav.LOGIN',
    Element: LoginPage,
  },
];
export default authRoutesMap;
