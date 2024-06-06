import Text from '@components/Text.tsx';
import usePopup from '@context/Popup/hooks/usePopup.tsx';
import useNavigate from '@hooks/useNavigate.tsx';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { open, setClassNames, setContentAction, action } = usePopup();

  function ContentPopup() {
    return (
      <Text as={'h1'}>HELLO WORLD, i'm DUONG!!!</Text>
    );
  }

  function handleClick() {
    setClassNames((prev) => ({ ...prev, content: 'items-start' }));
    setContentAction('View my profile');
    action.current = () => navigate('https://facebook.com/duongnguyen321');
    open(<ContentPopup />);
  }

  return <Text as={'h1'} onClick={handleClick}>{t('home.title')}</Text>;
}

export default HomePage;
