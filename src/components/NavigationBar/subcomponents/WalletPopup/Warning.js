/**
 *
 * TomoWallet - Show Wallet Popup - Warning Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Constants
import { MSG } from '../../../../constants';
import VisualShowWallet from '../../../../assets/images/visual-showwallet.svg';
// ===================

// ===== MAIN COMPONENT =====
class WarningContent extends PureComponent {
  render() {
    const { formatMessage } = this.props;
    return (
      <div className='text-center content-warning'>
        <div className='conntent-warning__image'>
          <img
            src={VisualShowWallet}
            alt={formatMessage(
              MSG.HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_IMAGE_ALT,
            )}
          />
        </div>
        <div>
          {formatMessage(MSG.HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_TEXT)}
        </div>
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WarningContent.propTypes = {
  /** React Intl's API to get message */
  formatMessage: PropTypes.func,
};

WarningContent.defaultProps = {
  formatMessage: () => {},
};
// ======================

export default WarningContent;
