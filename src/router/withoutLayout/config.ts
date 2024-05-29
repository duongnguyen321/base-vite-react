import CheckoutLayout from '@pages/checkout/layout.tsx';
import CheckoutPage from '@pages/checkout/page.tsx';
import type { RoutesMapInterface } from '@router/interface/routesMap.interface.ts';

const withoutLayoutRoutesMap: RoutesMapInterface[] = [
  {
    link: '/checkout',
    title: 'nav.CHECKOUT',
    Element: CheckoutPage,
    Layout: CheckoutLayout,
    nested: [],
  },
];
export default withoutLayoutRoutesMap;
