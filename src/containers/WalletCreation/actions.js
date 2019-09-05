/**
 *
 * TomoWallet - Wallet Creation Page - Actions
 *
 */
// ===== IMPORTS =====
// Constants
import {
  ADD_WORD,
  CLEAR_COMPARISON,
  REMOVE_WORD,
  RESET_STATE,
  REVEAL_PASSSWORD_INPUT,
  SET_FORM_STATES,
  SET_PRIVATE_KEY,
  SHUFFLE_MNEMONIC,
  STORE_MNEMONIC,
  TOGGLE_CONFIRMATION_POPUP,
  TOGGLE_KEY_VIEW_POPUP,
  TOGGLE_KEY_VISIBLE,
  TOGGLE_PASSWORD_POPUP,
  UPDATE_ERRORS,
  UPDATE_INPUT,
  UPDATE_PASSWORD_POPUP_ERRORS,
  UPDATE_PASSWORD_POPUP_INPUT,
  UPDATE_PASSWORD_POPUP_STATE,
} from './constants';
// ===================

// ===== ACTIONS =====
export const addWord = word => ({
  type: ADD_WORD,
  word,
});

export const clearComparisonMnemonic = () => ({
  type: CLEAR_COMPARISON,
});

export const removeWord = index => ({
  type: REMOVE_WORD,
  index,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const revealPasswordInput = bool => ({
  type: REVEAL_PASSSWORD_INPUT,
  bool,
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

export const togglePasswordPopup = bool => ({
  type: TOGGLE_PASSWORD_POPUP,
  bool,
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

export const updatePasswordPopupErrors = errors => ({
  type: UPDATE_PASSWORD_POPUP_ERRORS,
  errors,
});

export const updatePasswordPopupInput = (name, value) => ({
  type: UPDATE_PASSWORD_POPUP_INPUT,
  name,
  value,
});

export const updatePasswordPopupState = state => ({
  type: UPDATE_PASSWORD_POPUP_STATE,
  state,
});
// ===================
