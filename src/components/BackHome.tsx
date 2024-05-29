import Button from '@components/Button.tsx';
import useNavigate from '@hooks/useNavigate.tsx';
import { useTranslation } from 'react-i18next';

/**
 * Renders a "Back Home" button that navigates the user to a specified route or the homepage by default.
 *
 * @param {Object} props The component props.
 * @param {string} [props.to='/'] The path to navigate to when the button is clicked. Defaults to '/' (homepage).
 * @param {any} props.[key: string] Any additional props to pass to the Button component.
 *
 * @returns {JSX.Element} A Button component that navigates the user to the specified path or homepage.
 */
function BackHome({ to = '/', ...props }: { to?: string; [key: string]: any }) {
  const { t } = useTranslation(); // Hook for internationalization.
  const navigate = useNavigate(); // Custom hook for navigation.

  /**
   * Handles the click event on the button, triggering navigation.
   */
  function handleClick() {
    navigate(to); // Navigates to the specified path.
  }

  return (
    <Button
      onClick={handleClick} // Sets the click event handler.
      {...props} // Spreads any additional props to the Button component.
    >
      {t(`commons.${to !== '/' ? 'back' : 'backHome'}`)} // Retrieves the button
      label from i18n resources.
    </Button>
  );
}

export default BackHome;
