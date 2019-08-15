/**
 *
 * TomoWallet - My Wallet Page - Send Token Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get as _get } from 'lodash';
// Custom Components
import FormContent from './form';
import ConfirmationContent from './confirmation';
// -- TO-DO: Update style for Send Token popup
import { SendTokenPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../../../components/IntlProvider';
import { MSG } from '../../../../../../constants';
import { SEND_TOKEN_STAGES } from '../../../constants';
import { selectWallet } from '../../../../../Global/selectors';
// ===================

// ===== MAIN COMPONENT =====
class SendTokenPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleGetButtonConfig = this.handleGetButtonConfig.bind(this);
    this.handleGetContentConfig = this.handleGetContentConfig.bind(this);
  }

  handleClosePopup() {
    const { closePopup } = this.props;
    closePopup(false);
  }

  handleGetButtonConfig() {
    const {
      confirmBeforeSend,
      intl: { formatMessage },
      popupData,
      submitSendToken,
      updateSendTokenPopupStage,
    } = this.props;
    return (
      (_get(popupData, 'stage') === SEND_TOKEN_STAGES.FORM && {
        primary: {
          label: formatMessage(MSG.COMMON_BUTTON_SEND),
          action: confirmBeforeSend,
        },
        secondary: {
          label: formatMessage(MSG.COMMON_BUTTON_BACK),
          action: this.handleClosePopup,
        },
      }) ||
      (_get(popupData, 'stage') === SEND_TOKEN_STAGES.CONFIRMATION && {
        primary: {
          label: formatMessage(MSG.COMMON_BUTTON_CONFIRM),
          action: submitSendToken,
        },
        secondary: {
          label: formatMessage(MSG.COMMON_BUTTON_BACK),
          action: () => updateSendTokenPopupStage(SEND_TOKEN_STAGES.FORM),
        },
      })
    );
  }

  handleGetContentConfig() {
    const {
      addFullAmount,
      formValues,
      intl: { formatMessage },
      popupData,
      tokenOptions,
      updateInput,
      wallet,
    } = this.props;
    return (
      (_get(popupData, 'stage') === SEND_TOKEN_STAGES.FORM && {
        Content: FormContent,
        getContentProps: {
          addFullAmount,
          errors: _get(popupData, 'errors', {}),
          formatMessage,
          formValues,
          tokenOptions,
          updateInput,
        },
      }) ||
      (_get(popupData, 'stage') === SEND_TOKEN_STAGES.CONFIRMATION && {
        Content: ConfirmationContent,
        getContentProps: { formValues, wallet },
      })
    );
  }

  render() {
    const {
      intl: { formatMessage },
      popupData,
    } = this.props;

    return (
      <SendTokenPopupStyler
        button={this.handleGetButtonConfig()}
        {...this.handleGetContentConfig()}
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
  /** Action to validate form before send */
  confirmBeforeSend: PropTypes.func,
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
  /** Action to update send token popup's stage of content */
  updateSendTokenPopupStage: PropTypes.func,
  /** Wallet's information */
  wallet: PropTypes.object,
};

SendTokenPopup.defaultProps = {
  addFullAmount: () => {},
  closePopup: () => {},
  confirmBeforeSend: () => {},
  formValues: {},
  intl: {},
  popupData: {},
  submitSendToken: () => {},
  tokenOptions: [],
  updateInput: () => {},
  updateSendTokenPopupStage: () => {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    wallet: selectWallet,
  });
const withConnect = connect(mapStateToProps);
// ======================

export default compose(
  withIntl,
  withConnect,
)(SendTokenPopup);
