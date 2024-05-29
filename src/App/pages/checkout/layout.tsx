import type DefaultProps from '@type/pages/defaultProps.interface.ts';
import React from 'react';
import homeCheckoutStyle from './homeCheckout.module.scss';

function CheckoutLayout({
  children,
  ...props
}: DefaultProps & { children?: React.ReactNode }) {
  return (
    <section className={homeCheckoutStyle['section']}>
      <h1>Layout checkout</h1>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, { ...props }),
      )}
    </section>
  );
}

export default CheckoutLayout;
