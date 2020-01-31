/**
 *
 * TomoWallet - My Wallet Page - Success Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
// Custom Component
import SuccessContent from './content';
// Styles
import { SuccessPopupStyler } from './style';
// ===================

// ===== MAIN COMPONENT =====
class SuccessPopup extends PureComponent {
  render() {
    const { amount, togglePopup, successPopup, symbol, privacyMode } = this.props;
    return (
      <SuccessPopupStyler
        backdrop
        isOpen={_get(successPopup, 'isOpen', false)}
        toggle={() => togglePopup(false)}
        Content={SuccessContent}
        getContentProps={{
          amount,
          symbol,
          txHash: _get(successPopup, 'txHash', ''),
          privacyMode
        }}
        button={{}}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
SuccessPopup.propTypes = {
  /** Amount of sent token */
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Action to show/hide popup */
  togglePopup: PropTypes.func,
  /** Success popup's data */
  successPopup: PropTypes.object,
  /** Token symbol */
  symbol: PropTypes.string,
  /** Privacy mode */
  privacyMode: PropTypes.bool,
};

SuccessPopup.defaultProps = {
  amount: 0,
  togglePopup: () => {},
  successPopup: {},
  symbol: '',
  privacyMode: false
};
// ======================

export default SuccessPopup;
