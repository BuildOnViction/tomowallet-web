/**
 *
 * TomoWallet - Import Wallet Page - Ledger Address Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
// Custom Components
import AddressContent from './content';
import { AddressPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class AddressPopup extends PureComponent {
  render() {
    const {
      accessByLedger,
      data,
      intl: { formatMessage },
      togglePopup,
      updateChosenAddress,
    } = this.props;
    return (
      <AddressPopupStyler
        Content={AddressContent}
        button={{
          secondary: {
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
            action: () => togglePopup(false),
          },
          primary: {
            btnYellow: true,
            label: formatMessage(MSG.COMMON_BUTTON_UNLOCK),
            action: accessByLedger,
          },
        }}
        getContentProps={{
          data,
          updateChosenAddress,
        }}
        getPopupProps={{
          size: 'lg',
        }}
        isOpen={_get(data, 'isOpen', false)}
        title={formatMessage(MSG.IMPORT_WALLET_POPUP_ADDRESS_TITLE)}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
AddressPopup.propTypes = {
  /** Action to login wallet by ledger */
  accessByLedger: PropTypes.func,
  /** Popup's data */
  data: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to show/hide popup */
  togglePopup: PropTypes.func,
  /** Action to update chosen wallet address */
  updateChosenAddress: PropTypes.func,
};

AddressPopup.defaultProps = {
  accessByLedger: () => {},
  data: {},
  intl: {},
  togglePopup: () => {},
  updateChosenAddress: () => {},
};
// ======================

export default withIntl(AddressPopup);
