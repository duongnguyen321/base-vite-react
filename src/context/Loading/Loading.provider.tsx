import type ProviderProps from '@context/interface/Provider.types.ts';
import LoadingContext from './Loading.context.tsx';
import { useState } from 'react';

const LoadingProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
