import AboutPage from '@pages/about/page.tsx';
import HomePage from '@pages/home/page.tsx';
import type { RoutesMapInterface } from '@router/interface/routesMap.interface.ts';

const publicRoutesMap: RoutesMapInterface[] = [
  {
    link: '/',
    title: 'nav.HOME',
    Element: HomePage,
  },
  {
    link: '/about',
    title: 'nav.ABOUT',
    Element: AboutPage,
  },
];
export default publicRoutesMap;
