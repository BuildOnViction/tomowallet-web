/**
 *
 * TomoWallet - My Wallet Page - Selectors
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
// Utilities & Constants
import { createDeepEqualSelector } from '../../../utils';
import { DOMAIN_KEY } from './constants';
// ===================

// ===== SELECTORS =====
const selectMyWalletDomain = state => _get(state, [DOMAIN_KEY], fromJS({}));

const selectTableType = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().tableType,
);
// =====================

export { selectTableType };
