/**
 *
 * TomoWallet - My Wallet Page - Selectors
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import _get from 'lodash.get';
// Utilities & Constants
import { createDeepEqualSelector } from '../../utils';
import { DOMAIN_KEY } from './constants';
// ===================

// ===== SELECTORS =====
const selectMyWalletDomain = state => _get(state, [DOMAIN_KEY], fromJS({}));

const selectCoinData = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().coinData,
);
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
const selectPrivacyData = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().privacyData,
);
const selectDepositPrivacyPopup = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().depositPrivacyPopup,
);
const selectDepositPrivacyForm = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().depositForm,
);
const selectSuccessDepositPopup = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().successDepositPopup,
);
const selectWithdrawPrivacyPopup = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().withdrawPrivacyPopup,
);
const selectWithdrawPrivacyForm = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().withdrawForm,
);
const selectSuccessWithdrawPopup = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().successWithdrawPopup,
);
const selectPrivacyTransactionData = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().privacyTransactionTable,
);

const selectProcessing = createDeepEqualSelector(
  selectMyWalletDomain,
  obj => obj.toJS().prepareTxProof,
);
// =====================

export {
  selectCoinData,
  selectReceiveToKenPopup,
  selectSendTokenForm,
  selectSendTokenPopup,
  selectSuccessPopup,
  selectTableType,
  selectTokenOptions,
  selectTransactionData,
  selectPrivacyData,
  selectDepositPrivacyPopup,
  selectDepositPrivacyForm,
  selectSuccessDepositPopup,
  selectWithdrawPrivacyPopup,
  selectWithdrawPrivacyForm,
  selectSuccessWithdrawPopup,
  selectPrivacyTransactionData,
  selectProcessing,
};
