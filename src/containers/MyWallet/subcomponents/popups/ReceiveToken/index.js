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
import ReceiveContent from './content';
import { ReceiveTokenPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class ReceiveTokenPopup extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      isOpen,
      togglePopup,
    } = this.props;
    return (
      <ReceiveTokenPopupStyler
        Content={ReceiveContent}
        isOpen={isOpen}
        title={formatMessage(MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_TITLE)}
        button={{
          secondary: {
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
            action: () => togglePopup(false),
          },
          primary: {
            label: formatMessage(MSG.COMMON_BUTTON_RECEIVE),
            btnBlue: true,
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ReceiveTokenPopup.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Condition flag to show/hide popup */
  isOpen: PropTypes.bool,
  /** Action to show/hide popup */
  togglePopup: PropTypes.func,
};

ReceiveTokenPopup.defaultProps = {
  intl: {},
  isOpen: false,
  togglePopup: () => {},
};
// ======================

export default withIntl(ReceiveTokenPopup);
