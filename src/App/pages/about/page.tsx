import Text from '@components/Text.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';

function AboutPage() {
  const { t } = useLanguage();
  return (
    <Text
      as={'h1'}
      className={'text-color-900'}
    >
      {t('about.title')}
    </Text>
  );
};
export default AboutPage;
