/**
 *
 * TomoWallet - Welcome Page - Actions
 *
 */
// ===== IMPORTS =====
// Constants
import {
  RESET_STATE,
  TOGGLE_PASSWORD_FORM,
  UPDATE_PASSWORD_ERRORS,
  UPDATE_PASSWORD_INPUT,
} from './constants';
// ===================

// ===== ACTIONS =====
export const resetState = () => ({
  type: RESET_STATE,
});

export const togglePasswordForm = bool => ({
  type: TOGGLE_PASSWORD_FORM,
  bool,
});

export const updatePasswordErrors = errors => ({
  type: UPDATE_PASSWORD_ERRORS,
  errors,
});

export const updatePasswordInput = (name, value) => ({
  type: UPDATE_PASSWORD_INPUT,
  name,
  value,
});
// ===================
