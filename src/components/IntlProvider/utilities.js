/**
 *
 * TomoWallet - Custom React Intl Provider - Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import _get from 'lodash.get';
// Utilities & Constants
import { getLocale } from '../../utils';
import { ENUM, LIST } from '../../constants';
// ===================

// ===== UTILITIES =====
export const getMessage = (intlProps, valueProps) => (
  <FormattedMessage {...intlProps} values={valueProps} />
);

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
// =====================
