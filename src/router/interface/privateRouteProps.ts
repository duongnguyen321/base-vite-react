import React from 'react';

interface PrivateRouteProps {
  auth: {
    isAuthenticated: boolean;
  };
  children: React.ReactNode;
}
export default PrivateRouteProps;
