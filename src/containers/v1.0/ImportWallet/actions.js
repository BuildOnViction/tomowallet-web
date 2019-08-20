/**
 *
 * Import Wallet Page - Actions
 *
 */
import {
  LOAD_WALLET_ADDRESSES,
  RESET_STATE,
  TOGGLE_ADDRESS_POPUP,
  UPDATE_CHOSEN_WALLET,
  UPDATE_ERRORS,
  UPDATE_INPUT,
  UPDATE_TYPE,
} from './constants';

export const loadWalletAddresses = data => ({
  type: LOAD_WALLET_ADDRESSES,
  data,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const toggleAddressPopup = bool => ({
  type: TOGGLE_ADDRESS_POPUP,
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

export const updateInput = (name, value) => ({
  type: UPDATE_INPUT,
  name,
  value,
});

export const updateImportType = importType => ({
  type: UPDATE_TYPE,
  importType,
});
