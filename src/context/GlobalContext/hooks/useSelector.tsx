import { useContext } from 'react';
import GlobalState from '../_context/Global.state.tsx';
import type defaultState from '../configs/defaultState.config.ts';

const useSelector = <TSelected,>(
  // eslint-disable-next-line no-unused-vars
  selector: (state: typeof defaultState) => TSelected,
): TSelected => selector(useContext(GlobalState));
export default useSelector;
