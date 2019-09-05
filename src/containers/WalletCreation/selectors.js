/**
 *
 * TomoWallet - Wallet Creation Page - Selectors
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import _get from 'lodash.get';
// Utilities
import { createDeepEqualSelector } from '../../utils';
import { DOMAIN_KEY } from './constants';
// ===================

// ===== SELECTORS =====
const selectWalletCreationDomain = state =>
  _get(state, [DOMAIN_KEY], fromJS({}));

const selectConfirmationState = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().confirmation,
);
const selectErrors = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().errors,
);
const selectFormState = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().formState,
);
const selectKeyViewState = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().keyView,
);
const selectMnemonic = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().mnemonic,
);
const selectPasswordPopup = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().passwordPopup,
);
// =====================

export {
  selectConfirmationState,
  selectErrors,
  selectFormState,
  selectKeyViewState,
  selectMnemonic,
  selectPasswordPopup,
};
