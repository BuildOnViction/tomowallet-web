/**
 *
 * TomoWallet - Wallet Creation Page - Actions
 *
 */
// ===== IMPORTS =====
// Constants
import {
  ADD_WORD,
  REMOVE_WORD,
  RESET_STATE,
  SET_FORM_STATES,
  SET_PRIVATE_KEY,
  SHUFFLE_MNEMONIC,
  STORE_MNEMONIC,
  TOGGLE_CONFIRMATION_POPUP,
  TOGGLE_KEY_VIEW_POPUP,
  TOGGLE_KEY_VISIBLE,
  UPDATE_ERRORS,
} from './constants';
// ===================

// ===== ACTIONS =====
export const addWord = word => ({
  type: ADD_WORD,
  word,
});

export const removeWord = index => ({
  type: REMOVE_WORD,
  index,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const setFormState = newState => ({
  type: SET_FORM_STATES,
  newState,
});

export const setPrivateKey = key => ({
  type: SET_PRIVATE_KEY,
  key,
});

export const shuffleMnemonic = () => ({
  type: SHUFFLE_MNEMONIC,
});

export const storeMnemonic = mnemonic => ({
  type: STORE_MNEMONIC,
  mnemonic,
});

export const toggleConfirmationPopup = bool => ({
  type: TOGGLE_CONFIRMATION_POPUP,
  bool,
});

export const toggleKeyViewPopup = bool => ({
  type: TOGGLE_KEY_VIEW_POPUP,
  bool,
});

export const toggleKeyVisibile = bool => ({
  type: TOGGLE_KEY_VISIBLE,
  bool,
});

export const updateErrors = errors => ({
  type: UPDATE_ERRORS,
  errors,
});
// ===================
