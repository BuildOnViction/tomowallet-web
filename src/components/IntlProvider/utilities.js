/**
 *
 * TomoWallet - Custom React Intl Provider - Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import { injectIntl } from 'react-intl';
// ===================

// ===== UTILITIES =====
const IntlTextComponent = ({
  intl: { formatMessage },
  intlProps,
  valueProps,
}) => formatMessage(intlProps, valueProps);
const IntlText = injectIntl(IntlTextComponent);

export const getMessage = (intlProps, valueProps) => (
  <IntlText intlProps={intlProps} valueProps={valueProps} />
);
// =====================
