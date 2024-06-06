import BackHome from '@components/BackHome.tsx';
import Text from '@components/Text.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import CheckoutErrorPage from '@pages/checkout/pages/Error.tsx';
import homeCheckoutStyle from './homeCheckout.module.scss';
import type { ChildrenPropsInterface } from './interface/childrenProps.interface.ts';

function CheckoutPage({ ...props }: ChildrenPropsInterface) {
  const { t } = useLanguage();
  const { searchParams } = props;
  if (!searchParams?.orderId) {
    return <CheckoutErrorPage code={'-12'} />;
  }
  return (
    <section className={homeCheckoutStyle['section']}>
      <Text as={'h1'}>{t('checkout.title')}</Text>
      <BackHome />
    </section>
  );
}

export default CheckoutPage;
