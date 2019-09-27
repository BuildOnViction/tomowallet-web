/**
 *
 * TomoWallet - Network Update Confirmation Popup
 *
 * This popup askes for confirmation from user in order to change current RPC server
 * and clear login data
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
// Custom Components
import { NetworkConfirmationPopupStyler } from './style';
import Content from './content';
// Utilities & Constants
import { withIntl } from '../../../IntlProvider';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class NetworkConfirmationPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleClosePopup() {
    const { togglePopup } = this.props;
    togglePopup(false);
  }

  handleConfirm() {
    const { changeNetwork, popupData, togglePopup } = this.props;
    changeNetwork(_get(popupData, 'selected', {}));
    togglePopup(false);
  }

  render() {
    const {
      intl: { formatMessage },
      popupData,
    } = this.props;
    return (
      <NetworkConfirmationPopupStyler
        button={{
          primary: {
            action: this.handleConfirm,
            btnYellow: true,
            label: formatMessage(MSG.COMMON_BUTTON_NEXT),
          },
          secondary: {
            action: this.handleClosePopup,
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
          },
        }}
        Content={Content}
        getContentProps={{
          formatMessage,
        }}
        isOpen={_get(popupData, 'isOpen', false)}
        title={formatMessage(
          MSG.HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_TITLE,
        )}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
NetworkConfirmationPopup.propTypes = {
  /** Action to execute network update */
  changeNetwork: PropTypes.func,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Popup's data */
  popupData: PropTypes.object,
  /** Action to show/hide popup */
  togglePopup: PropTypes.func,
};

NetworkConfirmationPopup.defaultProps = {
  changeNetwork: () => {},
  intl: {},
  popupData: {},
  togglePopup: () => {},
};
// ======================

export default withIntl(NetworkConfirmationPopup);
