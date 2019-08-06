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
const selectIsConfirmed = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().isConfirmed,
);
const selectCompare = createDeepEqualSelector(
  selectWalletCreationDomain,
  obj => obj.toJS().compare,
);
// =====================

export { selectCompare, selectFormState, selectIsConfirmed, selectMnemonic };
