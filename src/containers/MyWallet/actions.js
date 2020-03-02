/**
 *
 * TomoWallet - My Wallet Page - Actions
 *
 */
// ===== IMPORTS =====
// Constants
import {
  LOAD_COIN_DATA,
  LOAD_COIN_DATA_FAILED,
  LOAD_COIN_DATA_SUCCESS,
  LOAD_TOKEN_OPTIONS,
  LOAD_TOKEN_OPTIONS_SUCCESS,
  LOAD_TRANSACTION_DATA,
  LOAD_TRANSACTION_DATA_SUCCESS,
  RESET_RECEIVE_TOKEN_FORM,
  RESET_SEND_TOKEN_FORM,
  RESET_STATE,
  SET_TABLE_TYPE,
  SUBMIT_SEND_TOKEN,
  TOGGLE_RECEIVE_TOKEN_POPUP,
  TOGGLE_SEND_TOKEN_POPUP,
  TOGGLE_SUCCESS_POPUP,
  UPDATE_RECEIVE_TOKEN_ERRORS,
  UPDATE_RECEIVE_TOKEN_INPUT,
  UPDATE_SEND_TOKEN_ERRORS,
  UPDATE_SEND_TOKEN_INPUT,
  UPDATE_SEND_TOKEN_POPUP_STAGE,
  SCAN_PRIVACY_DATA,
  SCAN_PRIVACY_DATA_FAILED,
  SCAN_PRIVACY_DATA_SUCCESS,
  TOGGLE_DEPOSIT_PRIVACY_POPUP,
  UPDATE_DEPOSIT_PRIVACY_INPUT,
  UPDATE_DEPOSIT_PRIVACY_POPUP_STAGE,
  TOGGLE_DEPOSIT_SUCCESS_POPUP,
  TOGGLE_WITHDRAW_PRIVACY_POPUP,
  UPDATE_WITHDRAW_PRIVACY_POPUP_STAGE,
  UPDATE_WITHDRAW_PRIVACY_INPUT,
  UPDATE_DEPOSIT_PRIVACY_ERRORS,
  UPDATE_WITHDRAW_PRIVACY_ERRORS,
  TOGGLE_WITHDRAW_SUCCESS_POPUP,
  SCAN_PRIVACY_TRANSACTION,
  SCAN_PRIVACY_TRANSACTION_SUCCESS,
  SCAN_PRIVACY_TRANSACTION_FAILED,
  UPDATE_PROCESS,
  LOAD_BALANCE_SUCCESS,
} from './constants';
// ===================

// ===== ACTIONS =====
export const loadCoinData = () => ({
  type: LOAD_COIN_DATA,
});

export const loadCoinDataFailed = message => ({
  type: LOAD_COIN_DATA_FAILED,
  message,
});

export const loadCoinDataSuccess = data => ({
  type: LOAD_COIN_DATA_SUCCESS,
  data,
});

export const loadTokenOptions = (params, initialTokens) => ({
  type: LOAD_TOKEN_OPTIONS,
  params,
  initialTokens,
});

export const loadTokenOptionsSuccess = tokens => ({
  type: LOAD_TOKEN_OPTIONS_SUCCESS,
  tokens,
});

export const loadTransactionData = params => ({
  type: LOAD_TRANSACTION_DATA,
  params,
});

export const loadTransactionDataSuccess = tableData => ({
  type: LOAD_TRANSACTION_DATA_SUCCESS,
  tableData,
});

export const resetReceiveToKenForm = () => ({
  type: RESET_RECEIVE_TOKEN_FORM,
});

export const resetSendTokenForm = () => ({
  type: RESET_SEND_TOKEN_FORM,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const setTableType = tableType => ({
  type: SET_TABLE_TYPE,
  tableType,
});

export const submitSendToken = (amount, successMsg) => ({
  type: SUBMIT_SEND_TOKEN,
  amount,
  successMsg,
});

export const toggleReceiveTokenPopup = bool => ({
  type: TOGGLE_RECEIVE_TOKEN_POPUP,
  bool,
});

export const toggleSendTokenPopup = (bool, initialValues) => ({
  type: TOGGLE_SEND_TOKEN_POPUP,
  bool,
  initialValues,
});

export const toggleSuccessPopup = (bool, hash) => ({
  type: TOGGLE_SUCCESS_POPUP,
  bool,
  hash,
});

export const updateReceiveTokenErrors = errors => ({
  type: UPDATE_RECEIVE_TOKEN_ERRORS,
  errors,
});

export const updateReceiveTokenInput = (name, value) => ({
  type: UPDATE_RECEIVE_TOKEN_INPUT,
  name,
  value,
});

export const updateSendTokenErrors = errors => ({
  type: UPDATE_SEND_TOKEN_ERRORS,
  errors,
});

export const updateSendTokenInput = (name, value) => ({
  type: UPDATE_SEND_TOKEN_INPUT,
  name,
  value,
});

export const updateSendTokenPopupStage = stage => ({
  type: UPDATE_SEND_TOKEN_POPUP_STAGE,
  stage,
});

// PRIVACY
export const scanPrivacyData = data => ({
  type: SCAN_PRIVACY_DATA,
  data,
});

export const scanPrivacyDataFailed = message => ({
  type: SCAN_PRIVACY_DATA_FAILED,
  message,
});

export const scanPrivacyDataSuccess = data => ({
  type: SCAN_PRIVACY_DATA_SUCCESS,
  data,
});

export const toggleDepositPrivacyPopup = (bool, initialValues) => ({
  type: TOGGLE_DEPOSIT_PRIVACY_POPUP,
  bool,
  initialValues,
});
export const updateDepositPrivacyInput = (name, value) => ({
  type: UPDATE_DEPOSIT_PRIVACY_INPUT,
  name,
  value,
});
export const updateDepositPrivacyPopupStage = stage => ({
  type: UPDATE_DEPOSIT_PRIVACY_POPUP_STAGE,
  stage,
});
export const toggleSuccessDepositPopup = (bool, hash) => ({
  type: TOGGLE_DEPOSIT_SUCCESS_POPUP,
  bool,
  hash,
});
export const toggleWithdrawPrivacyPopup = (bool, initialValues) => ({
  type: TOGGLE_WITHDRAW_PRIVACY_POPUP,
  bool,
  initialValues,
});
export const updateWithdrawPrivacyPopupStage = stage => ({
  type: UPDATE_WITHDRAW_PRIVACY_POPUP_STAGE,
  stage,
});
export const updateWithdrawPrivacyInput = (name, value) => ({
  type: UPDATE_WITHDRAW_PRIVACY_INPUT,
  name,
  value,
});
export const updateDepositPrivacyErrors = errors => ({
  type: UPDATE_DEPOSIT_PRIVACY_ERRORS,
  errors,
});
export const updateWithdrawPrivacyErrors = errors => ({
  type: UPDATE_WITHDRAW_PRIVACY_ERRORS,
  errors,
});
export const toggleSuccessWithdrawPopup = (bool, hash) => ({
  type: TOGGLE_WITHDRAW_SUCCESS_POPUP,
  bool,
  hash,
});
export const scanPrivacyTransaction = wallet => ({
  type: SCAN_PRIVACY_TRANSACTION,
  wallet,
});
export const scanPrivacyTransactionSuccess = tableData => ({
  type: SCAN_PRIVACY_TRANSACTION_SUCCESS,
  tableData,
});
export const scanPrivacyTransactionFailed = wallet => ({
  type: SCAN_PRIVACY_TRANSACTION_FAILED,
  wallet,
});
export const updateProcessing = (data) => ({
  type: UPDATE_PROCESS,
  data,
});
export const loadBalanceSuccess = wallet => ({
  type: LOAD_BALANCE_SUCCESS,
  wallet
});

export const updatePrivacyBalance = balance => ({
  type: "UPDATE_PRIVACY_BALANCE",
  data: {
    balance
  }
});

// ===================
