import { fromJS } from 'immutable';
import {
  GENERATE_MNEMONIC,
  ADD_MNEMONIC_WORD,
  REMOVE_MNEMONIC_WORD,
  VERIFY_MNEMONIC,
  UPDATE_FORM_STATE,
  RESET_STATE,
  FORM_STATES,
  TOGGLE_CONFIRMATION_POPUP,
  TOGGLE_SUCCESS_POPUP,
  TOGGLE_VERIFYCATION_POPUP,
} from './constants';

const initialState = fromJS({
  mnemonic: {
    origin: [],
    compare: [],
    isVerified: false,
  },
  popupFlag: {
    confirmation: false,
    verification: false,
    success: false,
  },
  formState: FORM_STATES.WARNING,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_MNEMONIC:
      return state.setIn(['mnemonic', 'origin'], action.mnemonic);
    case ADD_MNEMONIC_WORD:
      return state.updateIn(['mnemonic', 'compare'], words =>
        words.concat(action.word),
      );
    case REMOVE_MNEMONIC_WORD:
      return state.updateIn(['mnemonic', 'compare'], words =>
        words.filter((_, index) => index !== action.index),
      );
    case VERIFY_MNEMONIC:
      return state.setIn(['mnemonic', 'isVerified'], action.bool);
    case UPDATE_FORM_STATE:
      return state.set('formState', action.newState);
    case TOGGLE_CONFIRMATION_POPUP:
      return state.setIn(['popupFlag', 'confirmation'], action.bool);
    case TOGGLE_VERIFYCATION_POPUP:
      return state.setIn(['popupFlag', 'verification'], action.bool);
    case TOGGLE_SUCCESS_POPUP:
      return state.setIn(['popupFlag', 'success'], action.bool);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
