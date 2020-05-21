/**
 *
 * TomoWallet - Enums
 *
 * This file stores all kinds of enum data that'll be used in web app
 */
// ===== IMPORTS =====
// Utilities
import message_en from "../translations/en.json";
import message_fr from "../translations/fr.json";
// ===================

// ===== ENUMS =====
const WEB3_STATUSES = {
  LOADING: "loading",
  INITIALIZED: "initialized",
  FAILED: "failed",
};

const MESSAGE_SET = {
  en: message_en,
  fr: message_fr,
};

const TOKEN_TYPE = {
  TRC20: "TRC20",
  TRC21: "TRC21",
  CURRENCY: "CURRENCY",
};

const LOGIN_TYPE = {
  LEDGER: "ledger",
  META_MASK: "metaMask",
  PRIVATE_KEY: "privateKey",
};

const NETWORK_TYPE = {
  TOMOCHAIN_TESTNET: "TOMOCHAIN_TESTNET",
  TOMOCHAIN_MAINNET: "TOMOCHAIN_MAINNET",
};

const WRAPPABLE_TOKEN = {
  BTC: "0xAE44807D8A9CE4B30146437474Ed6fAAAFa1B809",
  ETH: "0x2EAA73Bd0db20c64f53fEbeA7b5F5E5Bccc7fb8b",
  USDT: "0x381B31409e4D220919B2cFF012ED94d70135A59e",
};

const TRADEABLE_TOKEN = {
  BTC: "0xAE44807D8A9CE4B30146437474Ed6fAAAFa1B809",
  ETH: "0x2EAA73Bd0db20c64f53fEbeA7b5F5E5Bccc7fb8b",
  USDT: "0x381B31409e4D220919B2cFF012ED94d70135A59e",
};
// =================

export default {
  MESSAGE_SET,
  TOKEN_TYPE,
  WEB3_STATUSES,
  LOGIN_TYPE,
  NETWORK_TYPE,
  WRAPPABLE_TOKEN,
  TRADEABLE_TOKEN,
};
