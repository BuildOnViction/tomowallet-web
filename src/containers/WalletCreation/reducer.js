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
  FORM_STATES,
  PASSWORD_POPUP_STATES,
  REMOVE_WORD,
  RESET_STATE,
  REVEAL_PASSSWORD_INPUT,
  SET_FORM_STATES,
  SET_PRIVATE_KEY,
  SHUFFLE_MNEMONIC,
  STORE_MNEMONIC,
  TOGGLE_CONFIRMATION_POPUP,
  TOGGLE_KEY_VIEW_POPUP,
  TOGGLE_KEY_VISIBLE,
  TOGGLE_PASSWORD_POPUP,
  UPDATE_ERRORS,
  UPDATE_INPUT,
  UPDATE_PASSWORD_POPUP_ERRORS,
  UPDATE_PASSWORD_POPUP_INPUT,
  UPDATE_PASSWORD_POPUP_STATE,
} from './constants';
import { shuffleArray } from '../../utils';
// ===================

// ===== PRE-DEFINED VARIABLES =====
const initialPasswordPopupState = {
  errors: {},
  input: {},
  isRevealed: false,
  state: PASSWORD_POPUP_STATES.PASSWORD,
};

const initialState = fromJS({
  confirmation: {
    isOpen: false,
  },
  errors: [],
  formState: FORM_STATES.WARNING,
  formValues: {},
  keyView: {
    isOpen: false,
    key: '',
    isPKVisible: false,
  },
  mnemonic: {
    origin: '',
    compare: [],
  },
  passwordPopup: {
    isOpen: false,
    ...initialPasswordPopupState,
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
    case REVEAL_PASSSWORD_INPUT:
      return state.setIn(['passwordPopup', 'isRevealed'], action.bool);
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
    case TOGGLE_PASSWORD_POPUP:
      return action.bool
        ? state.set('passwordPopup', {
            isOpen: action.bool,
            ...initialPasswordPopupState,
          })
        : state.setIn(['passwordPopup', 'isOpen'], action.bool);
    case UPDATE_ERRORS:
      return state.set('errors', action.errors);
    case UPDATE_INPUT:
      return state.update('formValues', values => ({
        ...values,
        [action.name]: action.value,
      }));
    case UPDATE_PASSWORD_POPUP_ERRORS:
      return state.setIn(['passwordPopup', 'errors'], action.errors);
    case UPDATE_PASSWORD_POPUP_INPUT:
      return state
        .updateIn(['passwordPopup', 'input'], values => ({
          ...values,
          [action.name]: action.value,
        }))
        .setIn(['passwordPopup', 'errors'], {});
    case UPDATE_PASSWORD_POPUP_STATE:
      return state
        .setIn(['passwordPopup', 'state'], action.state)
        .setIn(['passwordPopup', 'errors'], {});
    default:
      return state;
  }
};
// ===================
