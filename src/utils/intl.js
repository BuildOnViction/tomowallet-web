/**
 *
 * TomoWallet - Utility - React Intl APIs
 *
 */
// ===== IMPORTS =====
// Modules
import { IntlProvider } from 'react-intl';
import _get from 'lodash.get';
// Utilities & Constants
import { ENUM, LIST } from '../constants';
import { getLocale } from '.';
// ===================

// ===== METHODS =====
export const getGlobalIntl = () => {
  const locale = getLocale() || _get(LIST, ['LANGUAGES', 0, 'value'], 'en');
  const intlProvider = new IntlProvider({
    locale,
    messages: ENUM.MESSAGE_SET[locale],
  });
  const {
    intl: { formatMessage },
  } = intlProvider.getChildContext();

  return {
    formatMessage,
  };
};
// ===================
