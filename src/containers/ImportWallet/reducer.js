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
  LOAD_KEYSTORE_FILE,
  LOAD_WALLET_ADDRESSES,
  RESET_STATE,
  REVEAL_PASSWORD_INPUT,
  TOGGLE_ADDRESS_POPUP,
  TOGGLE_PASSWORD_POPUP,
  UPDATE_CHOSEN_WALLET,
  UPDATE_ERRORS,
  UPDATE_KEY_INPUT_TYPE,
  UPDATE_INPUT,
  UPDATE_PASSWORD_POPUP_ERRORS,
  UPDATE_PASSWORD_POPUP_INPUT,
  UPDATE_TYPE,
  KEY_INPUT_TYPE,
} from './constants';

const initialState = fromJS({
  addressPopup: {
    chosenIndex: '',
    isOpen: false,
    wallets: [],
  },
  importWallet: {
    errors: {},
    input: {},
    type: IMPORT_TYPES.LEDGER,
    keyInputType: KEY_INPUT_TYPE.PRIVATE_KEY,
  },
  passwordPopup: {
    errors: {},
    fileData: null,
    input: {},
    isOpen: false,
    isRevealed: false,
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_KEYSTORE_FILE:
      return state.setIn(['passwordPopup', 'fileData'], action.data);
    case LOAD_WALLET_ADDRESSES:
      return state
        .setIn(['addressPopup', 'wallets'], action.data)
        .setIn(['addressPopup', 'isOpen'], true);
    case RESET_STATE:
      return initialState;
    case REVEAL_PASSWORD_INPUT:
      return state.setIn(['passwordPopup', 'isRevealed'], action.bool);
    case TOGGLE_ADDRESS_POPUP:
      return state
        .setIn(['addressPopup', 'isOpen'], action.bool)
        .setIn(['addressPopup', 'chosenIndex'], '');
    case TOGGLE_PASSWORD_POPUP: {
      const newState = state.setIn(['passwordPopup', 'isOpen'], action.bool);
      if (action.bool) {
        return newState
          .setIn(['passwordPopup', 'input'], {})
          .setIn(['passwordPopup', 'errors'], {});
      }
      return newState;
    }
    case UPDATE_CHOSEN_WALLET:
      return state.setIn(['addressPopup', 'chosenIndex'], action.index);
    case UPDATE_ERRORS:
      return state.setIn(['importWallet', 'errors'], action.errors);
    case UPDATE_KEY_INPUT_TYPE: {
      const initialInput =
        action.newType === KEY_INPUT_TYPE.RECOVERY_PHRASE
          ? {
              hdPath: "m/44'/889'/0'/0/",
            }
          : {};
      return state
        .setIn(['importWallet', 'keyInputType'], action.newType)
        .setIn(['importWallet', 'input'], initialInput)
        .setIn(['importWallet', 'errors'], {});
    }
    case UPDATE_INPUT:
      return state
        .setIn(['importWallet', 'input', action.name], action.value)
        .setIn(['importWallet', 'errors'], {});
    case UPDATE_PASSWORD_POPUP_ERRORS:
      return state.setIn(['passwordPopup', 'errors'], action.errors);
    case UPDATE_PASSWORD_POPUP_INPUT:
      return state
        .updateIn(['passwordPopup', 'input'], values => ({
          ...values,
          [action.name]: action.value,
        }))
        .setIn(['passwordPopup', 'errors'], {});
    case UPDATE_TYPE:
      return state
        .setIn(['importWallet', 'type'], action.importType)
        .setIn(['importWallet', 'keyInputType'], KEY_INPUT_TYPE.PRIVATE_KEY)
        .setIn(['importWallet', 'input'], {})
        .setIn(['importWallet', 'errors'], {});
    default:
      return state;
  }
};
