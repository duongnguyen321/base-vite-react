import Text from '@components/Text.tsx';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
  return <Text as={'h1'}>{t('home.title')}</Text>;
}

export default HomePage;
