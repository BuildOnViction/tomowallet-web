/**
 *
 * TomoWallet - Lists
 *
 * This file stores all kinds of data list that'll be used in web app
 */
// ===== IMPORTS =====
// Utilities & Constants
import { getMessage } from '../components/IntlProvider';
import MSG from './messages';
import ENUM from './enums';
// ===================

// ===== LISTS =====
// Webpage Languages
const LANGUAGES = [
  {
    label: getMessage(MSG.COMMON_LIST_LANGUAGE_ENGLISH),
    value: 'en',
  },
  {
    label: getMessage(MSG.COMMON_LIST_LANGUAGE_FRENCH),
    value: 'fr',
  },
];

// Webpage Networks
const NETWORKS = [
  {
    label: getMessage(MSG.COMMON_LIST_NETWORK_TOMOCHAIN_MAINNET),
    value: ENUM.NETWORK_TYPE.TOMOCHAIN_MAINNET,
  },
  {
    label: getMessage(MSG.COMMON_LIST_NETWORK_TOMOCHAIN_TESTNET),
    value: ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET,
  },
];

// My Wallet - Table Types
const MY_WALLET_TABLE_TYPES = [
  {
    label: getMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_TITLE),
    value: '1',
  },
  {
    label: getMessage(MSG.MY_WALLET_TABLE_TRANSACTION_TITLE),
    value: '2',
  },
];
// =================

export default {
  LANGUAGES,
  NETWORKS,
  MY_WALLET_TABLE_TYPES,
};
