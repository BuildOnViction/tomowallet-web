/**
 *
 * TomoWallet - Wallet Creation Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
// Constants
import {
  ADD_WORD,
  REMOVE_WORD,
  FORM_STATES,
  RESET_STATE,
  SET_FORM_STATES,
  STORE_MNEMONIC,
  TOGGLE_CONFIRMATION_POPUP,
} from './constants';
// ===================

// ===== PRE-DEFINED VARIABLES =====
const initialState = fromJS({
  formState: FORM_STATES.WARNING,
  mnemonic: '',
  isConfirmed: false,
  compare: [],
});
// =================================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORD:
      return state.update('compare', words => words.concat(action.word));
    case REMOVE_WORD:
      return state.update('compare', words =>
        words.filter((_, index) => index !== action.index),
      );
    case RESET_STATE:
      return initialState;
    case SET_FORM_STATES:
      return state.set('formState', action.newState);
    case STORE_MNEMONIC:
      return state.set('mnemonic', action.mnemonic);
    case TOGGLE_CONFIRMATION_POPUP:
      return state.set('isConfirmed', action.bool);
    default:
      return state;
  }
};
// ===================
