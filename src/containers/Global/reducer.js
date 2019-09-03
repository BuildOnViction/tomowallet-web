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
  TOGGLE_CLIPBOARD_COPY_STATE,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_NETWORK_CONFIRMATION_POPUP,
  TOGGLE_WALLET_POPUP,
  UPDATE_WALLET_POPUP_CONTENT_TAB,
  UPDATE_WALLET_POPUP_STAGE,
  WALLET_POPUP_STAGE,
  WALLET_POPUP_CONTENT_TAB,
} from './constants';
import { LIST } from '../../constants';
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
    data: LIST.NETWORKS[0],
  },
  networkConfirmationPopup: {
    isOpen: false,
    selected: {},
  },
  wallet: null,
  walletPopup: initialWalletPopupState,
});
// =============================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case RELEASE_WALLET_INFO:
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
    case TOGGLE_CLIPBOARD_COPY_STATE:
      return state.setIn(['clipboardPopup', 'isOpen'], action.bool);
    case TOGGLE_LOADING_SCREEN:
      return state.set('loading', action.bool);
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
    default:
      return state;
  }
};
// ===================
