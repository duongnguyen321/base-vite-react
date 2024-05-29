import { useLocation, useNavigate as _useNavigate } from 'react-router-dom';

/**
 * Custom hook for navigation within a React application using `react-router-dom` and standard web APIs.
 * This hook abstracts navigation logic, allowing for navigation to absolute paths, relative paths,
 * external URLs, and handling of the '#' hash for resetting the page location.
 *
 * @returns A function that takes a string `to` as its parameter. This parameter specifies the navigation target.
 * - If `to` starts with '/', it is treated as an absolute path within the application, and `react-router-dom`'s navigate function is used with `replace: true` to navigate without pushing a new entry onto the history stack.
 * - If `to` starts with '.' or '..', it is treated as a relative path. The function calculates the absolute path and navigates using `react-router-dom`'s navigate function with `replace: true`.
 * - If `to` starts with 'http', it is considered an external URL, and `window.location.href` is used to navigate, causing the browser to load the new page.
 * - If `to` is '#', it resets the page's location hash using `window.location.hash`.
 */
function useNavigate() {
  const _navigate = _useNavigate();
  const location = useLocation();

  return (to: string) => {
    if (to.startsWith('/')) {
      _navigate(to, { replace: true });
    } else if (to.startsWith('.') || to.startsWith('..')) {
      const newPath = new URL(to, window.location.origin + location.pathname)
        .pathname;
      _navigate(newPath, { replace: true });
    } else if (to.startsWith('http')) {
      window.location.href = to;
    } else if (to === '#') {
      window.location.hash = '';
    }
  };
}

export default useNavigate;
