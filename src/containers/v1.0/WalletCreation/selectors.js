/**
 *
 * TomoWallet - Wallet Creation Page - Selectors
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
// Utilities
import { createDeepEqualSelector } from '../../../utils';
import { DOMAIN_KEY } from './constants';
// ===================

// ===== SELECTORS =====
const selectWalletCreationDomain = state =>
  _get(state, [DOMAIN_KEY], fromJS({}));

const selectFormState = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().formState,
);
const selectMnemonic = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().mnemonic,
);
const selectConfirmationState = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().confirmation,
);
const selectKeyViewState = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().keyView,
);
// =====================

export {
  selectConfirmationState,
  selectFormState,
  selectKeyViewState,
  selectMnemonic,
};
