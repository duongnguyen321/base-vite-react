import { GOOGLE_CAPTCHA_KEY } from '@config/site.config.ts';
import useTheme from '@context/Themes/hooks/useTheme.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import type DefaultProps from '@type/pages/defaultProps.interface.ts';
import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function AuthLayout({ children, ...props }: DefaultProps & { children?: React.ReactNode }) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const captchaTheme = theme === 'dark' ? 'dark' : 'light';
  return (
    <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_CAPTCHA_KEY()} language={lang} container={{
      parameters: {
        theme: captchaTheme,
      },
    }}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, { ...props }),
      )}
    </GoogleReCaptchaProvider>
  );
}

export default AuthLayout;
