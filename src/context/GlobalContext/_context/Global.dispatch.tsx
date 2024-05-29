import { createContext } from 'react';
import type GlobalContextInterface from '../_interface/GlobalContextInterface.ts';

const defaultDispatch = () => {};

const GlobalDispatch =
  createContext<GlobalContextInterface['dispatch']>(defaultDispatch);

export default GlobalDispatch;
