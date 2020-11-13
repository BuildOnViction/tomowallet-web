/**
 *
 * TomoWallet - Global Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import _get from 'lodash.get';
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
  WALLET_POPUP_STAGE,
  WALLET_POPUP_CONTENT_TAB,
  TOGGLE_PRIVACY_MODE,
  UPDATE_PRIVACY_INFO,
  RELEASE_PRIVACY_MODE,
} from './constants';
import { LIST } from '../../constants';
import { setPrivacyInfo, setPrivacyMode, getPrivacyMode, removePrivacyMode } from '../../utils'
// ===================

// ===== INITIAL VARIABLES =====
const initialWalletPopupState = {
  isOpen: false,
  stage: WALLET_POPUP_STAGE.WARNING,
  tabType: WALLET_POPUP_CONTENT_TAB.PRIVATE_KEY,
};
const initialState = fromJS({
  clipboardPopup: {
    isOpen: false,
  },
  language: _get(LIST, ['LANGUAGES', 0, 'value'], ''),
  loading: false,
  network: {
    data: LIST.NETWORKS[1],
  },
  networkConfirmationPopup: {
    isOpen: false,
    selected: {},
  },
  wallet: null,
  walletPopup: initialWalletPopupState,
  privacyMode: false,
  privacyWallet: null
});
// =============================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case RELEASE_WALLET_INFO:
      state.set('privacyMode', false)
      return state.set('wallet', null);
    case RESET_WALLET_POPUP:
      return state.set('walletPopup', initialWalletPopupState);
    case SET_LANGUAGE:
      return state.set(
        'language',
        (LIST.LANGUAGES.find(opt => opt.value === action.language) || {})
          .value || '',
      );
    case SET_NETWORK:
        return state.setIn(['network', 'data'], action.network);
    case STORE_WALLET_INFO:
        return state.set('wallet', action.data);
    case STORE_PRIVACY_WALLET_INFO:
        return state.set('privacyWallet', action.data);
    case TOGGLE_CLIPBOARD_POPUP:
      return state.setIn(['clipboardPopup', 'isOpen'], action.bool);
    case TOGGLE_LOADING_SCREEN: {
      const oldLoadingState = state.get('loading');
      if (oldLoadingState !== action.bool) {
        return state.set('loading', action.bool);
      }
      return state;
    }
    case TOGGLE_NETWORK_CONFIRMATION_POPUP:
      return state
        .setIn(['networkConfirmationPopup', 'isOpen'], action.bool)
        .setIn(['networkConfirmationPopup', 'selected'], action.networkOpt);
    case TOGGLE_WALLET_POPUP: {
      const newState = state.setIn(['walletPopup', 'isOpen'], action.bool);
      if (!action.bool) {
        return newState
          .setIn(['walletPopup', 'stage'], WALLET_POPUP_STAGE.WARNING)
          .setIn(
            ['walletPopup', 'tabType'],
            WALLET_POPUP_CONTENT_TAB.PRIVATE_KEY,
          );
      }
      return newState;
    }
    case UPDATE_WALLET_POPUP_CONTENT_TAB:
      return state.setIn(['walletPopup', 'tabType'], action.tabType);
    case UPDATE_WALLET_POPUP_STAGE:
      return state.setIn(['walletPopup', 'stage'], action.stage);
    case TOGGLE_PRIVACY_MODE:
      if (action.mode !== undefined) {
        return state.set('privacyMode', action.mode);
      } else {
        const privacy = getPrivacyMode() === true ? false : true;
        // store privacy mode
        setPrivacyMode(privacy);
        return state.set('privacyMode', privacy);
    }
    case RELEASE_PRIVACY_MODE: {
      removePrivacyMode();
      return state.setIn(['privacyWallet'], null)
        .setIn(['privacyMode'], false);
    }
    case UPDATE_PRIVACY_INFO: {
      const wallet = action.data.privacyWallet;
      const address = action.data.address;

      setPrivacyInfo({ address, ...wallet.state() })
      return state.setIn(['privacyWallet', 'privacyWallet'], wallet);
    }
    default:
      return state;
  }
};
// ===================
