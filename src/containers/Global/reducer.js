/**
 *
 * TomoWallet - Global Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
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
  wallet: null,
  language: _get(LIST, ['LANGUAGES', 0, 'value'], ''),
  loading: false,
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
    case STORE_WALLET_INFO:
      return state.set('wallet', action.data);
    case TOGGLE_LOADING_SCREEN:
      return state.set('loading', action.bool);
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
