import AssetsImg from '@components/AssetsImg.tsx';
import Button from '@components/Button.tsx';
import LangSwitch from '@components/LangSwitch.tsx';
import Logo from '@components/Logo.tsx';
import Text from '@components/Text.tsx';
import ThemeSwitch from '@components/ThemeSwitch.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import tw from '@helpers/tailwind.helper.ts';
import MenuHeader from '@layout/header/components/MenuHeader.tsx';
import menu from '@layout/header/config/menu.config.ts';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerStyle from './header.module.scss';

function Header() {
  const [menuShow, setMenuShow] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    setMenuShow(false);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [location.pathname]);

  useEffect(() => {
    const headerTopHeight =
      document.querySelector('.' + headerStyle['header__top'])?.clientHeight ||
      0;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > headerTopHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (menuShow) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }, [menuShow]);

  return (
    <header
      className={tw(
        headerStyle['header'],
        isFixed && 'fixed top-0 left-0 right-0 z-50',
      )}
    >
      <div
        className={tw(
          headerStyle['header__top'],
          menuShow && 'hidden -translate-y-[40px]',
        )}
      >
        <div className={headerStyle['banner']}>
          <Text
            title={t('header.topTitle')}
            className={headerStyle['header__top--title']}
          />
        </div>
      </div>
      <div className={headerStyle['header__bottom']}>
        <Link
          to={'/'}
          className={tw(headerStyle['header__bottom--logo'])}
          onClick={() => setMenuShow(() => false)}
        >
          <Logo
            isRevert
            size={'32'}
            className={tw(
              menuShow &&
                (isFixed
                  ? 'fixed top-[54px] left-[15px]'
                  : 'fixed top-2 left-4'),
            )}
          />
        </Link>
        <nav
          className={tw(
            headerStyle['header__bottom--menu'],
            menuShow && 'bg-color-100 transition-all duration-300 ease-in-out',
            menuShow && isFixed ? 'pt-28' : 'pt-14',
            menuShow
              ? 'opacity-100'
              : 'opacity-0 invisible md:visible md:opacity-100',
          )}
        >
          {menu.map((item) => (
            <MenuHeader
              {...item}
              key={item.title}
              classNames={{
                title: headerStyle['header__menu--title'],
                wrapper: headerStyle['header__menu--wrapper'],
                data: headerStyle['header__menu--data'],
                arrowNext: headerStyle['header__menu--arrow-next'],
                wrapText: headerStyle['header__menu--wrap-text'],
              }}
              onClick={() => setMenuShow(() => false)}
            />
          ))}
        </nav>
        <div className={headerStyle['header__bottom--actions']}>
          <div
            className={tw(
              'w-fit h-full flex flex-wrap items-center gap-1',
              menuShow && 'hidden',
            )}
          >
            <LangSwitch />
            <ThemeSwitch />
          </div>
          <Button
            className={tw(
              'transition-none max-w-[40px] max-h-[40px] py-1 bg-transparent hover:!bg-transparent dark:bg-color-400 dark:hover:!bg-color-500 outline-0 focus:outline-0 md:hidden z-50',
              menuShow
                ? isFixed
                  ? 'fixed top-[54px] right-[15px]'
                  : 'fixed top-2 right-4'
                : 'relative top-0 right-0',
            )}
            onClick={() => setMenuShow((prev) => !prev)}
          >
            <AssetsImg
              type={'icon'}
              size={32}
              className={'block transition-none'}
              name='menu.svg'
            />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
