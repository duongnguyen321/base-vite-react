import AssetsImg from '@components/AssetsImg.tsx';
import { type ImgProps } from '@components/Img.tsx';
import useTheme from '@context/Themes/hooks/useTheme.tsx';
import tw from '@helpers/tailwind.helper.ts';

interface LogoProps extends ImgProps {
  variant?: 'long' | 'short';
  color?: 'color' | 'gray';
  forceTheme?: 'light' | 'dark' | 'gray'; // Optional prop to force theme
  isRevert?: boolean; // Optional prop to invert light and dark themes
}

/**
 * Renders a Logo component with customizable options for variant, color, an optional forced theme, and an option to invert themes.
 * The logo's appearance is determined by the `variant`, `color`, `forceTheme`, and `isRevert` props. If `forceTheme` is not provided,
 * it adapts to the current theme from useTheme. If `isRevert` is true and `color` is 'color', the light and dark themes are inverted.
 *
 * @param {Object} props - The props for the Logo component.
 * @param {string} [props.className] - Optional class name for the Logo component.
 * @param {'long'|'short'} [props.variant='long'] - Determines the logo's variant. Can be 'long' or 'short'.
 * @param {'color'|'gray'} [props.color='color'] - Determines the logo's color scheme. Can be 'color' or 'gray'.
 * @param {'light'|'dark'|'gray'} [props.forceTheme] - Optionally forces the logo to use a specific theme.
 * @param {boolean} [props.isRevert=false] - Optionally inverts the light and dark themes when `color` is 'color'.
 * @param {ImgProps} props - Extends `ImgProps`, allowing for any additional image properties to be passed.
 * @returns {JSX.Element} The Logo component as an image, which adapts based on the provided props and theme.
 */
function Logo({
  className,
  variant = 'long',
  color = 'color',
  forceTheme,
  isRevert = false,
  ...props
}: LogoProps) {
  const { theme } = useTheme();
  let effectiveTheme = forceTheme || theme;

  if (color === 'gray') {
    effectiveTheme = 'gray';
  } else if (color === 'color' && isRevert) {
    effectiveTheme = effectiveTheme === 'light' ? 'dark' : 'light';
  }

  const baseName = `logo-${variant}-${effectiveTheme}.png`;
  return (
    <AssetsImg
      name={baseName}
      forceDirectory={'logo'}
      type={variant === 'long' ? 'image' : 'icon'}
      alt={'Nguyen Duong'}
      className={tw(
        'transition-colors bg-primary rounded-full shadow-inner shadow-current',
        className,
      )}
      {...props}
    />
  );
}

export default Logo;
