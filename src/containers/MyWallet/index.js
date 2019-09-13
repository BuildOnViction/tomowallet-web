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
import Transaction from 'ethereumjs-tx';
import Eth from '@ledgerhq/hw-app-eth';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
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
  resetState,
  loadWalletTransactionData,
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
  getWeb3Info,
  getNetwork,
  sendMoney,
  getWalletInfo,
  convertAmountWithDecimals,
  getBalance,
  repeatGetTransaction,
  estimateCurrencyFee,
  estimateTRC20Fee,
  estimateTRC21Fee,
  bnToDecimals,
  decimalsToBN,
  getLedgerTokenTransferData,
} from '../../utils';
import { withIntl } from '../../components/IntlProvider';
import { withWeb3 } from '../../components/Web3';
import { selectWallet } from '../Global/selectors';
import { storeWallet } from '../Global/actions';
import { MSG, LIST, ENUM, RPC_SERVER } from '../../constants';
// ==================

// ===== MAIN COMPONENT =====
class MyWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAddFullAmount = this.handleAddFullAmount.bind(this);
    this.handleCloseSendTokenPopup = this.handleCloseSendTokenPopup.bind(this);
    this.handleConfirmBeforeSend = this.handleConfirmBeforeSend.bind(this);
    this.handleGetContractData = this.handleGetContractData.bind(this);
    this.handleGetSendAction = this.handleGetSendAction.bind(this);
    this.handleOpenSendTokenPopup = this.handleOpenSendTokenPopup.bind(this);
    this.handleSendMoneyByLedger = this.handleSendMoneyByLedger.bind(this);
    this.handleSendMoneyByPK = this.handleSendMoneyByPK.bind(this);
    this.handleSendTokenByPK = this.handleSendTokenByPK.bind(this);
    this.handleTransactionError = this.handleTransactionError.bind(this);
    this.handleValidateCurrencyFee = this.handleValidateCurrencyFee.bind(this);
    this.handleValidateTrc20Fee = this.handleValidateTrc20Fee.bind(this);
    this.handleValidateTrc21Fee = this.handleValidateTrc21Fee.bind(this);
    this.handleValidationSendForm = this.handleValidationSendForm.bind(this);
  }

  componentDidMount() {
    const { onLoadCoinData } = this.props;
    onLoadCoinData();
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleAddFullAmount() {
    const { onUpdateSendTokenInput, sendTokenForm } = this.props;
    const rawBalance = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.BALANCE],
      0,
    );
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0,
    );
    const normalBalance = convertAmountWithDecimals(rawBalance, decimals);

    onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSFER_AMOUNT, normalBalance);
  }

  handleCloseSendTokenPopup() {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(false);
  }

  handleConfirmBeforeSend() {
    const {
      onUpdateSendTokenErrors,
      sendTokenForm,
      toggleLoading,
      web3,
    } = this.props;
    const contractData = this.handleGetContractData();
    const errorList = this.handleValidationSendForm();
    const tokenType = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TYPE],
      '',
    );

    if (!_isEmpty(errorList)) {
      onUpdateSendTokenErrors(errorList);
    } else {
      toggleLoading(true);
      try {
        if (tokenType === ENUM.TOKEN_TYPE.CURRENCY) {
          estimateCurrencyFee(web3, contractData).then(feeObj => {
            this.handleValidateCurrencyFee(feeObj);
          });
        } else if (tokenType === ENUM.TOKEN_TYPE.TRC20) {
          estimateTRC20Fee(web3, contractData).then(feeObj => {
            this.handleValidateTrc20Fee(feeObj);
          });
        } else {
          estimateTRC21Fee(web3, contractData).then(feeObj => {
            if (feeObj.type === ENUM.TOKEN_TYPE.TRC21) {
              this.handleValidateCurrencyFee(feeObj);
            } else {
              this.handleValidateTrc20Fee(feeObj);
            }
          });
        }
      } catch (error) {
        toggleLoading(false);
        onUpdateSendTokenErrors({
          [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: [error.message],
        });
      }
    }
  }

  handleGetContractData() {
    const { sendTokenForm, wallet } = this.props;
    const address = wallet.address;

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
      from: address,
      to: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT], ''),
      type: _get(sendTokenForm, [
        SEND_TOKEN_FIELDS.TOKEN,
        PORTFOLIO_COLUMNS.TYPE,
      ]),
    };
  }

  handleGetSendAction() {
    const { sendTokenForm } = this.props;
    const loginType = _get(getWeb3Info(), 'loginType');
    let sendAction = () => {};

    if (loginType === ENUM.LOGIN_TYPE.LEDGER) {
      sendAction = this.handleSendMoneyByLedger;
    } else if (loginType === ENUM.LOGIN_TYPE.PRIVATE_KEY) {
      if (
        _get(sendTokenForm, [
          SEND_TOKEN_FIELDS.TOKEN,
          PORTFOLIO_COLUMNS.TYPE,
        ]) === ENUM.TOKEN_TYPE.CURRENCY
      ) {
        sendAction = this.handleSendMoneyByPK;
      } else {
        sendAction = this.handleSendTokenByPK;
      }
    }

    return sendAction();
  }

  handleOpenSendTokenPopup(initialValues) {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(true, initialValues);
  }

  handleSendMoneyByLedger() {
    const { sendTokenForm, toggleLoading } = this.props;

    toggleLoading(true);
    this.handleSendSignedTransactionLedger(
      _get(sendTokenForm, [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TYPE]),
    );
  }

  handleSendMoneyByPK() {
    const {
      onStoreWallet,
      web3,
      toggleLoading,
      onToggleSuccessPopup,
    } = this.props;
    const contractData = this.handleGetContractData();

    toggleLoading(true);
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
      .catch(this.handleTransactionError);
  }

  handleSendSignedTransactionLedger(tokenType) {
    const {
      onStoreWallet,
      onToggleSuccessPopup,
      sendTokenForm,
      toggleLoading,
      web3,
    } = this.props;
    const { address, hdPath } = getWeb3Info();
    const contract = this.handleGetContractData();
    const networkKey = getNetwork() || ENUM.NETWORK_TYPE.TOMOCHAIN_MAINNET;
    const networkId = _get(RPC_SERVER, [networkKey, 'networkId']);
    const gasPrice = _get(sendTokenForm, [
      SEND_TOKEN_FIELDS.TRANSACTION_FEE,
      'gasPrice',
    ]);
    const gas = _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSACTION_FEE, 'gas']);

    try {
      const transData = getLedgerTokenTransferData(web3, contract);
      web3.eth.getTransactionCount(contract.from).then(nonce => {
        const txParams = {
          from: contract.from,
          ...(tokenType === ENUM.TOKEN_TYPE.CURRENCY
            ? {
                to: contract.to,
                value: `0x${web3.utils
                  .toBN(decimalsToBN(contract.amount, contract.decimals))
                  .toString('hex')}`,
              }
            : {
                to: contract.contractAddress,
                data: transData,
              }),
          nonce: `0x${web3.utils.toBN(nonce).toString('hex')}`,
          gas: `0x${web3.utils.toBN(gas).toString('hex')}`,
          gasPrice: `0x${web3.utils.toBN(gasPrice).toString('hex')}`,
          chainId: networkId,
        };

        const rawTx = new Transaction(txParams);
        rawTx.v = Buffer.from([networkId]);
        const serializedRawTx = rawTx.serialize().toString('hex');
        TransportU2F.create().then(transport =>
          new Eth(transport)
            .signTransaction(hdPath, serializedRawTx)
            .then(signature => {
              const hexifySignature = {};
              Object.keys(signature).forEach(key => {
                hexifySignature[key] = signature[key].startsWith('0x')
                  ? signature[key]
                  : `0x${signature[key]}`;
              });
              const txObj = {
                ...txParams,
                ...hexifySignature,
              };
              const tx = new Transaction(txObj);
              const serializedTx = `0x${tx.serialize().toString('hex')}`;

              web3.eth
                .sendSignedTransaction(serializedTx)
                .on('transactionHash', txHash => {
                  repeatGetTransaction(web3, txHash);
                })
                .then(txObj => {
                  getBalance(address).then(balance => {
                    onStoreWallet({
                      address,
                      balance,
                    });
                  });

                  toggleLoading(false);
                  this.handleCloseSendTokenPopup();
                  onToggleSuccessPopup(true, txObj);
                });
            }),
        );
      });
    } catch (error) {
      this.handleTransactionError(error);
    }
  }

  handleSendTokenByPK() {
    const { onToggleSuccessPopup, toggleLoading, web3 } = this.props;
    const contractData = this.handleGetContractData();

    sendToken(web3, contractData)
      .then(hash => {
        toggleLoading(false);
        return hash;
      })
      .then(hash => {
        this.handleCloseSendTokenPopup();
        onToggleSuccessPopup(true, hash);
      })
      .catch(this.handleTransactionError);
  }

  handleTransactionError(error) {
    const { onUpdateSendTokenErrors, toggleLoading } = this.props;
    toggleLoading(false);
    onUpdateSendTokenErrors({ error: [error.message] });
  }

  handleValidateCurrencyFee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateSendTokenErrors,
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      toggleLoading,
      web3,
    } = this.props;
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0,
    );
    const balance = _get(sendTokenForm, [
      SEND_TOKEN_FIELDS.TOKEN,
      PORTFOLIO_COLUMNS.BALANCE,
    ]);

    if (
      balance ===
      decimalsToBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        decimals,
      )
    ) {
      toggleLoading(false);
      const remainAmount = bnToDecimals(
        web3.utils
          .toBN(balance)
          .sub(web3.utils.toBN(decimalsToBN(feeObj.amount, decimals))),
        decimals,
      );

      if (remainAmount.includes('-')) {
        onUpdateSendTokenErrors({
          [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: [
            formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY,
            ),
          ],
        });
      } else {
        onUpdateSendTokenInput(
          SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          bnToDecimals(
            web3.utils
              .toBN(balance)
              .sub(web3.utils.toBN(decimalsToBN(feeObj.amount, decimals))),
            decimals,
          ),
        );
        onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
        onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
      }
    } else if (
      !web3.utils
        .toBN(
          decimalsToBN(
            _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
            decimals,
          ),
        )
        .add(web3.utils.toBN(decimalsToBN(feeObj.amount, decimals)))
        .sub(web3.utils.toBN(balance))
        .toString()
        .includes('-')
    ) {
      toggleLoading(false);
      onUpdateSendTokenErrors({
        [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: [
          formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY,
          ),
        ],
      });
    } else {
      toggleLoading(false);
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    }
  }

  handleValidateTrc20Fee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateSendTokenErrors,
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      toggleLoading,
      wallet,
      web3,
    } = this.props;
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0,
    );

    if (
      web3.utils
        .toBN(_get(wallet, 'balance'))
        .sub(web3.utils.toBN(decimalsToBN(feeObj.amount, decimals)))
        .toString()
        .includes('-')
    ) {
      toggleLoading(false);
      onUpdateSendTokenErrors({
        [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: [
          formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY,
          ),
        ],
      });
    } else {
      toggleLoading(false);
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    }
  }

  handleValidateTrc21Fee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateSendTokenErrors,
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      toggleLoading,
      web3,
    } = this.props;
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0,
    );
    const balance = _get(sendTokenForm, [
      SEND_TOKEN_FIELDS.TOKEN,
      PORTFOLIO_COLUMNS.BALANCE,
    ]);

    if (
      balance ===
      decimalsToBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        decimals,
      )
    ) {
      toggleLoading(false);
      onUpdateSendTokenInput(
        SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
        bnToDecimals(
          web3.utils
            .toBN(balance)
            .sub(web3.utils.toBN(decimalsToBN(feeObj.amount, decimals))),
          decimals,
        ),
      );
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    } else if (
      !web3.utils
        .toBN(
          decimalsToBN(
            _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
            decimals,
          ),
        )
        .add(web3.utils.toBN(decimalsToBN(feeObj.amount, decimals)))
        .sub(web3.utils.toBN(balance))
        .toString()
        .includes('-')
    ) {
      toggleLoading(false);
      onUpdateSendTokenErrors({
        [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: [
          formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_TOKEN,
          ),
        ],
      });
    } else {
      toggleLoading(false);
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
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
          max: parseFloat(
            convertAmountWithDecimals(
              _get(sendTokenForm, [
                SEND_TOKEN_FIELDS.TOKEN,
                PORTFOLIO_COLUMNS.BALANCE,
              ]),
              _get(sendTokenForm, [
                SEND_TOKEN_FIELDS.TOKEN,
                PORTFOLIO_COLUMNS.DECIMALS,
              ]),
            ),
          ),
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID),
      ),
      isMinNumber(
        {
          name: SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
          min: 0,
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
          submitSendToken={this.handleGetSendAction}
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
  /** Action to load Tomo coin data from CoinMarketCap */
  onLoadCoinData: PropTypes.func,
  /** Action to reset send token popup's form */
  onResetSendTokenForm: PropTypes.func,
  /** Action to refresh all My Wallet page's states */
  onResetState: PropTypes.func,
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
  onLoadCoinData: () => {},
  onResetSendTokenForm: () => {},
  onResetState: () => {},
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
  onResetState: () => dispatch(resetState()),
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
