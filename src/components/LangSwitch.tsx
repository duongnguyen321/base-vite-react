import AssetsImg from '@components/AssetsImg.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import tw from '@helpers/tailwind.helper.ts';
import { useEffect, useRef, useState } from 'react';

/**
 * LangSwitch is a component that renders a language switcher dropdown.
 * It allows users to switch between different languages by clicking on the respective icons.
 * The component uses a custom hook `useLanguage` to manage the language state.
 */
function LangSwitch() {
  const { setLanguage, lang, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dataLangIcon: {
    // eslint-disable-next-line no-unused-vars
    [key in keyof typeof languages]: string;
  } = {
    vi: 'Vi.svg',
    en: 'En.svg',
    cn: 'Cn.svg',
  };

  const handleIconClick = (languageCode: string) => {
    setLanguage(languageCode);
    setIsOpen(false);
  };

  const iconSrc = dataLangIcon[lang] || dataLangIcon['vi'];
  return (
    <div
      className={tw(
        'transition-colors text-center min-w-[40px] py-2',
        isOpen && 'bg-color-100',
      )}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <AssetsImg
        size={28}
        type={'icon'}
        name={iconSrc}
        title={languages[lang].nativeName}
        className={
          'inline rounded-full z-50 select-none object-contain bg-transparent w-fit outline-0 text-sm cursor-pointer'
        }
      />
      <div
        className='fixed z-50 bg-color-100 min-w-[40px] transition-all mt-1 flex items-center justify-center flex-col gap-1 overflow-hidden rounded'
        style={{
          height: isOpen
            ? 34 * (Object.keys(dataLangIcon).length - 1) + 'px'
            : 0,
        }}
      >
        {Object.entries(dataLangIcon).map(([code, icon]) => {
          if (code === lang) {
            return null;
          }
          return (
            <AssetsImg
              key={code}
              title={languages[code as typeof lang]?.nativeName}
              size={28}
              type={'icon'}
              name={icon}
              className='w-7 h-7 rounded-full cursor-pointer'
              onClick={() => handleIconClick(code)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default LangSwitch;
