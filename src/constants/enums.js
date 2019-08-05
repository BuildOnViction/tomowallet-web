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
// =================

export default {
  WEB3_STATUSES,
  MESSAGE_SET,
};
