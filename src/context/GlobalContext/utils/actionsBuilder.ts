import type {
  ActionName,
  ActionPayloads,
  ActionType,
} from '../_interface/GlobalContextInterface.ts';

/**
 * Factory function to create action objects for Redux or similar state management.
 * @param type The type of action to create, constrained to the ActionName type.
 * @returns A function that takes a payload and returns an action object with the specified type and payload.
 * @template T The type of the action name, extending the ActionName type.
 */
function actions<T extends ActionName>(type: T) {
  return (payload: ActionPayloads[T]): ActionType<T> => ({ type, payload });
}

/**
 * Creates an 'ADD' action object.
 * @param payload The payload specific to the 'ADD' action.
 * @returns An action object with type 'ADD' and the provided payload.
 */
export function addAction(payload: ActionPayloads['ADD']): ActionType<'ADD'> {
  return actions('ADD')(payload);
}

/**
 * Creates an 'UPDATE' action object.
 * @param payload The payload specific to the 'UPDATE' action.
 * @returns An action object with type 'UPDATE' and the provided payload.
 */
export function updateAction(
  payload: ActionPayloads['UPDATE'],
): ActionType<'UPDATE'> {
  return actions('UPDATE')(payload);
}

/**
 * Creates a 'REMOVE' action object.
 * @param payload The payload specific to the 'REMOVE' action.
 * @returns An action object with type 'REMOVE' and the provided payload.
 */
export function removeAction(
  payload: ActionPayloads['REMOVE'],
): ActionType<'REMOVE'> {
  return actions('REMOVE')(payload);
}
