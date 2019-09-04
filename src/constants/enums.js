/**
 *
 * TomoWallet - Enums
 *
 * This file stores all kinds of enum data that'll be used in web app
 */
// ===== IMPORTS =====
// Utilities
import message_en from '../translations/en.json';
import message_fr from '../translations/fr.json';
// ===================

// ===== ENUMS =====
const WEB3_STATUSES = {
  LOADING: 'loading',
  INITIALIZED: 'initialized',
  FAILED: 'failed',
};

const MESSAGE_SET = {
  en: message_en,
  fr: message_fr,
};

const TOKEN_TYPE = {
  TRC20: 'TRC20',
  TRC21: 'TRC21',
  CURRENCY: 'CURRENCY',
};

const LOGIN_TYPE = {
  LEDGER: 'ledger',
  META_MASK: 'metaMask',
  PRIVATE_KEY: 'privateKey',
};

const NETWORK_TYPE = {
  TOMOCHAIN_TESTNET: 'TOMOCHAIN_TESTNET',
  TOMOCHAIN_MAINNET: 'TOMOCHAIN_MAINNET',
};
// =================

export default {
  MESSAGE_SET,
  TOKEN_TYPE,
  WEB3_STATUSES,
  LOGIN_TYPE,
  NETWORK_TYPE,
};
