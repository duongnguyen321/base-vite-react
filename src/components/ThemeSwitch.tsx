import { themes } from '@config/themes.config.ts';
import useTheme from '@context/Themes/hooks/useTheme.tsx';
import tw from '@helpers/tailwind.helper.ts';
import { useEffect, useRef, useState } from 'react';

/**
 * ThemeSwitch component allows users to switch between available themes.
 * It toggles between two themes directly or opens a dropdown for selection when more than two themes are available.
 * Utilizes the `useTheme` hook for getting and setting the current theme.
 *
 * @component
 * @example
 * return (
 *   <ThemeSwitch />
 * )
 */
function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (themes.slice().length !== 2) {
      setIsOpen(!isOpen);
    } else {
      const newTheme = themes.find((t) => t !== theme);
      if (newTheme) {
        setTheme(newTheme);
      }
    }
  };

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

  const handleChange = (themeOption: typeof theme) => {
    setTheme(themeOption);
    setIsOpen(false);
  };

  return (
    <div
      className='min-w-[40px] text-center rounded'
      onClick={toggleDropdown}
      title={theme}
      ref={dropdownRef}
    >
      {themes.slice().length === 2 ? (
        <div className='w-7 h-7 rounded-full overflow-hidden border-2 border-color-500'>
          <div className='flex h-full w-full'>
            <div
              className='flex-1'
              style={{
                backgroundColor: `var(--${theme === themes[0] ? themes[1] : themes[0]}-200)`,
              }}
            ></div>
            <div
              className='flex-1'
              style={{
                backgroundColor: `var(--${theme === themes[0] ? themes[0] : themes[1]}-200)`,
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div
          className={
            'cursor-pointer w-7 h-7 rounded-full bg-color-500 border-2 border-color-500'
          }
        />
      )}
      {themes.length > 2 && (
        <div
          className={tw(
            'fixed z-50 min-w-[28px] bg-color-50 transition-all mt-1 flex items-center justify-center flex-col gap-1 overflow-hidden rounded',
          )}
          style={{
            height: isOpen ? 32 * themes.length + 'px' : 0,
          }}
        >
          {themes.map((themeOption) => (
            <div
              key={themeOption}
              title={themeOption}
              className='w-7 h-7 rounded-full cursor-pointer border-2 border-color-500'
              style={{ backgroundColor: `var(--${themeOption}-500)` }}
              onClick={() => handleChange(themeOption)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeSwitch;
