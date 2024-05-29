import { useContext } from 'react';
import GlobalDispatch from '../_context/Global.dispatch.tsx';

const useDispatch = () => useContext(GlobalDispatch);
export default useDispatch;
