/**
 *
 * TomoWallet - Wallet Creation Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
// Utilities & Constants
import {
  ADD_WORD,
  CLEAR_COMPARISON,
  REMOVE_WORD,
  FORM_STATES,
  RESET_STATE,
  SET_FORM_STATES,
  SET_PRIVATE_KEY,
  SHUFFLE_MNEMONIC,
  STORE_MNEMONIC,
  TOGGLE_CONFIRMATION_POPUP,
  TOGGLE_KEY_VIEW_POPUP,
  TOGGLE_KEY_VISIBLE,
  UPDATE_ERRORS,
} from './constants';
import { shuffleArray } from '../../utils';
// ===================

// ===== PRE-DEFINED VARIABLES =====
const initialState = fromJS({
  confirmation: {
    isOpen: false,
  },
  errors: [],
  formState: FORM_STATES.WARNING,
  keyView: {
    isOpen: false,
    key: '',
    isPKVisible: false,
  },
  mnemonic: {
    origin: '',
    compare: [],
  },
});
// =================================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORD:
      return state.updateIn(['mnemonic', 'compare'], words =>
        words.concat(action.word),
      );
    case CLEAR_COMPARISON:
      return state.setIn(['mnemonic', 'compare'], []);
    case REMOVE_WORD:
      return state.updateIn(['mnemonic', 'compare'], words =>
        words.filter((_, index) => index !== action.index),
      );
    case RESET_STATE:
      return initialState;
    case SET_FORM_STATES:
      return state.set('formState', action.newState);
    case SET_PRIVATE_KEY:
      return state.setIn(['keyView', 'key'], action.key);
    case SHUFFLE_MNEMONIC: {
      const shuffledMnemonic = shuffleArray(
        state.getIn(['mnemonic', 'origin']).split(' '),
      );
      return state.setIn(['mnemonic', 'shuffled'], shuffledMnemonic);
    }
    case STORE_MNEMONIC:
      return state.setIn(['mnemonic', 'origin'], action.mnemonic);
    case TOGGLE_CONFIRMATION_POPUP:
      return state.setIn(['confirmation', 'isOpen'], action.bool);
    case TOGGLE_KEY_VIEW_POPUP:
      return state.setIn(['keyView', 'isOpen'], action.bool);
    case TOGGLE_KEY_VISIBLE:
      return state.setIn(['keyView', 'isPKVisible'], action.bool);
    case UPDATE_ERRORS:
      return state.set('errors', action.errors);
    default:
      return state;
  }
};
// ===================
