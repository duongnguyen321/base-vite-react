import type { Dispatch } from 'react';
import type defaultState from '../configs/defaultState.config';

export type ActionName = 'UPDATE' | 'ADD' | 'REMOVE';

export interface ActionPayloads {
  ADD: { key: keyof typeof defaultState; value: any };
  UPDATE: { key: keyof typeof defaultState; value: any };
  REMOVE: { key: keyof typeof defaultState };
}

export interface ActionType<T extends ActionName = ActionName> {
  type: T;
  payload: ActionPayloads[T];
}

interface GlobalContextInterface {
  state: typeof defaultState;
  dispatch: Dispatch<ActionType>;
}

export default GlobalContextInterface;
