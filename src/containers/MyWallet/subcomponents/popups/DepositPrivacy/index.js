/**
 *
 * TomoWallet - My Wallet Page - Deposit Privacy Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
// Custom Components
import FormContent from './form';
import ConfirmationContent from './confirmation';
import { DepositprivacyPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
import { DEPOSIT_STAGES } from '../../../constants';
import { selectWallet, selectPrivacyMode } from '../../../../Global/selectors';
import { withGlobal } from '../../../../../utils';
import { selectPrivacyData } from '../../../selectors';
// ===================

// ===== MAIN COMPONENT =====
class DepositPrivacyPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRequested: false,
    };

    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleGetButtonConfig = this.handleGetButtonConfig.bind(this);
    this.handleGetContentConfig = this.handleGetContentConfig.bind(this);
    this.handleSendRequest = this.handleSendRequest.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      (!_isEqual(
        _get(prevProps, 'popupData.stage'),
        _get(this.props, 'popupData.stage'),
      ) &&
        _isEqual(
          _get(this.props, 'popupData.stage'),
          DEPOSIT_STAGES.FORM,
        )) ||
      (_get(prevProps, 'loading') && !_get(this.props, 'loading'))
    ) {
      this.handleSendRequest(false);
    }
  }

  handleClosePopup() {
    const { closePopup } = this.props;
    closePopup(false);
  }

  handleGetButtonConfig() {
    const {
      confirmBeforeDeposit,
      intl: { formatMessage },
      popupData,
      submitDeposit,
      updateDepositPrivacyPopupStage,
      privacyMode,
    } = this.props;
    const { isRequested } = this.state;

    return (
      (_get(popupData, 'stage') === DEPOSIT_STAGES.FORM && {
        primary: {
          action: confirmBeforeDeposit,
          btnYellow: true,
          label: formatMessage(MSG.COMMON_BUTTON_DEPOSIT),
        },
        secondary: {
          action: this.handleClosePopup,
          label: formatMessage(MSG.COMMON_BUTTON_BACK),
        },
      }) ||
      (_get(popupData, 'stage') === DEPOSIT_STAGES.CONFIRMATION && {
        primary: {
          action: () => {
            this.handleSendRequest(true);
            submitDeposit(privacyMode);
          },
          btnYellow: true,
          label: formatMessage(MSG.COMMON_BUTTON_CONFIRM),
          disabled: isRequested,
        },
        secondary: {
          action: () => updateDepositPrivacyPopupStage(DEPOSIT_STAGES.FORM),
          label: formatMessage(MSG.COMMON_BUTTON_BACK),
        },
      }) ||
      {}
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
      privacyMode,
      privacyData,
    } = this.props;
    return (
      (_get(popupData, 'stage') === DEPOSIT_STAGES.FORM && {
        Content: FormContent,
        getContentProps: {
          addFullAmount,
          errors: _get(popupData, 'errors', {}),
          formatMessage,
          formValues,
          tokenOptions,
          updateInput,
          privacyMode,
          wallet,
        },
      }) ||
      (_get(popupData, 'stage') === DEPOSIT_STAGES.CONFIRMATION && {
        Content: ConfirmationContent,
        getContentProps: {
          errors: _get(popupData, 'errors', {}),
          formValues,
          wallet,
          privacyData,
        },
      })
    );
  }

  handleSendRequest(bool) {
    this.setState({
      isRequested: bool,
    });
  }

  render() {
    const {
      intl: { formatMessage },
      popupData,
    } = this.props;

    return (
      <DepositprivacyPopupStyler
        button={this.handleGetButtonConfig()}
        {...this.handleGetContentConfig()}
        isOpen={_get(popupData, 'isOpen', false)}
        title={formatMessage(MSG.MY_WALLET_POPUP_DEPOSIT_PRIVACY_TITLE)}
        toggle={this.handleClosePopup}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
DepositPrivacyPopup.propTypes = {
  /** Action to add full amount of token into form */
  addFullAmount: PropTypes.func,
  /** Action to hide popup */
  closePopup: PropTypes.func,
  /** Action to validate form before send */
  confirmBeforeDeposit: PropTypes.func,
  /** Send token form's values object */
  formValues: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Condition flag to show/hide loading screen */
  loading: PropTypes.bool,
  /** Popup's object data */
  popupData: PropTypes.object,
  /** Action to submit deposit privacy form */
  submitDeposit: PropTypes.func,
  /** List of token's data */
  tokenOptions: PropTypes.arrayOf(PropTypes.object),
  /** Action to handle input change in send token form */
  updateInput: PropTypes.func,
  /** Action to update send token popup's stage of content */
  updateDepositPrivacyPopupStage: PropTypes.func,
  /** Wallet's information */
  wallet: PropTypes.object,
};

DepositPrivacyPopup.defaultProps = {
  addFullAmount: () => {},
  closePopup: () => {},
  confirmBeforeDeposit: () => {},
  formValues: {},
  intl: {},
  loading: false,
  popupData: {},
  submitDeposit: () => {},
  tokenOptions: [],
  updateInput: () => {},
  updateDepositPrivacyPopupStage: () => {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    wallet: selectWallet,
    privacyMode: selectPrivacyMode,
    privacyData: selectPrivacyData,
  });
const withConnect = connect(mapStateToProps);
// ======================

export default compose(
  withConnect,
  withGlobal,
  withIntl,
)(DepositPrivacyPopup);
