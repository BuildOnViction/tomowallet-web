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
// ===================

// ===== LISTS =====
// Webpage Language
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
  TABLE_TYPES,
};
