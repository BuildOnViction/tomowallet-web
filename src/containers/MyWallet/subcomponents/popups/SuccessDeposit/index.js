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
import { SuccessDepositPopupStyler } from './style';
// ===================

// ===== MAIN COMPONENT =====
class SuccessDepositPopup extends PureComponent {
  render() {
    const { amount, togglePopup, successDepositPopup, symbol } = this.props;
    return (
      <SuccessDepositPopupStyler
        backdrop
        isOpen={_get(successDepositPopup, 'isOpen', false)}
        toggle={() => togglePopup(false)}
        Content={SuccessContent}
        getContentProps={{
          amount,
          symbol,
          txHash: _get(successDepositPopup, 'txHash', ''),
        }}
        button={{}}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
SuccessDepositPopup.propTypes = {
  /** Amount of sent token */
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Action to show/hide popup */
  togglePopup: PropTypes.func,
  /** Success popup's data */
  successDepositPopup: PropTypes.object,
  /** Token symbol */
  symbol: PropTypes.string,
};

SuccessDepositPopup.defaultProps = {
  amount: 0,
  togglePopup: () => {},
  successPopup: {},
  symbol: '',
};
// ======================

export default SuccessDepositPopup;
