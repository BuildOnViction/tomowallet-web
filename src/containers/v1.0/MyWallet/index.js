/**
 *
 * TomoWallet - My Wallet Page
 *
 * This component defines a wallet-provided home page, with all basic information &
 * options to send/receive tokens...
 */
// ==== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
// Custom Components
import AddressInfo from './subcomponents/AddressInfo';
import DataTables from './subcomponents/DataTables';
import SendTokenPopup from './subcomponents/popups/SendToken';
// Utilities
import {
  setTableType,
  toggleSendTokenPopup,
  loadTokenOptions,
  loadTokenOptionsSuccess,
  updateSendTokenInput,
  updateSendTokenErrors,
  addNativeCurrency,
} from './actions';
import {
  selectTableType,
  selectReceiveToKenPopup,
  selectSendTokenPopup,
  selectSendTokenForm,
  selectSuccessPopup,
  selectTokenOptions,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { DOMAIN_KEY, SEND_TOKEN_FIELDS, PORFOLIO_COLUMNS } from './constants';
import {
  injectReducer,
  getValidations,
  mergeErrors,
  injectSaga,
} from '../../../utils';
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { selectWallet } from '../../Global/selectors';
import { MSG } from '../../../constants';
// -- TO-DO: Add style for My Wallet page component
// ==================

// ===== MAIN COMPONENT =====
class MyWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAddFullAmount = this.handleAddFullAmount.bind(this);
    this.handleCloseSendTokenPopup = this.handleCloseSendTokenPopup.bind(this);
    this.handleOpenSendTokenPopup = this.handleOpenSendTokenPopup.bind(this);
    this.handleSubmitSendToken = this.handleSubmitSendToken.bind(this);
    this.handleValidationSendForm = this.handleValidationSendForm.bind(this);
  }

  handleAddFullAmount() {
    const { onUpdateSendTokenInput, sendTokenForm } = this.props;
    console.warn('Add full amount', sendTokenForm);

    onUpdateSendTokenInput(
      SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
      _get(sendTokenForm, [SEND_TOKEN_FIELDS.TOKEN, 'balance'], ''),
    );
  }

  handleCloseSendTokenPopup() {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(false);
  }

  handleOpenSendTokenPopup(initialValues) {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(true, initialValues);
  }

  handleSubmitSendToken() {
    const { onUpdateSendTokenErrors } = this.props;
    const errorList = this.handleValidationSendForm();
    if (!_isEmpty(errorList)) {
      onUpdateSendTokenErrors(errorList);
    } else {
      console.warn('Begin submitting...');
    }
  }

  handleValidationSendForm() {
    const {
      intl: { formatMessage },
      sendTokenForm,
      web3,
    } = this.props;
    const {
      isRequired,
      isAddress,
      isMaxNumber,
      isMinNumber,
      isMaxLength,
    } = getValidations(web3);

    const errorList = mergeErrors([
      isRequired(
        {
          name: SEND_TOKEN_FIELDS.TOKEN,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TOKEN, 'value']),
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_TOKEN_REQUIRED),
      ),
      isRequired(
        {
          name: SEND_TOKEN_FIELDS.RECIPIENT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT]),
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_REQUIRED),
      ),
      isAddress(
        {
          name: SEND_TOKEN_FIELDS.RECIPIENT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT]),
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_INVALID),
      ),
      isRequired(
        {
          name: SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_REQUIRED),
      ),
      isMaxNumber(
        {
          name: SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
          max: _get(sendTokenForm, [
            SEND_TOKEN_FIELDS.TOKEN,
            PORFOLIO_COLUMNS.BALANCE,
          ]),
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID),
      ),
      isMinNumber(
        {
          name: SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
          min: 1,
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID),
      ),
      isMaxLength(
        {
          name: SEND_TOKEN_FIELDS.MESSAGE,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.MESSAGE]),
          max: 255,
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_MESSAGE_MAXLENGTH),
      ),
    ]);

    return errorList;
  }

  render() {
    const {
      onSetTableType,
      onUpdateSendTokenInput,
      sendTokenForm,
      sendToKenPopup,
      tableType,
      tokenOptions,
      wallet,
    } = this.props;
    return (
      <Fragment>
        <AddressInfo
          wallet={wallet}
          openSendTokenPopup={this.handleOpenSendTokenPopup}
        />
        <DataTables
          setTableType={onSetTableType}
          tableType={tableType}
          openSendTokenPopup={this.handleOpenSendTokenPopup}
        />
        <SendTokenPopup
          addFullAmount={this.handleAddFullAmount}
          closePopup={this.handleCloseSendTokenPopup}
          formValues={sendTokenForm}
          popupData={sendToKenPopup}
          submitSendToken={this.handleSubmitSendToken}
          tokenOptions={tokenOptions}
          updateInput={onUpdateSendTokenInput}
        />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MyWallet.propTypes = {
  sendTokenForm: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to set current table tab */
  onSetTableType: PropTypes.func,
  /** Action to show/hide send token popup */
  onToggleSendTokenPopup: PropTypes.func,
  /** Action to store send token form errors */
  onUpdateSendTokenErrors: PropTypes.func,
  /** Action to handle input change in send token form */
  onUpdateSendTokenInput: PropTypes.func,
  /** Current highlighted table tab */
  tableType: PropTypes.string,
  /** List of token's data */
  tokenOptions: [],
  /** Current wallet's data */
  wallet: PropTypes.object,
};

MyWallet.defaultProps = {
  intl: {},
  onSetTableType: () => {},
  onToggleSendTokenPopup: () => {},
  onUpdateSendTokenErrors: () => {},
  onUpdateSendTokenInput: () => {},
  sendTokenForm: {},
  tokenOptions: [],
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    receivePopup: selectReceiveToKenPopup,
    sendTokenForm: selectSendTokenForm,
    sendToKenPopup: selectSendTokenPopup,
    successPopup: selectSuccessPopup,
    tableType: selectTableType,
    tokenOptions: selectTokenOptions,
    wallet: selectWallet,
  });
const mapDispatchToProps = dispatch => ({
  onSetTableType: type => dispatch(setTableType(type)),
  onToggleSendTokenPopup: (bool, initialValues) =>
    dispatch(toggleSendTokenPopup(bool, initialValues)),
  onUpdateSendTokenErrors: errors => dispatch(updateSendTokenErrors(errors)),
  onUpdateSendTokenInput: (name, value) =>
    dispatch(updateSendTokenInput(name, value)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
const withSaga = injectSaga({ key: DOMAIN_KEY, saga });
// ======================

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withIntl,
  withRouter,
  withWeb3,
)(MyWallet);
