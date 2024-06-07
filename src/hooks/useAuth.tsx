import type { UseAuthReturnType, UseAuthSaveData } from '@interface/hooks/useAuth.interface.ts';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook to manage authentication state.
 *
 * This hook provides functionality to check if a user is authenticated,
 * to set the authentication state, to log out, and to get the next path
 * for redirection after login based on URL search parameters.
 *
 * @returns {UseAuthReturnType} The authentication state and helper functions.
 */
 function useAuth(): UseAuthReturnType {
  // State hooks for user ID and token, initialized from localStorage
  const [userId, setUserId] = useState<string>(localStorage.getItem('userId') || '');
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  // Hook to access URL search parameters
  const [searchParams] = useSearchParams();

  /**
   * Sets the authentication state both in localStorage and state hooks.
   *
   * @param {UseAuthSaveData} saveData - The user ID and token to save.
   */
  const setAuth = useCallback(({ userId, token }: UseAuthSaveData) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    setUserId(userId);
    setToken(token);
  }, []);

  /**
   * Logs out the user by clearing the authentication state and invoking a callback function.
   *
   * @param {Function} callback - A callback function to execute after logging out.
   */
  const logout = useCallback((callback: () => void) => {
    setAuth({ userId: '', token: '' });
    callback();
  }, [setAuth]);

  /**
   * Retrieves the next path from URL search parameters or defaults to '/profile'.
   *
   * @returns {string} The next path for redirection.
   */
  const getNextPath = useCallback(() => searchParams.get('next') || '/profile', [searchParams]);

  // Determines if the user is authenticated based on the presence of userId and token
  const isAuth = useMemo(() => !!userId && !!token, [userId, token]);

  return { isAuth, userId, token, setAuth, logout, getNextPath };
}

export default useAuth;
