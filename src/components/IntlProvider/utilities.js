/**
 *
 * TomoWallet - Custom React Intl Provider - Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import { FormattedMessage } from 'react-intl';
// ===================

// ===== UTILITIES =====
export const getMessage = (intlProps, valueProps) => (
  <FormattedMessage {...intlProps} values={valueProps} />
);
// =====================
