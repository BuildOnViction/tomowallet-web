/**
 *
 * Import Wallet Page - Selectors
 *
 */
// Modules
import { fromJS } from 'immutable';
import _get from 'lodash.get';
// Utilities & Constants
import { createDeepEqualSelector } from '../../utils';
import { DOMAIN_KEY } from './constants';

// ===== SELECTORS =====
const selectImportWalletDomain = state => _get(state, [DOMAIN_KEY], fromJS({}));

const selectAddressPopup = createDeepEqualSelector(
  selectImportWalletDomain,
  obj => obj.toJS().addressPopup,
);
const selectImportState = createDeepEqualSelector(
  selectImportWalletDomain,
  obj => obj.toJS().importWallet,
);
const selectPasswordPopup = createDeepEqualSelector(
  selectImportWalletDomain,
  obj => obj.toJS().passwordPopup,
);
// =====================

export { selectAddressPopup, selectImportState, selectPasswordPopup };
