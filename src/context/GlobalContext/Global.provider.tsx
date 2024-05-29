import defaultState from '@context/GlobalContext/configs/defaultState.config.ts';
import { makeEmpty } from '@helpers/object.ts';
import { useReducer } from 'react';
import type ProviderProps from '../interface/Provider.types.ts';
import GlobalDispatch from './_context/Global.dispatch.tsx';
import GlobalState from './_context/Global.state.tsx';
import type { ActionType } from './_interface/GlobalContextInterface.ts';

const reducer = (state: typeof defaultState, action: ActionType) => {
  switch (action.type) {
    case 'UPDATE':
      if ('value' in action.payload) {
        const { key, value } = action.payload;
        return { ...state, [key]: value };
      }
      break;
    case 'ADD':
      if ('value' in action.payload) {
        const { key: addKey, value: addValue } = action.payload;
        return { ...state, [addKey]: addValue };
      }
      break;
    case 'REMOVE':
      const { key: removeKey } = action.payload;
      const emptyValue = makeEmpty(state[removeKey]);
      return { ...state, [removeKey]: emptyValue };
    default:
      return state;
  }
  return state;
};

const GlobalProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <GlobalDispatch.Provider value={dispatch}>
      <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
    </GlobalDispatch.Provider>
  );
};

export default GlobalProvider;
