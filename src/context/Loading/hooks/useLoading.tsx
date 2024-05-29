import LoadingContext from '../Loading.context.tsx';
import { useContext } from 'react';

const useLoading = () => useContext(LoadingContext);
export default useLoading;
