import BackHome from '@components/BackHome.tsx';
import Text from '@components/Text.tsx';
import useNavigate from '@hooks/useNavigate.tsx';
import mainLanguage from '@translation/vi.json';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function CheckoutErrorPage({
  code = '-1',
  returnUrl = '/',
}: {
  code?: keyof typeof mainLanguage.errors.code;
  returnUrl?: string;
}) {
  const [timeout, setTime] = useState(5);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeout > 0) {
        setTime(timeout - 1);
      } else {
        clearInterval(interval);
        navigate(returnUrl);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeout, navigate, returnUrl]);
  return (
    <section className={'w-screen h-screen grid place-items-center'}>
      <div className={'container grid place-items-center gap-4'}>
        <Text
          as={'h1'}
          className={'text-5xl text-center w-1/2 mb-2'}
        >
          {t(`errors.code.${code}`)}!
        </Text>
        <Text>
          {t('commons.backHomeTime')} {timeout.toString()}s
        </Text>
        <BackHome to={returnUrl} />
      </div>
    </section>
  );
}

export default CheckoutErrorPage;
