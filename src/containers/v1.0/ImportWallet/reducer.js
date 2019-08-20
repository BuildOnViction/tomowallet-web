/**
 *
 * Import Wallet Page - Reducer
 *
 */
// Modules
import { fromJS } from 'immutable';
// Constants
import {
  IMPORT_TYPES,
  LOAD_WALLET_ADDRESSES,
  RESET_STATE,
  TOGGLE_ADDRESS_POPUP,
  UPDATE_CHOSEN_WALLET,
  UPDATE_ERRORS,
  UPDATE_INPUT,
  UPDATE_TYPE,
} from './constants';

const initialState = fromJS({
  addressPopup: {
    chosenIndex: '',
    isOpen: false,
    wallets: [],
  },
  importWallet: {
    errors: [],
    input: {},
    type: IMPORT_TYPES.RP_OR_PK,
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WALLET_ADDRESSES:
      return state
        .setIn(['addressPopup', 'wallets'], action.data)
        .setIn(['addressPopup', 'isOpen'], true);
    case RESET_STATE:
      return initialState;
    case TOGGLE_ADDRESS_POPUP:
      return state
        .setIn(['addressPopup', 'isOpen'], action.bool)
        .setIn(['addressPopup', 'chosenIndex'], '');
    case UPDATE_CHOSEN_WALLET:
      return state.setIn(['addressPopup', 'chosenIndex'], action.index);
    case UPDATE_ERRORS:
      return state.setIn(['importWallet', 'errors'], action.errors);
    case UPDATE_INPUT:
      return state
        .setIn(['importWallet', 'input', action.name], action.value)
        .setIn(['importWallet', 'errors'], []);
    case UPDATE_TYPE:
      return state
        .setIn(['importWallet', 'type'], action.importType)
        .setIn(['importWallet', 'input'], {})
        .setIn(['importWallet', 'errors'], []);
    default:
      return state;
  }
};
