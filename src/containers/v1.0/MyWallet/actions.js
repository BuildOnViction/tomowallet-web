/**
 *
 * TomoWallet - My Wallet Page - Actions
 *
 */
// ===== IMPORTS =====
// Constants
import {
  LOAD_TOKEN_OPTIONS,
  LOAD_TOKEN_OPTIONS_SUCCESS,
  SET_TABLE_TYPE,
  SUBMIT_SEND_TOKEN,
  TOGGLE_SEND_TOKEN_POPUP,
  TOGGLE_SUCCESS_POPUP,
  UPDATE_SEND_TOKEN_ERRORS,
  UPDATE_SEND_TOKEN_INPUT,
} from './constants';
// ===================

// ===== ACTIONS =====
export const loadTokenOptions = address => ({
  type: LOAD_TOKEN_OPTIONS,
  address,
});

export const loadTokenOptionsSuccess = tokens => ({
  type: LOAD_TOKEN_OPTIONS_SUCCESS,
  tokens,
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

export const toggleSendTokenPopup = (bool, initialValues) => ({
  type: TOGGLE_SEND_TOKEN_POPUP,
  bool,
  initialValues,
});

export const toggleSuccessPopup = bool => ({
  type: TOGGLE_SUCCESS_POPUP,
  bool,
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
// ===================
