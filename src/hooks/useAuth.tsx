import type { UseAuthReturnType } from '@interface/hooks/useAuth.interface.ts';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook for managing authentication state within a React application.
 * It provides functionality to check if a user is authenticated, set the authentication state,
 * and determine the next path to navigate after authentication actions.
 *
 * @returns {UseAuthReturnType} An object containing the authentication state (`isAuth`),
 * a method to update the authentication state (`setAuth`), and a method to get the next path (`getNextPath`).
 */
function useAuth(): UseAuthReturnType {
  // State to manage authentication status, initialized based on local storage.
  const [isAuth, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuth');
    return storedAuth === 'true';
  });

  // Hook to access search parameters from the URL.
  const [searchParams] = useSearchParams();

  /**
   * Updates the authentication state both in local storage and the component state.
   * @param {boolean} authState The new authentication state to set.
   */
  const setAuth = useCallback((authState: boolean) => {
    localStorage.setItem('isAuth', String(authState));
    setIsAuthenticated(authState);
  }, []);

  /**
   * Determines the next path to navigate based on the 'next' query parameter in the URL.
   * Defaults to '/profile' if the 'next' parameter is not present.
   * @returns {string} The path to navigate to next.
   */
  const getNextPath = useCallback(() => {
    const next = searchParams.get('next');
    return next || '/profile';
  }, [searchParams]);

  return { isAuth, setAuth, getNextPath };
}

export default useAuth;
