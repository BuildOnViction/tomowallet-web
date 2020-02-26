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
  SET_NETWORK,
  STORE_WALLET_INFO,
  STORE_PRIVACY_WALLET_INFO,
  TOGGLE_CLIPBOARD_POPUP,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_NETWORK_CONFIRMATION_POPUP,
  TOGGLE_WALLET_POPUP,
  UPDATE_WALLET_POPUP_CONTENT_TAB,
  UPDATE_WALLET_POPUP_STAGE,
  TOGGLE_PRIVACY_MODE,
  UPDATE_PRIVACY_INFO,
  RELEASE_PRIVACY_MODE
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

export const setNetwork = network => ({
  type: SET_NETWORK,
  network,
});

export const storeWallet = data => ({
  type: STORE_WALLET_INFO,
  data,
});

export const toggleClipboardCopyState = bool => ({
  type: TOGGLE_CLIPBOARD_POPUP,
  bool,
});

export const toggleLoading = bool => ({
  type: TOGGLE_LOADING_SCREEN,
  bool,
});

export const toggleNetworkConfirmationPopup = (bool, networkOpt) => ({
  type: TOGGLE_NETWORK_CONFIRMATION_POPUP,
  bool,
  networkOpt,
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

export const togglePrivacyMode = (mode) => ({
  type: TOGGLE_PRIVACY_MODE,
  mode
});

export const updatePrivacyData = data => ({
  type: UPDATE_PRIVACY_INFO,
  data,
});

export const releasePrivacyMode = () => ({
  type: RELEASE_PRIVACY_MODE,
});

export const storePrivacyWallet = data => ({
  type: STORE_PRIVACY_WALLET_INFO,
  data,
});
// ===================
