import type PrivateRouteProps from '@router/interface/privateRouteProps.ts';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth: { isAuthenticated }, children }) => {
  const location = useLocation();
  let pathname = location.pathname;
  if (location.pathname.startsWith('/auth/')) {
    pathname = '/profile';
  }
  return isAuthenticated ? children : <Navigate to={`/auth/login?next=${pathname}`} />;
};

export default PrivateRoute;
