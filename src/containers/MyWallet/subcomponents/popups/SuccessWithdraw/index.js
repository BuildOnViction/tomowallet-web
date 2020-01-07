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
import FormContent from './content';
// Styles
import { SuccessWithdrawPopupStyler } from './style';
// ===================

// ===== MAIN COMPONENT =====
class SuccessWithdrawPopup extends PureComponent {
  render() {
    const { amount, togglePopup, successWithdrawPopup, symbol } = this.props;
    return (
      <SuccessWithdrawPopupStyler
        backdrop
        isOpen={_get(successWithdrawPopup, 'isOpen', false)}
        toggle={() => togglePopup(false)}
        Content={FormContent}
        getContentProps={{
          amount,
          symbol,
          txHash: _get(successWithdrawPopup, 'txHash', ''),
        }}
        button={{}}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
SuccessWithdrawPopup.propTypes = {
  /** Amount of sent token */
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Action to show/hide popup */
  togglePopup: PropTypes.func,
  /** Success popup's data */
  successWithdrawPopup: PropTypes.object,
  /** Token symbol */
  symbol: PropTypes.string,
};

SuccessWithdrawPopup.defaultProps = {
  amount: 0,
  togglePopup: () => {},
  successPopup: {},
  symbol: '',
};
// ======================

export default SuccessWithdrawPopup;
