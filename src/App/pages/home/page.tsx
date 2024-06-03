import Text from '@components/Text.tsx';
import usePopup from '@context/Popup/hooks/usePopup.tsx';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
  const { open } = usePopup();

  function ContentPopup() {
    return (
      <Text as={'h1'}>HELLO WORLD, i'm DUONG!!!</Text>
    );
  }

  function handleClick() {
    open(<ContentPopup />);
  }

  return <Text as={'h1'} onClick={handleClick}>{t('home.title')}</Text>;
}

export default HomePage;
