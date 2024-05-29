import type LoadingContextType from './_interface/LoadingContextType.ts';
import { createContext } from 'react';


const defaultValue: LoadingContextType = {
  loading: false,
  setLoading: () => {
  }
};
const LoadingContext = createContext<LoadingContextType>(defaultValue);

export default LoadingContext;
