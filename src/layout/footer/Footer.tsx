import AssetsImg from '@components/AssetsImg.tsx';
import Button from '@components/Button.tsx';
import Text from '@components/Text.tsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import footerStyle from './footer.module.scss';

export default function Footer() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer className={footerStyle['footer']}>
      <div className={footerStyle['container']}>
        <Text as={'h2'}>{t('footer.name')}</Text>
        <Text as={'p'}>{t('footer.copy')}</Text>
      </div>
      {showScrollToTop && (
        <Button
          onClick={scrollToTop}
          className={
            'bg-transparent hover:!bg-transparent fixed bottom-5 right-5'
          }
        >
          <AssetsImg
            type={'icon'}
            name={'top.svg'}
          />
        </Button>
      )}
    </footer>
  );
}
