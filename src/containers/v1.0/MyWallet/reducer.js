/**
 *
 * TomoWallet - My Wallet Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
// Constants
import {
  LOAD_TOKEN_OPTIONS_SUCCESS,
  SEND_TOKEN_FIELDS,
  SET_TABLE_TYPE,
  TOGGLE_SEND_TOKEN_POPUP,
  TOGGLE_SUCCESS_POPUP,
  UPDATE_SEND_TOKEN_ERRORS,
  UPDATE_SEND_TOKEN_INPUT,
} from './constants';
import { LIST } from '../../../constants';
// ===================

// ===== PRE-INITIATION VARIABLES =====
const initialSendForm = {
  [SEND_TOKEN_FIELDS.TOKEN]: '',
  [SEND_TOKEN_FIELDS.RECIPIENT]: '',
  [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: '',
  [SEND_TOKEN_FIELDS.MESSAGE]: '',
  [SEND_TOKEN_FIELDS.TRANSACTION_FEE]: '',
};

const initialState = fromJS({
  receiveTokenPopup: {
    isOpen: false,
  },
  sendForm: initialSendForm,
  sendTokenPopup: {
    errors: {},
    isOpen: false,
  },
  successPopup: {
    isOpen: false,
    message: '',
  },
  tableType: LIST.TABLE_TYPES[0].value,
  tokenOptions: [],
});
// ====================================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOKEN_OPTIONS_SUCCESS:
      return state.set('tokenOptions', action.tokens);
    case SET_TABLE_TYPE:
      return state.set('tableType', action.tableType);
    case TOGGLE_SEND_TOKEN_POPUP: {
      if (action.bool) {
        return state
          .setIn(['sendTokenPopup', 'isOpen'], action.bool)
          .set('sendForm', {
            ...initialSendForm,
            ...(action.initialValues || {}),
          });
      }
      return state
        .setIn(['sendTokenPopup', 'isOpen'], action.bool)
        .set('sendForm', initialSendForm);
    }
    case TOGGLE_SUCCESS_POPUP:
      return state.setIn(['successPopup', 'isOpen'], action.bool);
    case UPDATE_SEND_TOKEN_ERRORS:
      return state.setIn(['sendTokenPopup', 'errors'], action.errors);
    case UPDATE_SEND_TOKEN_INPUT:
      return state.setIn(['sendForm', action.name], action.value);
    default:
      return state;
  }
};
// ===================
