/**
 *
 * Import Wallet Page - Selectors
 *
 */
// Modules
import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
// Utilities & Constants
import { createDeepEqualSelector } from '../../utils';
import { DOMAIN_KEY } from './constants';

const selectImportWalletDomain = state => _get(state, [DOMAIN_KEY], fromJS({}));

const selectImportState = createDeepEqualSelector(
  selectImportWalletDomain,
  obj => obj.toJS().importWallet,
);

export { selectImportState };
