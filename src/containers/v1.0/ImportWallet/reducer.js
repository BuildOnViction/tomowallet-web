/**
 *
 * Import Wallet Page - Reducer
 *
 */
// Modules
import { fromJS } from 'immutable';
// Constants
import {
  RESET_STATE,
  UPDATE_ERRORS,
  UPDATE_INPUT,
  UPDATE_TYPE,
  IMPORT_TYPES,
} from './constants';

const initialState = fromJS({
  importWallet: {
    errors: [],
    input: {},
    isLocked: true,
    type: IMPORT_TYPES.RP_OR_PK,
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case UPDATE_ERRORS:
      return state.setIn(['importWallet', 'errors'], action.errors);
    case UPDATE_INPUT:
      return state.setIn(['importWallet', 'input', action.name], action.value);
    case UPDATE_TYPE:
      return state.setIn(['importWallet', 'type'], action.importType);
    default:
      return state;
  }
};
