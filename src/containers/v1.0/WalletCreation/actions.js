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
  STORE_MNEMONIC,
  TOGGLE_CONFIRMATION_POPUP,
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

export const storeMnemonic = mnemonic => ({
  type: STORE_MNEMONIC,
  mnemonic,
});

export const toggleConfirmationPopup = bool => ({
  type: TOGGLE_CONFIRMATION_POPUP,
  bool,
});
// ===================
