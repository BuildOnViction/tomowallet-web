/**
 *
 * TomoWallet - Wallet Creation Page - Actions
 *
 */
// ===== IMPORTS =====
// Constants
import { SET_FORM_STATES } from './constants';
// ===================

// ===== ACTIONS =====
export const setFormState = newState => ({
  type: SET_FORM_STATES,
  newState,
});
// ===================
