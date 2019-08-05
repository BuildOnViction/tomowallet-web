/**
 *
 * TomoWallet - Wallet Creation Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
// Constants
import { SET_FORM_STATES, FORM_STATES } from './constants';
// ===================

// ===== PRE-DEFINED VARIABLES =====
const initialState = fromJS({
  formState: FORM_STATES.WARNING,
});
// =================================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_STATES:
      return state.set('formState', action.newState);
    default:
      return state;
  }
};
// ===================
