/**
 *
 * TomoWallet - My Wallet Page - Receive Token Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Custom Components
import { ReceiveTokenPopupStyler } from './style';
// ===================

// ===== MAIN COMPONENT =====
class ReceiveTokenPopup extends PureComponent {
  render() {
    const { isOpen } = this.props;
    return <ReceiveTokenPopupStyler isOpen={isOpen} />;
  }
}
// ==========================

// ===== PROP TYPES =====
ReceiveTokenPopup.propTypes = {
  /** Condition flag to show/hide popup */
  isOpen: PropTypes.bool,
};

ReceiveTokenPopup.defaultProps = {
  isOpen: false,
};
// ======================

export default ReceiveTokenPopup;
