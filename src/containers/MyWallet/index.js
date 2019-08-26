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
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import { Helmet } from 'react-helmet';
// Custom Components
import AddressInfo from './subcomponents/AddressInfo';
import DataTables from './subcomponents/DataTables';
import SendTokenPopup from './subcomponents/popups/SendToken';
import ReceiveTokenPopup from './subcomponents/popups/ReceiveToken';
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
  toggleReceiveTokenPopup,
  loadCoinData,
} from './actions';
import {
  selectTableType,
  selectReceiveToKenPopup,
  selectSendTokenPopup,
  selectSendTokenForm,
  selectSuccessPopup,
  selectTokenOptions,
  selectCoinData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  DOMAIN_KEY,
  SEND_TOKEN_FIELDS,
  PORTFOLIO_COLUMNS,
  SEND_TOKEN_STAGES,
} from './constants';
import {
  injectReducer,
  getValidations,
  mergeErrors,
  injectSaga,
  sendToken,
  withLoading,
} from '../../utils';
import { withIntl } from '../../components/IntlProvider';
import { withWeb3 } from '../../components/Web3';
import { selectWallet } from '../Global/selectors';
import { storeWallet } from '../Global/actions';
import { MSG, LIST } from '../../constants';
import { sendMoney, getWalletInfo, estimateGas } from '../../utils/blockchain';
// ==================

// ===== MAIN COMPONENT =====
class MyWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAddFullAmount = this.handleAddFullAmount.bind(this);
    this.handleCloseSendTokenPopup = this.handleCloseSendTokenPopup.bind(this);
    this.handleConfirmBeforeSend = this.handleConfirmBeforeSend.bind(this);
    this.handleGetContractData = this.handleGetContractData.bind(this);
    this.handleOpenSendTokenPopup = this.handleOpenSendTokenPopup.bind(this);
    this.handleSubmitSendToken = this.handleSubmitSendToken.bind(this);
    this.handleValidationSendForm = this.handleValidationSendForm.bind(this);
  }

  componentDidMount() {
    const { onLoadCoinData } = this.props;
    onLoadCoinData();
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

  handleConfirmBeforeSend() {
    const {
      onUpdateSendTokenErrors,
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      web3,
    } = this.props;
    const contractData = this.handleGetContractData();
    const errorList = this.handleValidationSendForm();
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0,
    );

    if (!_isEmpty(errorList)) {
      onUpdateSendTokenErrors(errorList);
    } else {
      estimateGas(web3, contractData)
        .then(gas =>
          web3.eth.getGasPrice().then(price => {
            const feeObj = web3.utils
              .toBN(gas * price)
              .divmod(web3.utils.toBN(10 ** decimals));
            const normalFee = parseFloat(
              `${feeObj.div}.${feeObj.mod.toString(10, decimals)}`,
            );
            onUpdateSendTokenInput(
              SEND_TOKEN_FIELDS.TRANSACTION_FEE,
              normalFee,
            );
            if (
              _get(
                sendTokenForm,
                [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.BALANCE],
                0,
              ) -
                _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT], 0) <
              normalFee
            ) {
              let reducedAmount =
                _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT], 0) -
                2 * normalFee;
              if (reducedAmount < 0) {
                reducedAmount = 0;
              }
              onUpdateSendTokenInput(
                SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
                reducedAmount,
              );
            }
            onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
          }),
        )
        .catch(error => {
          onUpdateSendTokenErrors({
            [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: [error.message],
          });
        });
    }
  }

  handleGetContractData() {
    const { sendTokenForm, web3 } = this.props;

    return {
      amount: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT], 0),
      contractAddress: _get(
        sendTokenForm,
        [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TOKEN_ADDRESS],
        '',
      ),
      decimals: _get(
        sendTokenForm,
        [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
        0,
      ),
      from: _get(web3, ['currentProvider', 'addresses', 0], ''),
      to: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT], ''),
      type: _get(sendTokenForm, [
        SEND_TOKEN_FIELDS.TOKEN,
        PORTFOLIO_COLUMNS.TYPE,
      ]),
    };
  }

  handleOpenSendTokenPopup(initialValues) {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(true, initialValues);
  }

  handleSubmitSendToken() {
    const {
      onStoreWallet,
      onToggleSuccessPopup,
      onUpdateSendTokenErrors,
      toggleLoading,
      web3,
    } = this.props;
    toggleLoading(true);
    const contractData = this.handleGetContractData();

    if (contractData.contractAddress) {
      sendToken(web3, contractData)
        .then(hash => {
          toggleLoading(false);
          return hash;
        })
        .then(hash => {
          this.handleCloseSendTokenPopup();
          onToggleSuccessPopup(true, hash);
        })
        .catch(error => {
          toggleLoading(false);
          onUpdateSendTokenErrors({ error: [error.message] });
        });
    } else {
      sendMoney(web3, contractData)
        .then(hash => {
          getWalletInfo(web3).then(walletInfo => {
            onStoreWallet(walletInfo);
          });
          return hash;
        })
        .then(hash => {
          toggleLoading(false);
          this.handleCloseSendTokenPopup();
          onToggleSuccessPopup(true, hash);
        })
        .catch(error => {
          toggleLoading(false);
          onUpdateSendTokenErrors({ error: [error.message] });
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
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TOKEN]),
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
            PORTFOLIO_COLUMNS.BALANCE,
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
      coinData,
      intl: { formatMessage },
      onSetTableType,
      onToggleReceiveTokenPopup,
      onToggleSuccessPopup,
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      receivePopup,
      sendTokenForm,
      sendToKenPopup,
      successPopup,
      tableType,
      tokenOptions,
      wallet,
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{formatMessage(MSG.MY_WALLET_TITLE)}</title>
        </Helmet>
        <AddressInfo
          coinData={coinData}
          openReceiveTokenPopup={() => onToggleReceiveTokenPopup(true)}
          openSendTokenPopup={this.handleOpenSendTokenPopup}
          wallet={wallet}
        />
        <DataTables
          openReceiveTokenPopup={() => onToggleReceiveTokenPopup(true)}
          openSendTokenPopup={this.handleOpenSendTokenPopup}
          setTableType={onSetTableType}
          tableType={tableType}
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
          togglePopup={onToggleSuccessPopup}
          successPopup={successPopup}
          symbol={_get(
            sendTokenForm,
            [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.SYMBOL],
            '',
          )}
        />
        <ReceiveTokenPopup
          isOpen={_get(receivePopup, 'isOpen', false)}
          togglePopup={onToggleReceiveTokenPopup}
        />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MyWallet.propTypes = {
  /** TomoChain coin data */
  coinData: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to reset send token popup's form */
  onResetSendTokenForm: PropTypes.func,
  /** Action to set current table tab */
  onSetTableType: PropTypes.func,
  /** Action to show/hide receive token popup */
  onToggleReceiveTokenPopup: PropTypes.func,
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
  /** Receive token popup's data */
  receivePopup: PropTypes.object,
  /** Send token popup's form values */
  sendTokenForm: PropTypes.object,
  /** Send token popup's data */
  sendToKenPopup: PropTypes.object,
  /** Success popup's data */
  successPopup: PropTypes.object,
  /** Current highlighted table tab */
  tableType: PropTypes.string,
  /** Action to show/hide loading screen */
  toggleLoading: PropTypes.func,
  /** List of token's data */
  tokenOptions: PropTypes.arrayOf(PropTypes.object),
  /** Current wallet's data */
  wallet: PropTypes.object,
};

MyWallet.defaultProps = {
  coinData: {},
  intl: {},
  onResetSendTokenForm: () => {},
  onSetTableType: () => {},
  onToggleReceiveTokenPopup: () => {},
  onToggleSendTokenPopup: () => {},
  onToggleSuccessPopup: () => {},
  onUpdateSendTokenErrors: () => {},
  onUpdateSendTokenInput: () => {},
  onUpdateSendTokenPopupStage: () => {},
  receivePopup: {},
  sendTokenForm: {},
  sendToKenPopup: {},
  successPopup: {},
  tableType: LIST.MY_WALLET_TABLE_TYPES[0].value,
  toggleLoading: () => {},
  tokenOptions: [],
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    coinData: selectCoinData,
    receivePopup: selectReceiveToKenPopup,
    sendTokenForm: selectSendTokenForm,
    sendToKenPopup: selectSendTokenPopup,
    successPopup: selectSuccessPopup,
    tableType: selectTableType,
    tokenOptions: selectTokenOptions,
    wallet: selectWallet,
  });
const mapDispatchToProps = dispatch => ({
  onLoadCoinData: () => dispatch(loadCoinData()),
  onResetSendTokenForm: () => dispatch(resetSendTokenForm()),
  onSetTableType: type => dispatch(setTableType(type)),
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
  onToggleReceiveTokenPopup: bool => dispatch(toggleReceiveTokenPopup(bool)),
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
  withLoading,
)(MyWallet);
