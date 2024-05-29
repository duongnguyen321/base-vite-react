import { createContext } from 'react';
import type GlobalContextInterface from '../_interface/GlobalContextInterface.ts';
import defaultState from '../configs/defaultState.config.ts';

const GlobalState =
  createContext<GlobalContextInterface['state']>(defaultState);

export default GlobalState;
