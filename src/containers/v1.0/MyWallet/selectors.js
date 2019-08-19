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

const selectReceiveToKenPopup = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().receiveTokenPopup,
);
const selectSendTokenForm = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().sendForm,
);
const selectSendTokenPopup = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().sendTokenPopup,
);
const selectSuccessPopup = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().successPopup,
);
const selectTableType = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().tableType,
);
const selectTokenOptions = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().tokenOptions,
);
const selectTransactionData = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().transactionTable,
);
// =====================

export {
  selectReceiveToKenPopup,
  selectSendTokenForm,
  selectSendTokenPopup,
  selectSuccessPopup,
  selectTableType,
  selectTokenOptions,
  selectTransactionData,
};
