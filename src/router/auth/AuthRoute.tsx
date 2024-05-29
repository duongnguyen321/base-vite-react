import type PrivateRouteProps from '@router/interface/privateRouteProps.ts';
import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

const AuthRoute: React.FC<PrivateRouteProps> = ({
  auth: { isAuthenticated },
  children,
}) => {
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/profile';
  return !isAuthenticated ? children : <Navigate to={next} />;
};

export default AuthRoute;
