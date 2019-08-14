/**
 *
 * TomoWallet - My Wallet Page - Send Token Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
// Custom Components
import FormContent from './form';
// -- TO-DO: Update style for Send Token popup
import { SendTokenPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../../../components/IntlProvider';
import { MSG } from '../../../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class SendTokenPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePopup = this.handleClosePopup.bind(this);
  }

  handleClosePopup() {
    const { closePopup } = this.props;
    closePopup(false);
  }

  render() {
    const {
      addFullAmount,
      formValues,
      intl: { formatMessage },
      popupData,
      submitSendToken,
      tokenOptions,
      updateInput,
    } = this.props;
    return (
      <SendTokenPopupStyler
        button={{
          primary: {
            label: formatMessage(MSG.COMMON_BUTTON_SEND),
            action: submitSendToken,
          },
          secondary: {
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
            action: this.handleClosePopup,
          },
        }}
        Content={FormContent}
        getContentProps={{
          addFullAmount,
          errors: _get(popupData, 'errors', {}),
          formatMessage,
          formValues,
          tokenOptions,
          updateInput,
        }}
        isOpen={_get(popupData, 'isOpen', false)}
        title={formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_TITLE)}
        toggle={this.handleClosePopup}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
SendTokenPopup.propTypes = {
  /** Action to add full amount of token into form */
  addFullAmount: PropTypes.func,
  /** Action to hide popup */
  closePopup: PropTypes.func,
  /** Send token form's values object */
  formValues: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Popup's object data */
  popupData: PropTypes.object,
  /** Action to submit send token's form */
  submitSendToken: PropTypes.func,
  /** List of token's data */
  tokenOptions: PropTypes.arrayOf(PropTypes.object),
  /** Action to handle input change in send token form */
  updateInput: PropTypes.func,
};

SendTokenPopup.defaultProps = {
  addFullAmount: () => {},
  closePopup: () => {},
  formValues: {},
  intl: {},
  popupData: {},
  submitSendToken: () => {},
  tokenOptions: [],
  updateInput: () => {},
};
// ======================

export default withIntl(SendTokenPopup);
