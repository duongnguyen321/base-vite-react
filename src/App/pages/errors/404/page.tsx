import Text from '@components/Text.tsx';
import { useTranslation } from 'react-i18next';

function Error404Page({ ...props }) {
  const { t } = useTranslation();
  const { searchParams } = props;
  const code = searchParams?.code || 'default';
  return (
    <section className={'w-screen h-screen grid place-items-center'}>
      <Text
        as={'h1'}
        className={'text-5xl'}
      >
        {t(`errors.page.404.${code}`)}!
      </Text>
    </section>
  );
}

export default Error404Page;
