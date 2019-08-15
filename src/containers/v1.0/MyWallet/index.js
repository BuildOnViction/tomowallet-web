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
import SuccessPopup from './subcomponents/popups/Success';
// Utilities
import {
  setTableType,
  toggleSendTokenPopup,
  updateSendTokenInput,
  updateSendTokenErrors,
  updateSendTokenPopupStage,
  toggleSuccessPopup,
  resetSendTokenForm,
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
import {
  DOMAIN_KEY,
  SEND_TOKEN_FIELDS,
  PORFOLIO_COLUMNS,
  SEND_TOKEN_STAGES,
} from './constants';
import {
  injectReducer,
  getValidations,
  mergeErrors,
  injectSaga,
  sendToken,
} from '../../../utils';
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { selectWallet } from '../../Global/selectors';
import { MSG, LIST } from '../../../constants';
import { sendMoney, getWalletInfo } from '../../../utils/blockchain';
import { storeWallet } from '../../Global/actions';
// -- TO-DO: Add style for My Wallet page component
// ==================

// ===== MAIN COMPONENT =====
class MyWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAddFullAmount = this.handleAddFullAmount.bind(this);
    this.handleCloseSendTokenPopup = this.handleCloseSendTokenPopup.bind(this);
    this.handleCloseSuccessPopup = this.handleCloseSuccessPopup.bind(this);
    this.handleConfirmBeforeSend = this.handleConfirmBeforeSend.bind(this);
    this.handleGetContractData = this.handleGetContractData.bind(this);
    this.handleOpenSendTokenPopup = this.handleOpenSendTokenPopup.bind(this);
    this.handleSubmitSendToken = this.handleSubmitSendToken.bind(this);
    this.handleValidationSendForm = this.handleValidationSendForm.bind(this);
  }

  handleAddFullAmount() {
    const { onUpdateSendTokenInput, sendTokenForm } = this.props;

    onUpdateSendTokenInput(
      SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
      _get(sendTokenForm, [SEND_TOKEN_FIELDS.TOKEN, 'balance'], ''),
    );
  }

  handleCloseSendTokenPopup() {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(false);
  }

  handleCloseSuccessPopup() {
    const { onToggleSuccessPopup } = this.props;
    this.handleCloseSendTokenPopup();
    onToggleSuccessPopup(false);
  }

  handleConfirmBeforeSend() {
    const { onUpdateSendTokenErrors, onUpdateSendTokenPopupStage } = this.props;
    const errorList = this.handleValidationSendForm();
    if (!_isEmpty(errorList)) {
      onUpdateSendTokenErrors(errorList);
    } else {
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    }
  }

  handleGetContractData() {
    const { sendTokenForm, web3 } = this.props;

    return {
      amount: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT], 0),
      contractAddress: _get(
        sendTokenForm,
        [SEND_TOKEN_FIELDS.TOKEN, PORFOLIO_COLUMNS.TOKEN_ADDRESS],
        '',
      ),
      decimals: _get(
        sendTokenForm,
        [SEND_TOKEN_FIELDS.TOKEN, PORFOLIO_COLUMNS.DECIMALS],
        0,
      ),
      from: _get(web3, ['currentProvider', 'addresses', 0], ''),
      to: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT], ''),
      type: _get(sendTokenForm, [
        SEND_TOKEN_FIELDS.TOKEN,
        PORFOLIO_COLUMNS.TYPE,
      ]),
    };
  }

  handleOpenSendTokenPopup(initialValues) {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(true, initialValues);
  }

  handleSubmitSendToken() {
    const { onStoreWallet, onToggleSuccessPopup, web3 } = this.props;
    const contractData = this.handleGetContractData();
    if (contractData.contractAddress) {
      sendToken(web3, contractData).then(result =>
        this.setState({ txHash: result }),
      );
    } else {
      sendMoney(web3, contractData)
        .then(hash => {
          console.warn('sendMoney successful!', hash);
          getWalletInfo(web3).then(walletInfo => {
            onStoreWallet(walletInfo);
          });
          return hash;
        })
        .then(hash => {
          this.handleCloseSendTokenPopup();
          onToggleSuccessPopup(true, hash);
        });
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
      onToggleSuccessPopup,
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      sendToKenPopup,
      successPopup,
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
          confirmBeforeSend={this.handleConfirmBeforeSend}
          formValues={sendTokenForm}
          popupData={sendToKenPopup}
          submitSendToken={this.handleSubmitSendToken}
          tokenOptions={tokenOptions}
          updateInput={onUpdateSendTokenInput}
          updateSendTokenPopupStage={onUpdateSendTokenPopupStage}
        />
        <SuccessPopup
          amount={_get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT])}
          closePopup={() => onToggleSuccessPopup(false)}
          successPopup={successPopup}
          symbol={_get(
            sendTokenForm,
            [SEND_TOKEN_FIELDS.TOKEN, PORFOLIO_COLUMNS.SYMBOL],
            '',
          )}
        />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MyWallet.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to reset send token popup's form */
  onResetSendTokenForm: PropTypes.func,
  /** Action to set current table tab */
  onSetTableType: PropTypes.func,
  /** Action to show/hide send token popup */
  onToggleSendTokenPopup: PropTypes.func,
  /** Action to show/hide success popup */
  onToggleSuccessPopup: PropTypes.func,
  /** Action to store send token form errors */
  onUpdateSendTokenErrors: PropTypes.func,
  /** Action to handle input change in send token form */
  onUpdateSendTokenInput: PropTypes.func,
  /** Action to update send token popup's stage of content */
  onUpdateSendTokenPopupStage: PropTypes.func,
  /** Send token popup's form values */
  sendTokenForm: PropTypes.object,
  /** Send token popup's data */
  sendToKenPopup: PropTypes.object,
  /** Success popup's data */
  successPopup: PropTypes.object,
  /** Current highlighted table tab */
  tableType: PropTypes.string,
  /** List of token's data */
  tokenOptions: PropTypes.arrayOf(PropTypes.object),
  /** Current wallet's data */
  wallet: PropTypes.object,
};

MyWallet.defaultProps = {
  intl: {},
  onResetSendTokenForm: () => {},
  onSetTableType: () => {},
  onToggleSendTokenPopup: () => {},
  onToggleSuccessPopup: () => {},
  onUpdateSendTokenErrors: () => {},
  onUpdateSendTokenInput: () => {},
  onUpdateSendTokenPopupStage: () => {},
  sendTokenForm: {},
  sendToKenPopup: {},
  successPopup: {},
  tableType: LIST.TABLE_TYPES[0].value,
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
  onResetSendTokenForm: () => dispatch(resetSendTokenForm()),
  onSetTableType: type => dispatch(setTableType(type)),
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
  onToggleSendTokenPopup: (bool, initialValues) =>
    dispatch(toggleSendTokenPopup(bool, initialValues)),
  onToggleSuccessPopup: (bool, hash) =>
    dispatch(toggleSuccessPopup(bool, hash)),
  onUpdateSendTokenErrors: errors => dispatch(updateSendTokenErrors(errors)),
  onUpdateSendTokenInput: (name, value) =>
    dispatch(updateSendTokenInput(name, value)),
  onUpdateSendTokenPopupStage: stage =>
    dispatch(updateSendTokenPopupStage(stage)),
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
