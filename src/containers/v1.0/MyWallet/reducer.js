/**
 *
 * TomoWallet - My Wallet Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import { omit as _omit, get as _get } from 'lodash';
// Constants
import {
  ADD_NATIVE_CURRENCY,
  LOAD_TOKEN_OPTIONS_SUCCESS,
  PORFOLIO_COLUMNS,
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
    case ADD_NATIVE_CURRENCY:
      return state.update('tokenOptions', tokens =>
        tokens.unshift(action.token),
      );
    case LOAD_TOKEN_OPTIONS_SUCCESS:
      return state.set(
        'tokenOptions',
        action.tokens.map(token => {
          const balance =
            Number(_get(token, 'balance', 0)) /
            Math.pow(10, _get(token, 'decimals', 0));
          return {
            [PORFOLIO_COLUMNS.TOKEN_NAME]: _get(token, 'name', ''),
            [PORFOLIO_COLUMNS.SYMBOL]: _get(token, 'symbol', ''),
            [PORFOLIO_COLUMNS.ICON]: _get(token, 'icon', ''),
            [PORFOLIO_COLUMNS.BALANCE]: balance,
            [PORFOLIO_COLUMNS.DECIMALS]: _get(token, 'decimals', 0),
            [PORFOLIO_COLUMNS.PRICE]: _get(token, 'usdPrice', 0),
            [PORFOLIO_COLUMNS.VALUE]: balance * _get(token, 'usdPrice', 0),
            [PORFOLIO_COLUMNS.TOKEN_ADDRESS]: _get(token, 'tokenAddress', ''),
            [PORFOLIO_COLUMNS.TYPE]: _get(token, 'type', 'TRC20'),
            [PORFOLIO_COLUMNS.TRANSACTION_FEE]: 0.03,
            [PORFOLIO_COLUMNS.PUBLISHER]: 'TomoChain',
          };
        }),
      );
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
      return state
        .setIn(['sendForm', action.name], action.value)
        .updateIn(['sendTokenPopup', 'errors'], errors =>
          _omit(errors, action.name),
        );
    default:
      return state;
  }
};
// ===================
