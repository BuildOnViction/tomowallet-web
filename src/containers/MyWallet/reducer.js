/**
 *
 * TomoWallet - My Wallet Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import _get from 'lodash.get';
import _omit from 'lodash.omit';
import _isNumber from 'lodash.isnumber';
import moment from 'moment';
// Constants
import {
  LOAD_COIN_DATA,
  LOAD_COIN_DATA_FAILED,
  LOAD_COIN_DATA_SUCCESS,
  LOAD_TOKEN_OPTIONS,
  LOAD_TOKEN_OPTIONS_SUCCESS,
  LOAD_TRANSACTION_DATA,
  LOAD_TRANSACTION_DATA_SUCCESS,
  PORTFOLIO_COLUMNS,
  RESET_RECEIVE_TOKEN_FORM,
  RESET_SEND_TOKEN_FORM,
  RESET_STATE,
  SEND_TOKEN_FIELDS,
  SEND_TOKEN_STAGES,
  SET_TABLE_TYPE,
  TOGGLE_RECEIVE_TOKEN_POPUP,
  TOGGLE_SEND_TOKEN_POPUP,
  TOGGLE_SUCCESS_POPUP,
  TRANSACTION_COLUMNS,
  UPDATE_RECEIVE_TOKEN_ERRORS,
  UPDATE_RECEIVE_TOKEN_INPUT,
  UPDATE_SEND_TOKEN_ERRORS,
  UPDATE_SEND_TOKEN_INPUT,
  UPDATE_SEND_TOKEN_POPUP_STAGE,
  SCAN_PRIVACY_DATA_SUCCESS,
  TOGGLE_DEPOSIT_PRIVACY_POPUP,
  UPDATE_DEPOSIT_PRIVACY_ERRORS,
  DEPOSIT_PRIVACY_FIELDS,
  UPDATE_DEPOSIT_PRIVACY_INPUT,
  UPDATE_DEPOSIT_PRIVACY_POPUP_STAGE,
  DEPOSIT_STAGES,
  TOGGLE_DEPOSIT_SUCCESS_POPUP,
  WITHDRAW_STAGES,
  TOGGLE_WITHDRAW_PRIVACY_POPUP,
  WITHDRAW_PRIVACY_FIELDS,
  UPDATE_WITHDRAW_PRIVACY_INPUT,
  UPDATE_WITHDRAW_PRIVACY_ERRORS,
  TOGGLE_WITHDRAW_SUCCESS_POPUP,
  UPDATE_WITHDRAW_PRIVACY_POPUP_STAGE,
  SCAN_PRIVACY_TRANSACTION,
  SCAN_PRIVACY_TRANSACTION_SUCCESS,
  UPDATE_PROCESS,
  LOAD_BALANCE_SUCCESS
} from './constants';
import { LIST } from '../../constants';
import tomoIcon from '../../assets/images/logo-tomo.png';
// ===================

// ===== PRE-INITIATION VARIABLES =====
const initialSendForm = {
  [SEND_TOKEN_FIELDS.TOKEN]: '',
  [SEND_TOKEN_FIELDS.RECIPIENT]: '',
  [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: '',
  [SEND_TOKEN_FIELDS.MESSAGE]: '',
};

// ===== PRE-INITIATION VARIABLES =====
const initialDepositForm = {
  [DEPOSIT_PRIVACY_FIELDS.TOKEN]: '',
  [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT]: '',
};

const initialWithdrawForm = {
  [WITHDRAW_PRIVACY_FIELDS.TOKEN]: '',
  [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT]: '',
}

const initialState = fromJS({
  coinData: {
    isLoaded: false,
    data: {},
    errorMessage: '',
  },
  receiveTokenPopup: {
    errors: {},
    input: {},
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
  privacyTransactionTable: {
    data: [],
    page: 1,
    pages: 1,
    total: 0,
  },
  privacyData: [],
  depositPrivacyPopup: {
    errors: {},
    isOpen: false,
    stage: DEPOSIT_STAGES.FORM,
  },
  depositForm: initialDepositForm,
  successDepositPopup: {
    isOpen: false,
    txHash: '',
  },
  withdrawPrivacyPopup: {
    errors: {},
    isOpen: false,
    stage: WITHDRAW_STAGES.FORM,
  },
  withdrawForm: initialWithdrawForm,
  successWithdrawPopup: {
    isOpen: false,
    txHash: '',
  },
  prepareTxProof: {
    screen: '',
    total: '',
    current: '',
    status: false
  },
});
// ====================================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COIN_DATA:
      return state
        .setIn(['coinData', 'isLoaded'], false)
        .setIn(['coinData', 'errorMessage'], '');
    case LOAD_COIN_DATA_FAILED:
      return state
        .setIn(['coinData', 'isLoaded'], true)
        .setIn(['coinData', 'errorMessage'], action.message);
    case LOAD_COIN_DATA_SUCCESS:
      return state
        .setIn(['coinData', 'isLoaded'], true)
        .setIn(['coinData', 'data'], action.data)
        .update('tokenOptions', tokens =>
          tokens.map(tok => {
            if (tok[PORTFOLIO_COLUMNS.TOKEN_NAME] === 'TOMO') {
              return {
                ...tok,
                [PORTFOLIO_COLUMNS.PRICE]: _get(
                  action,
                  'data.quotes.USD.price',
                  0,
                ),
              };
            }
            return tok;
          }),
        );
    case LOAD_TOKEN_OPTIONS:
      return state.set('tokenOptions', action.initialTokens);
    case LOAD_TOKEN_OPTIONS_SUCCESS:
      return state.update('tokenOptions', tokens =>
        tokens.concat(
          action.tokens.map(token => {
            return {
              [PORTFOLIO_COLUMNS.TOKEN_NAME]: _get(token, 'name', ''),
              [PORTFOLIO_COLUMNS.SYMBOL]: _get(token, 'symbol', ''),
              [PORTFOLIO_COLUMNS.ICON]: _get(token, 'icon', ''),
              [PORTFOLIO_COLUMNS.BALANCE]: _get(token, 'balance', '0'),
              [PORTFOLIO_COLUMNS.DECIMALS]: _get(token, 'decimals', 0),
              [PORTFOLIO_COLUMNS.PRICE]: _get(token, 'usdPrice', 0),
              [PORTFOLIO_COLUMNS.TOKEN_ADDRESS]: _get(
                token,
                'tokenAddress',
                '',
              ),
              [PORTFOLIO_COLUMNS.TYPE]: _get(token, 'type', 'TRC20'),
              [PORTFOLIO_COLUMNS.TRANSACTION_FEE]: 0.03
            };
          }),
        ),
      );
    case LOAD_TRANSACTION_DATA:
      return state.setIn(['transactionTable', 'data'], []);
    case LOAD_TRANSACTION_DATA_SUCCESS:
      return state.set('transactionTable', {
        data: _get(action, 'tableData.items', []).map(trans => ({
          [TRANSACTION_COLUMNS.TOKEN_TYPE]: trans.tokenType,
          [TRANSACTION_COLUMNS.TX_HASH]: trans.txHash,
          [TRANSACTION_COLUMNS.CREATE_TIME]: moment(
            _isNumber(trans.createdTime)
              ? Number(`${trans.createdTime}000`)
              : trans.createdTime,
          ),
          [TRANSACTION_COLUMNS.FROM]: trans.from,
          [TRANSACTION_COLUMNS.TO]: trans.to,
          [TRANSACTION_COLUMNS.QUANTITY]: trans.amount,
          [TRANSACTION_COLUMNS.TYPE]: trans.type,
        })),
        page: _get(action, 'tableData.currentPage', 1),
        total: _get(action, 'tableData.total', 0),
        pages: _get(action, 'tableData.pages', 1),
      });
    case RESET_RECEIVE_TOKEN_FORM:
      return state
        .setIn(['receiveTokenPopup', 'input'], {})
        .setIn(['receiveTokenPopup', 'errors'], {});
    case RESET_SEND_TOKEN_FORM:
      return state.set('sendForm', initialSendForm);
    case RESET_STATE:
      return initialState;
    case SET_TABLE_TYPE:
      return state.set('tableType', action.tableType);
    case TOGGLE_RECEIVE_TOKEN_POPUP:
      return state.setIn(['receiveTokenPopup', 'isOpen'], action.bool);
    case TOGGLE_SEND_TOKEN_POPUP: {
      if (action.bool) {
        return state
          .setIn(['sendTokenPopup', 'isOpen'], true)
          .set('sendForm', {
            ...initialSendForm,
            ...(action.initialValues || {}),
          })
          .setIn(['sendTokenPopup', 'errors'], {});
      }
      return state.setIn(['sendTokenPopup', 'isOpen'], false);
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
    case UPDATE_RECEIVE_TOKEN_ERRORS:
      return state.setIn(['receiveTokenPopup', 'errors'], action.errors);
    case UPDATE_RECEIVE_TOKEN_INPUT:
      return state
        .setIn(['receiveTokenPopup', 'input', action.name], action.value)
        .updateIn(['receiveTokenPopup', 'errors'], errors =>
          _omit(errors, action.name),
        );
    case UPDATE_SEND_TOKEN_ERRORS:
      return state.setIn(['sendTokenPopup', 'errors'], action.errors);
    case UPDATE_SEND_TOKEN_INPUT:
      return state
        .setIn(['sendForm', action.name], action.value)
        .updateIn(['sendTokenPopup', 'errors'], errors =>
          _omit(errors, action.name),
        );
    case UPDATE_SEND_TOKEN_POPUP_STAGE:
      return state
        .setIn(['sendTokenPopup', 'stage'], action.stage)
        .setIn(['sendTokenPopup', 'errors'], {});
    case SCAN_PRIVACY_DATA_SUCCESS:
        return state
          .set('privacyData', [{
            [PORTFOLIO_COLUMNS.TOKEN_NAME]: 'TomoChain',
            [PORTFOLIO_COLUMNS.SYMBOL]: 'TOMO',
            [PORTFOLIO_COLUMNS.ICON]: tomoIcon,
            [PORTFOLIO_COLUMNS.BALANCE]: action.data.balance || 0,
            [PORTFOLIO_COLUMNS.DECIMALS]: 8,
            [PORTFOLIO_COLUMNS.PRICE]: 1,
            [PORTFOLIO_COLUMNS.TOKEN_ADDRESS]: '',
            [PORTFOLIO_COLUMNS.TYPE]: 'TRC21',
            [PORTFOLIO_COLUMNS.TRANSACTION_FEE]: '0.001'
          }]);
      case TOGGLE_DEPOSIT_PRIVACY_POPUP:{
        if (action.bool) {
          return state
            .setIn(['depositPrivacyPopup', 'isOpen'], true)
            .set('depositForm', {
              ...initialDepositForm,
              ...(action.initialValues || {}),
            })
            .setIn(['depositPrivacyPopup', 'errors'], {});
        }
        return state.setIn(['depositPrivacyPopup', 'isOpen'], false);
      }
      case UPDATE_DEPOSIT_PRIVACY_ERRORS:
        return state.setIn(['depositPrivacyPopup', 'errors'], action.errors);
      case UPDATE_DEPOSIT_PRIVACY_INPUT:
        return state
          .setIn(['depositForm', action.name], action.value)
          .updateIn(['depositPrivacyPopup', 'errors'], errors =>
            _omit(errors, action.name),
          );
      case UPDATE_DEPOSIT_PRIVACY_POPUP_STAGE:
        return state
          .setIn(['depositPrivacyPopup', 'stage'], action.stage)
          .setIn(['depositPrivacyPopup', 'errors'], {});
      case TOGGLE_DEPOSIT_SUCCESS_POPUP: {
        const newState = state
          .setIn(['successDepositPopup', 'isOpen'], action.bool)
          .setIn(['successDepositPopup', 'txHash'], action.hash);
        if (!action.bool) {
          return newState.setIn(
            ['depositPrivacyPopup', 'stage'],
            DEPOSIT_STAGES.FORM,
          );
        }
        return newState;
      }
      case TOGGLE_WITHDRAW_PRIVACY_POPUP: {
        if (action.bool) {
          return state
            .setIn(['withdrawPrivacyPopup', 'isOpen'], true)
            .set('withdrawForm', {
              ...initialWithdrawForm,
              ...(action.initialValues || {}),
            })
            .setIn(['withdrawPrivacyPopup', 'errors'], {});
        }
        return state.setIn(['withdrawPrivacyPopup', 'isOpen'], false);
      }
      case UPDATE_WITHDRAW_PRIVACY_INPUT:
        return state
        .setIn(['withdrawForm', action.name], action.value)
        .updateIn(['withdrawPrivacyPopup', 'errors'], errors =>
          _omit(errors, action.name),
        );
      case UPDATE_WITHDRAW_PRIVACY_ERRORS:
        return state.setIn(['withdrawPrivacyPopup', 'errors'], action.errors);
      case UPDATE_WITHDRAW_PRIVACY_POPUP_STAGE:
        return state
          .setIn(['withdrawPrivacyPopup', 'stage'], action.stage)
          .setIn(['withdrawPrivacyPopup', 'errors'], {});
      case TOGGLE_WITHDRAW_SUCCESS_POPUP: {
        const newState = state
          .setIn(['successWithdrawPopup', 'isOpen'], action.bool)
          .setIn(['successWithdrawPopup', 'txHash'], action.hash);
        if (!action.bool) {
          return newState.setIn(
            ['withdrawPrivacyPopup', 'stage'],
            DEPOSIT_STAGES.FORM,
          );
        }
        return newState;
      }
      case SCAN_PRIVACY_TRANSACTION:
      return state.setIn(['privacyTransactionTable', 'data'], []);
      case SCAN_PRIVACY_TRANSACTION_SUCCESS:
        return state.set('privacyTransactionTable', {
          data: _get(action, 'tableData.items', []).map(trans => ({
            [TRANSACTION_COLUMNS.TOKEN_TYPE]: 'TOMO',
            [TRANSACTION_COLUMNS.CREATE_TIME]: moment(
              _isNumber(trans.createdTime)
                ? Number(`${trans.createdTime}000`)
                : trans.createdTime,
            ),
            [TRANSACTION_COLUMNS.FROM]: trans.from,
            [TRANSACTION_COLUMNS.TO]: trans.to,
            [TRANSACTION_COLUMNS.QUANTITY]: trans.amount,
          })),
          page: _get(action, 'tableData.currentPage', 1),
          total: _get(action, 'tableData.total', 0),
          pages: _get(action, 'tableData.pages', 1),
        });
      case UPDATE_PROCESS:
        return state.set('prepareTxProof', {
          screen: _get(action, ['data', 'screen'], ''),
          total: _get(action, ['data', 'total'], 0),
          current: _get(action, ['data', 'current'], 0),
          status: _get(action, ['data', 'status'], false)
        })
      case LOAD_BALANCE_SUCCESS: {
            return state
            .update('tokenOptions', tokens =>
                tokens.map(tok => {
                if (tok[PORTFOLIO_COLUMNS.TOKEN_NAME] === 'TOMO') {
                    return {
                    ...tok,
                    [PORTFOLIO_COLUMNS.BALANCE]: _get(
                        action,
                        'wallet.balance',
                        0,
                    ),
                    };
                }
                return tok;
                }),
            );
        }
      case 'UPDATE_PRIVACY_BALANCE':
          return state
            .set('privacyData', [{
              [PORTFOLIO_COLUMNS.TOKEN_NAME]: 'TomoChain',
              [PORTFOLIO_COLUMNS.SYMBOL]: 'TOMO',
              [PORTFOLIO_COLUMNS.ICON]: tomoIcon,
              [PORTFOLIO_COLUMNS.BALANCE]: action.data.balance || 0,
              [PORTFOLIO_COLUMNS.DECIMALS]: 8,
              [PORTFOLIO_COLUMNS.PRICE]: 1,
              [PORTFOLIO_COLUMNS.TOKEN_ADDRESS]: '',
              [PORTFOLIO_COLUMNS.TYPE]: 'TRC21',
              [PORTFOLIO_COLUMNS.TRANSACTION_FEE]: '0.001',
            }]);
    default:
      return state;
  }
};
// ===================
