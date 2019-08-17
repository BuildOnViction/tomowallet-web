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
import RPC_SERVER from './rpcServers';
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
    label: getMessage(MSG.COMMON_LIST_NETWORK_TOMOCHAIN_TESTNET),
    value: Object.keys(RPC_SERVER)[0],
  },
  {
    label: getMessage(MSG.COMMON_LIST_NETWORK_TOMOCHAIN_MAINNET),
    value: Object.keys(RPC_SERVER)[1],
  },
];

// My Wallet - Table Types
const TABLE_TYPES = [
  {
    label: 'PORFOLIO',
    value: '1',
  },
  {
    label: 'TRANSACTIONS',
    value: '2',
  },
];
// =================

export default {
  LANGUAGES,
  NETWORKS,
  TABLE_TYPES,
};
