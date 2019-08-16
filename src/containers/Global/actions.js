/**
 *
 * TomoWallet - Global Actions
 *
 */
// ===== IMPORTS =====
// Constants
import {
  RELEASE_WALLET_INFO,
  RESET_WALLET_POPUP,
  SET_LANGUAGE,
  STORE_WALLET_INFO,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_WALLET_POPUP,
  UPDATE_WALLET_POPUP_CONTENT_TAB,
  UPDATE_WALLET_POPUP_STAGE,
} from './constants';
// ===================

// ===== ACTIONS =====
export const releaseWallet = () => ({
  type: RELEASE_WALLET_INFO,
});

export const resetWalletPopup = () => ({
  type: RESET_WALLET_POPUP,
});

export const setLanguage = language => ({
  type: SET_LANGUAGE,
  language,
});

export const storeWallet = data => ({
  type: STORE_WALLET_INFO,
  data,
});

export const toggleLoading = bool => ({
  type: TOGGLE_LOADING_SCREEN,
  bool,
});

export const toggleWalletPopup = bool => ({
  type: TOGGLE_WALLET_POPUP,
  bool,
});

export const updateWalletPopupContentTab = tabType => ({
  type: UPDATE_WALLET_POPUP_CONTENT_TAB,
  tabType,
});

export const updateWalletPopupStage = stage => ({
  type: UPDATE_WALLET_POPUP_STAGE,
  stage,
});
// ===================
