/**
 *
 * Import Wallet Page - Actions
 *
 */
import {
  LOAD_KEYSTORE_FILE,
  LOAD_WALLET_ADDRESSES,
  RESET_STATE,
  REVEAL_PASSWORD_INPUT,
  TOGGLE_ADDRESS_POPUP,
  TOGGLE_PASSWORD_POPUP,
  UPDATE_CHOSEN_WALLET,
  UPDATE_ERRORS,
  UPDATE_KEY_INPUT_TYPE,
  UPDATE_INPUT,
  UPDATE_PASSWORD_POPUP_ERRORS,
  UPDATE_PASSWORD_POPUP_INPUT,
  UPDATE_TYPE,
} from './constants';

export const loadKeystoreFile = data => ({
  type: LOAD_KEYSTORE_FILE,
  data,
});

export const loadWalletAddresses = data => ({
  type: LOAD_WALLET_ADDRESSES,
  data,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const revealPasswordInput = bool => ({
  type: REVEAL_PASSWORD_INPUT,
  bool,
});

export const toggleAddressPopup = bool => ({
  type: TOGGLE_ADDRESS_POPUP,
  bool,
});

export const togglePasswordPopup = bool => ({
  type: TOGGLE_PASSWORD_POPUP,
  bool,
});

export const updateChosenWallet = index => ({
  type: UPDATE_CHOSEN_WALLET,
  index,
});

export const updateErrors = errors => ({
  type: UPDATE_ERRORS,
  errors,
});

export const updateKeyInputType = newType => ({
  type: UPDATE_KEY_INPUT_TYPE,
  newType,
});

export const updateInput = (name, value) => ({
  type: UPDATE_INPUT,
  name,
  value,
});

export const updatePasswordPopupErrors = errors => ({
  type: UPDATE_PASSWORD_POPUP_ERRORS,
  errors,
});

export const updatePasswordPopupInput = (name, value) => ({
  type: UPDATE_PASSWORD_POPUP_INPUT,
  name,
  value,
});

export const updateImportType = importType => ({
  type: UPDATE_TYPE,
  importType,
});