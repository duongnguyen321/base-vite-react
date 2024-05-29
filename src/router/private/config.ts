import ProfilePage from '@pages/profile/page.tsx';
import type { RoutesMapInterface } from '@router/interface/routesMap.interface.ts';

const privateRoutesMap: RoutesMapInterface[] = [
  {
    link: '/profile',
    title: 'nav.PROFILE',
    Element: ProfilePage
  }
];
export default privateRoutesMap;
