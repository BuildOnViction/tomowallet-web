/**
 *
 * Import Wallet Page - Selectors
 *
 */
// Modules
import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
// Utilities & Constants
import { createDeepEqualSelector } from '../../../utils';
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
// =====================

export { selectAddressPopup, selectImportState };
