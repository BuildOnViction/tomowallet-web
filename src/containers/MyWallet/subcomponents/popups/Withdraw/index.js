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
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
// Custom Components
import FormContent from './form';
import ConfirmationContent from './confirmation';
import ProcessContent from './processing';
import { WithdrawPrivacyPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
import { WITHDRAW_STAGES } from '../../../constants';
import { selectWallet, selectPrivacyMode } from '../../../../Global/selectors';
import { withGlobal } from '../../../../../utils';
import { selectPrivacyData } from '../../../selectors';
// ===================

// ===== MAIN COMPONENT =====
class WithdrawPopup extends PureComponent {
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
          WITHDRAW_STAGES.FORM,
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
      confirmBeforeSend,
      intl: { formatMessage },
      popupData,
      submitWithdraw,
      updateWithdrawPrivacyPopupStage,
      privacyMode,
    } = this.props;
    const { isRequested } = this.state;

    return (
      (_get(popupData, 'stage') === WITHDRAW_STAGES.FORM && {
        primary: {
          action: confirmBeforeSend,
          btnYellow: true,
          label: formatMessage(MSG.COMMON_BUTTON_WITHDRAW),
        },
        secondary: {
          action: this.handleClosePopup,
          label: formatMessage(MSG.COMMON_BUTTON_BACK),
        },
      }) ||
      (_get(popupData, 'stage') === WITHDRAW_STAGES.CONFIRMATION && {
        primary: {
          action: () => {
            this.handleSendRequest(true);
            submitWithdraw(privacyMode);
          },
          btnYellow: true,
          label: formatMessage(MSG.COMMON_BUTTON_CONFIRM),
          disabled: isRequested,
        },
        secondary: {
          action: () => updateWithdrawPrivacyPopupStage(WITHDRAW_STAGES.FORM),
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
      updateProcess,
      process
    } = this.props;
    return (
      (_get(popupData, 'stage') === WITHDRAW_STAGES.FORM && {
        Content: FormContent,
        getContentProps: {
          addFullAmount,
          errors: _get(popupData, 'errors', {}),
          formatMessage,
          formValues,
          tokenOptions,
          updateInput,
          privacyMode,
          privacyData
        },
      }) ||
      (_get(popupData, 'stage') === WITHDRAW_STAGES.PROCESSING && {
        Content: ProcessContent,
        getContentProps: {
          errors: _get(popupData, 'errors', {}),
          formValues,
          wallet,
          privacyData,
          process,
          updateProcess,
        },
      }) ||
      (_get(popupData, 'stage') === WITHDRAW_STAGES.CONFIRMATION && {
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
      process
    } = this.props;

    return (
      <WithdrawPrivacyPopupStyler
        button={this.handleGetButtonConfig()}
        {...this.handleGetContentConfig()}
        isOpen={_get(popupData, 'isOpen', false)}
        title={process.status ? '' : formatMessage(MSG.MY_WALLET_POPUP_WITHDRAW_PRIVACY_TITLE)}
        toggle={this.handleClosePopup}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WithdrawPopup.propTypes = {
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
  /** Condition flag to show/hide loading screen */
  loading: PropTypes.bool,
  /** Popup's object data */
  popupData: PropTypes.object,
  /** Action to submit send token's form */
  submitWithdraw: PropTypes.func,
  /** List of token's data */
  tokenOptions: PropTypes.arrayOf(PropTypes.object),
  /** Action to handle input change in send token form */
  updateInput: PropTypes.func,
  /** Action to update send token popup's stage of content */
  updateWithdrawPrivacyPopupStage: PropTypes.func,
  /** Wallet's information */
  wallet: PropTypes.object,
  /** Action to update processing step in send token form */
  updateProcess: PropTypes.func,
};

WithdrawPopup.defaultProps = {
  addFullAmount: () => {},
  closePopup: () => {},
  confirmBeforeSend: () => {},
  formValues: {},
  intl: {},
  loading: false,
  popupData: {},
  submitWithdraw: () => {},
  tokenOptions: [],
  updateInput: () => {},
  updateWithdrawPrivacyPopupStage: () => {},
  wallet: {},
  updateProcess: () => {},
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
)(WithdrawPopup);
