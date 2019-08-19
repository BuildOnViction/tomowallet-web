/**
 *
 * TomoWallet - My Wallet Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import { omit as _omit, get as _get } from 'lodash';
import moment from 'moment';
// Constants
import {
  LOAD_TOKEN_OPTIONS,
  LOAD_TOKEN_OPTIONS_SUCCESS,
  LOAD_TRANSACTION_DATA,
  LOAD_TRANSACTION_DATA_SUCCESS,
  PORFOLIO_COLUMNS,
  RESET_SEND_TOKEN_FORM,
  SEND_TOKEN_FIELDS,
  SEND_TOKEN_STAGES,
  SET_TABLE_TYPE,
  TOGGLE_RECEIVE_TOKEN_POPUP,
  TOGGLE_SEND_TOKEN_POPUP,
  TOGGLE_SUCCESS_POPUP,
  TRANSACTION_COLUMNS,
  UPDATE_SEND_TOKEN_ERRORS,
  UPDATE_SEND_TOKEN_INPUT,
  UPDATE_SEND_TOKEN_POPUP_STAGE,
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
    stage: SEND_TOKEN_STAGES.FORM,
  },
  successPopup: {
    isOpen: false,
    txHash: '',
  },
  tableType: LIST.MY_WALLET_TABLE_TYPES[0].value,
  tokenOptions: [],
  transactionTable: {
    data: [],
    page: 1,
    pages: 1,
    total: 0,
  },
});
// ====================================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOKEN_OPTIONS:
      return state.set('tokenOptions', action.initialTokens);
    case LOAD_TOKEN_OPTIONS_SUCCESS:
      return state.update('tokenOptions', tokens =>
        tokens.concat(
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
        ),
      );
    case LOAD_TRANSACTION_DATA:
      return state.setIn(['transactionTable', 'data'], []);
    case LOAD_TRANSACTION_DATA_SUCCESS:
      return state.set('transactionTable', {
        data: _get(action, 'tableData.items', []).map(trans => ({
          [TRANSACTION_COLUMNS.TOKEN_TYPE]: 'TOMO',
          [TRANSACTION_COLUMNS.TX_HASH]: _get(trans, 'hash', ''),
          [TRANSACTION_COLUMNS.CREATE_TIME]: moment(_get(trans, 'createdAt')),
          [TRANSACTION_COLUMNS.FROM]: _get(trans, 'from', ''),
          [TRANSACTION_COLUMNS.TO]: _get(trans, 'to', ''),
          [TRANSACTION_COLUMNS.QUANTITY]: _get(trans, 'value', ''),
        })),
        page: _get(action, 'tableData.currentPage', 1),
        total: _get(action, 'tableData.total', 0),
        pages: _get(action, 'tableData.pages', 1),
      });
    case RESET_SEND_TOKEN_FORM:
      return state.set('sendForm', initialSendForm);
    case SET_TABLE_TYPE:
      return state.set('tableType', action.tableType);
    case TOGGLE_RECEIVE_TOKEN_POPUP:
      return state.setIn(['receiveTokenPopup', 'isOpen'], action.bool);
    case TOGGLE_SEND_TOKEN_POPUP: {
      if (action.bool) {
        return state
          .setIn(['sendTokenPopup', 'isOpen'], action.bool)
          .set('sendForm', {
            ...initialSendForm,
            ...(action.initialValues || {}),
          });
      }
      return state.setIn(['sendTokenPopup', 'isOpen'], action.bool);
    }
    case TOGGLE_SUCCESS_POPUP: {
      const newState = state
        .setIn(['successPopup', 'isOpen'], action.bool)
        .setIn(['successPopup', 'txHash'], action.hash);
      if (!action.bool) {
        return newState.setIn(
          ['sendTokenPopup', 'stage'],
          SEND_TOKEN_STAGES.FORM,
        );
      }
      return newState;
    }
    case UPDATE_SEND_TOKEN_ERRORS:
      return state.setIn(['sendTokenPopup', 'errors'], action.errors);
    case UPDATE_SEND_TOKEN_INPUT:
      return state
        .setIn(['sendForm', action.name], action.value)
        .updateIn(['sendTokenPopup', 'errors'], errors =>
          _omit(errors, action.name),
        );
    case UPDATE_SEND_TOKEN_POPUP_STAGE:
      return state.setIn(['sendTokenPopup', 'stage'], action.stage);
    default:
      return state;
  }
};
// ===================
