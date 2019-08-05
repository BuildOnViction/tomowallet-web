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
  RESET_VERIFICATION_FORM,
  UPDATE_ERRORS,
} from './constants';

const initialState = fromJS({
  mnemonic: {
    // test: '',
    origin: [],
    compare: [],
    errors: [],
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
    // .setIn(['mnemonic', 'test'], action.mnemonic);
    case ADD_MNEMONIC_WORD:
      return state.updateIn(['mnemonic', 'compare'], words =>
        words.concat(action.word),
      );
    case REMOVE_MNEMONIC_WORD:
      return state
        .updateIn(['mnemonic', 'compare'], words =>
          words.filter((_, index) => index !== action.index),
        )
        .setIn(['mnemonic', 'errors'], []);
    case VERIFY_MNEMONIC:
      return state
        .setIn(['popupFlag', 'verification'], false)
        .setIn(['popupFlag', 'success'], true);
    case UPDATE_FORM_STATE:
      return state.set('formState', action.newState);
    case TOGGLE_CONFIRMATION_POPUP:
      return state.setIn(['popupFlag', 'confirmation'], action.bool);
    case TOGGLE_VERIFYCATION_POPUP:
      return state.setIn(['popupFlag', 'verification'], action.bool);
    case TOGGLE_SUCCESS_POPUP:
      return state.setIn(['popupFlag', 'success'], action.bool);
    case RESET_VERIFICATION_FORM:
      return state
        .setIn(['mnemonic', 'compare'], [])
        .setIn(['mnemonic', 'errors'], []);
    case UPDATE_ERRORS:
      return state.setIn(['mnemonic', 'errors'], action.errors);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
