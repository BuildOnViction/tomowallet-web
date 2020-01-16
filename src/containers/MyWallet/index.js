/**
 *
 * TomoWallet - My Wallet Page
 *
 * This component defines a wallet-provided home page, with all basic information &
 * options to send/receive tokens...
 */
// ==== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import _get from "lodash.get";
import _isEmpty from "lodash.isempty";
import { Helmet } from "react-helmet";
// Custom Components
import AddressInfo from "./subcomponents/AddressInfo";
import DataTables from "./subcomponents/DataTables";
import SendTokenPopup from "./subcomponents/popups/SendToken";
import ReceiveTokenPopup from "./subcomponents/popups/ReceiveToken";
import SuccessPopup from "./subcomponents/popups/Success";
import SuccessDepositPopup from "./subcomponents/popups/SuccessDeposit";
import DepositPrivacyPopup from "./subcomponents/popups/DepositPrivacy";
import WithdrawPopup from "./subcomponents/popups/Withdraw";
import SuccessWithdrawPopup from "./subcomponents/popups/SuccessWithdraw";
// Utilities & Constants
import {
  resetSendTokenForm,
  resetState,
  setTableType,
  toggleReceiveTokenPopup,
  toggleSendTokenPopup,
  toggleSuccessPopup,
  updateSendTokenInput,
  updateSendTokenErrors,
	updateSendTokenPopupStage,
  toggleDepositPrivacyPopup,
  updateDepositPrivacyInput,
  updateDepositPrivacyPopupStage,
  toggleSuccessDepositPopup,
  toggleWithdrawPrivacyPopup,
  updateWithdrawPrivacyInput,
  updateWithdrawPrivacyErrors,
  updateDepositPrivacyErrors,
  toggleSuccessWithdrawPopup,
  updateWithdrawPrivacyPopupStage
} from "./actions";
import {
  selectReceiveToKenPopup,
  selectSendTokenForm,
  selectSendTokenPopup,
  selectSuccessPopup,
  selectTableType,
	selectTokenOptions,
  selectDepositPrivacyForm,
  selectDepositPrivacyPopup,
  selectSuccessDepositPopup,
  selectWithdrawPrivacyPopup,
  selectWithdrawPrivacyForm,
  selectSuccessWithdrawPopup,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {
  DOMAIN_KEY,
  SEND_TOKEN_FIELDS,
  SEND_TOKEN_STAGES,
  PORTFOLIO_COLUMNS,
  DEPOSIT_STAGES,
  DEPOSIT_PRIVACY_FIELDS,
  WITHDRAW_PRIVACY_FIELDS,
  WITHDRAW_STAGES,
} from "./constants";
import {
  addBN,
  bnToDecimals,
  decimalsToBN,
  estimateFee,
  getBalance,
  getNetwork,
  getWalletInfo,
  getWeb3Info,
  injectReducer,
  injectSaga,
  mergeErrors,
  removeTrailingZero,
  sendMoney,
  sendSignedTransaction,
  sendToken,
  subBN,
  validations,
  withGlobal,
  sendMoneyPrivacy,
  depositPrivacyMoney,
  getPrivacyAddressInfo,
  estimatePrivacyFee,
  withdrawPrivacy
} from "../../utils";
import { withIntl } from "../../components/IntlProvider";
import { withWeb3 } from "../../components/Web3";
import { selectWallet, selectPrivacyMode } from "../Global/selectors";
import { storeWallet, updatePrivacyData } from "../Global/actions";
import { MSG, LIST, ENUM, RPC_SERVER } from "../../constants";
// ==================

// ===== MAIN COMPONENT =====
class MyWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAddFullAmount = this.handleAddFullAmount.bind(this);
    this.handleCloseSendTokenPopup = this.handleCloseSendTokenPopup.bind(this);
    this.handleConfirmationError = this.handleConfirmationError.bind(this);
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
    this.handleSendMoneyPrivacy = this.handleSendMoneyPrivacy.bind(this);
		this.handleValidatePrivacyFee = this.handleValidatePrivacyFee.bind(this);
		this.handleOpenDepositPrivacyPopup = this.handleOpenDepositPrivacyPopup.bind(this);
		this.handleCloseDepositPrivacyPopup = this.handleCloseDepositPrivacyPopup.bind(this);
		this.handleConfirmBeforeDeposit = this.handleConfirmBeforeDeposit.bind(this);
    this.handleValidateDepositFee = this.handleValidateDepositFee.bind(this);
    this.handleGetDepositAction = this.handleGetDepositAction.bind(this);
    this.handleDepositPrivacyByPk = this.handleDepositPrivacyByPk.bind(this);
    this.handleOpenWithdrawPrivacyPopup = this.handleOpenWithdrawPrivacyPopup.bind(this);
    this.handleCloseWithdrawPrivacyPopup = this.handleCloseWithdrawPrivacyPopup.bind(this);
    this.handleWithdrawFullAmount = this.handleWithdrawFullAmount.bind(this);
    this.handleConfirmBeforeWithdraw = this.handleConfirmBeforeWithdraw.bind(this);
    this.handleValidationWithdrawPrivacyForm = this.handleValidationWithdrawPrivacyForm.bind(this);
    this.handleValidationDepositPrivacyForm = this.handleValidationDepositPrivacyForm.bind(this);
    this.handleGetWithdrawAction = this.handleGetWithdrawAction.bind(this);
    this.handleWithdrawPrivacyByPk = this.handleWithdrawPrivacyByPk.bind(this);
    this.handleValidateWithdrawFee = this.handleValidateWithdrawFee.bind(this);
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
      0
    );
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );
    const normalBalance = removeTrailingZero(
      bnToDecimals(rawBalance, decimals)
    );

    onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSFER_AMOUNT, normalBalance);
  }

  handleWithdrawFullAmount() {
    const { onUpdateWithdrawPrivacyInput, withdrawForm } = this.props;
    const rawBalance = _get(
      withdrawForm,
      [WITHDRAW_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.BALANCE],
      0
    );
    const decimals = _get(
      withdrawForm,
      [WITHDRAW_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );
    const normalBalance = removeTrailingZero(
      bnToDecimals(rawBalance, decimals)
    );

    onUpdateWithdrawPrivacyInput(WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT, normalBalance);
  }

  handleCloseSendTokenPopup() {
    const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(false);
	}
	handleCloseDepositPrivacyPopup() {
    const { onToggleDepositPrivacyPopup } = this.props;
    onToggleDepositPrivacyPopup(false);
  }
  handleCloseWithdrawPrivacyPopup() {
    const { onToggleWithdrawPrivacyPopup } = this.props;
    onToggleWithdrawPrivacyPopup(false);
  }

  handleConfirmationError(message) {
    const { onUpdateSendTokenErrors, toggleLoading } = this.props;
    toggleLoading(false);
    onUpdateSendTokenErrors({
      [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]: [message]
    });
  }

  handleConfirmBeforeSend() {
    const {
      onUpdateSendTokenErrors,
      sendTokenForm,
      toggleLoading,
      web3,
      privacyMode,
      wallet,
    } = this.props;
    const contractData = this.handleGetContractData();
    const errorList = this.handleValidationSendForm();
    const tokenType = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TYPE],
      ""
    );
    const isTestnet = getNetwork() === ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;

    if (!_isEmpty(errorList)) {
      onUpdateSendTokenErrors(errorList);
    } else {
      toggleLoading(true);
      try {
        if (!privacyMode) {
          const fee = estimatePrivacyFee(web3,
            _get(wallet, ['privacy', 'privacyWallet'], {}),
            _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT], 0))

            this.handleValidatePrivacyFee({
              type: 'TRC21',
              amount: bnToDecimals(fee.toString(10), 18)
            })
        } else {
          estimateFee(web3, tokenType, contractData, isTestnet).then(feeObj => {
            const type = feeObj.type;
            if (type === ENUM.TOKEN_TYPE.TRC20) {
              this.handleValidateTrc20Fee(feeObj);
            } else if (type === ENUM.TOKEN_TYPE.TRC21) {
              this.handleValidateTrc21Fee(feeObj);
            } else if (type === ENUM.TOKEN_TYPE.CURRENCY) {
              this.handleValidateCurrencyFee(feeObj);
            }
          });
        }
      } catch (error) {
        this.handleConfirmationError(error.message);
      }
    }
	}
	
	handleConfirmBeforeDeposit() {
    const {
      onUpdateDepositPrivacyErrors,
      toggleLoading,
		} = this.props;
    const errorList = this.handleValidationDepositPrivacyForm();

    const isTestnet = getNetwork() === ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;

    if (!_isEmpty(errorList)) {
      onUpdateDepositPrivacyErrors(errorList);
    } else {
      toggleLoading(true);
      try {
        const feeObj = {
					type: 'TRC21',
					amount: '0.0001',
        }
				this.handleValidateDepositFee(feeObj)
      } catch (error) {
        this.handleConfirmationError(error.message);
      }
    }
  }

  handleConfirmBeforeWithdraw() {
    const {
      onUpdateWithdrawPrivacyErrors,
      toggleLoading,
      web3,
      wallet,
      withdrawForm
    } = this.props;
    const errorList = this.handleValidationWithdrawPrivacyForm();

    const isTestnet = getNetwork() === ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;

    if (!_isEmpty(errorList)) {
      onUpdateWithdrawPrivacyErrors(errorList);
    } else {
      toggleLoading(true);
      try {
        const fee = estimatePrivacyFee(web3,
          _get(wallet, ['privacy', 'privacyWallet'], {}),
          _get(withdrawForm, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT], 0))

				this.handleValidateWithdrawFee({
					type: 'TRC21',
					amount: bnToDecimals(fee, 18),
        })
      } catch (error) {
        this.handleConfirmationError(error.message);
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
        ""
      ),
      decimals: _get(
        sendTokenForm,
        [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
        0
      ),
      from: address,
      to: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT], ""),
      type: _get(sendTokenForm, [
        SEND_TOKEN_FIELDS.TOKEN,
        PORTFOLIO_COLUMNS.TYPE
      ])
    };
  }

  handleGetSendAction(privacyMode) {
    const { sendTokenForm } = this.props;
    const loginType = _get(getWeb3Info(), "loginType");
    let sendAction = () => {};

    if (!privacyMode) {
      sendAction = this.handleSendMoneyPrivacy
    } else {
      if (loginType === ENUM.LOGIN_TYPE.LEDGER) {
        sendAction = this.handleSendMoneyByLedger;
      } else if (loginType === ENUM.LOGIN_TYPE.PRIVATE_KEY) {
        if (
          _get(sendTokenForm, [
            SEND_TOKEN_FIELDS.TOKEN,
            PORTFOLIO_COLUMNS.TYPE
          ]) === ENUM.TOKEN_TYPE.CURRENCY
        ) {
          sendAction = this.handleSendMoneyByPK;
        } else {
          sendAction = this.handleSendTokenByPK;
        }
      } else {
        sendAction = this.handleSendMoneyByPK;
      }
    }

    return sendAction();
  }

  handleGetDepositAction(privacyMode) {
    const loginType = _get(getWeb3Info(), "loginType");
    let depositAction = () => {};
    if (!privacyMode) {
      if (loginType === ENUM.LOGIN_TYPE.PRIVATE_KEY) {
        depositAction = this.handleDepositPrivacyByPk;
      }
    }

    return depositAction()
  }
  handleGetWithdrawAction(privacyMode) {
    const loginType = _get(getWeb3Info(), "loginType");
    let withDrawAction = () => {};
    if (!privacyMode) {
      if (loginType === ENUM.LOGIN_TYPE.PRIVATE_KEY) {
        withDrawAction = this.handleWithdrawPrivacyByPk;
      }
    }

    return withDrawAction()
  }

  handleOpenSendTokenPopup(initialValues) {
		const { onToggleSendTokenPopup } = this.props;
    onToggleSendTokenPopup(true, initialValues);
	}
	
	handleOpenDepositPrivacyPopup(initialValues) {
		const { onToggleDepositPrivacyPopup } = this.props;
		onToggleDepositPrivacyPopup(true, initialValues);
  }
  
  handleOpenWithdrawPrivacyPopup(initialValues) {
    const { onToggleWithdrawPrivacyPopup } = this.props;
    onToggleWithdrawPrivacyPopup(true, initialValues);
  }

  handleSendMoneyPrivacy() {
    const {
      web3,
      toggleLoading,
      onToggleSuccessPopup,
      wallet,
			sendTokenForm,
			onUpdatePrivacyData,
    } = this.props;
    toggleLoading(true);
		const privacyWallet = _get(wallet, ['privacy', 'privacyWallet'], {})
    const address = _get(wallet, 'address')
    sendMoneyPrivacy(
      web3,
      privacyWallet,
      _get(sendTokenForm, [
        SEND_TOKEN_FIELDS.TRANSFER_AMOUNT
      ], 0),
      _get(sendTokenForm, [
        SEND_TOKEN_FIELDS.RECIPIENT
      ], '')
    ).then(utxo => {
			toggleLoading(false);
			onUpdatePrivacyData({ address, privacyWallet })
			this.handleCloseSendTokenPopup();
			onToggleSuccessPopup(true, '');
    }).catch(error => {
      this.handleTransactionError
    });
  }

  handleDepositPrivacyByPk() {
    const {
      web3,
      toggleLoading,
      wallet,
			depositForm,
      onUpdatePrivacyData,
      onToggleSuccessDepositPopup,
    } = this.props;
    toggleLoading(true);
		const privacyWallet = _get(wallet, ['privacy', 'privacyWallet'], {})
		const address = _get(wallet, 'address')
    depositPrivacyMoney(
      web3,
      privacyWallet,
      _get(depositForm, [
        SEND_TOKEN_FIELDS.TRANSFER_AMOUNT
      ], 0)
    ).then(({utxo, proof, tx}) => {
			toggleLoading(false);
			onUpdatePrivacyData({ address, privacyWallet })
      this.handleCloseDepositPrivacyPopup();
			onToggleSuccessDepositPopup(true, tx.transactionHash || '');
    }).catch(this.handleTransactionError);
  }

  handleWithdrawPrivacyByPk() {
    const {
      web3,
      toggleLoading,
      wallet,
      withdrawForm,
      onUpdatePrivacyData,
      onToggleSuccessWithdrawPopup,
    } = this.props;
    toggleLoading(true);
    const privacyWallet = _get(wallet, ['privacy', 'privacyWallet'], {})
		const address = _get(wallet, 'address')
    withdrawPrivacy(
      web3,
      wallet,
      _get(withdrawForm, [
        WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT
      ], 0)
    ).then((data) => {
      toggleLoading(false);
			onUpdatePrivacyData({ address, privacyWallet })
      this.handleCloseWithdrawPrivacyPopup();
      onToggleSuccessWithdrawPopup(true, _get(data, '0', 'transactionHash', ''));
    }).catch(this.handleTransactionError);
  }

  handleSendMoneyByPK() {
    const {
      onStoreWallet,
      web3,
      toggleLoading,
      onToggleSuccessPopup
    } = this.props;
    const contractData = this.handleGetContractData();

    toggleLoading(true);
    sendMoney(web3, contractData)
      .then(hash => {
        getWalletInfo(web3).then(walletInfo => {
          const loginType = _get(getWeb3Info(), "loginType");
          if (loginType === ENUM.LOGIN_TYPE.PRIVATE_KEY) {
              // get privacy address
            const privacyObject = getPrivacyAddressInfo(
              walletInfo.address,
              formValues.recoveryPhrase ? mnemonicToPrivateKey(formValues.recoveryPhrase, updatedRpcServer)
                    : formValues.privateKey, updatedRpcServer);
            walletInfo.privacy = privacyObject;
          }
          
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

  handleSendMoneyByLedger() {
    const {
      onStoreWallet,
      onToggleSuccessPopup,
      sendTokenForm,
      toggleLoading,
      web3
    } = this.props;
    const { address, hdPath } = getWeb3Info();
    const contract = this.handleGetContractData();
    const networkKey = getNetwork() || ENUM.NETWORK_TYPE.TOMOCHAIN_MAINNET;
    const serverConfig = _get(RPC_SERVER, [networkKey]);
    const gasPrice = _get(sendTokenForm, [
      SEND_TOKEN_FIELDS.TRANSACTION_FEE,
      "gasPrice"
    ]);
    const gas = _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSACTION_FEE, "gas"]);

    toggleLoading(true);
    sendSignedTransaction(web3, {
      ...contract,
      chainId: serverConfig.networkId,
      gas,
      gasPrice,
      hdPath
    })
      .then(txObj => {
        getBalance(address, serverConfig).then(balance => {
          onStoreWallet({
            address,
            balance
          });
        });
        toggleLoading(false);
        this.handleCloseSendTokenPopup();
        onToggleSuccessPopup(true, txObj);
      })
      .catch(this.handleTransactionError);
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
    const { onUpdateSendTokenErrors, toggleLoading, onUpdateWithdrawPrivacyErrors,
      onUpdateDepositPrivacyErrors,
    } = this.props;
    toggleLoading(false);
    onUpdateSendTokenErrors({ error: [error.message] });
    onUpdateWithdrawPrivacyErrors({ error: [error.message] });
    onUpdateDepositPrivacyErrors({ error: [error.message] });
  }

  handleValidateCurrencyFee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      toggleLoading,
      web3
    } = this.props;
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );
    const balance = _get(sendTokenForm, [
      SEND_TOKEN_FIELDS.TOKEN,
      PORTFOLIO_COLUMNS.BALANCE
    ]);
    const remainBalance = subBN(
      web3.utils.toBN(balance),
      addBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        feeObj.amount,
        decimals
      ),
      decimals
    );

    if (
      balance ===
      decimalsToBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        decimals
      )
    ) {
      const remainAmount = subBN(
        web3.utils.toBN(balance),
        feeObj.amount,
        decimals
      );

      if (web3.utils.toBN(decimalsToBN(remainAmount, decimals)).isNeg()) {
        this.handleConfirmationError(
          formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY
          )
        );
      } else {
        toggleLoading(false);
        onUpdateSendTokenInput(
          SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          removeTrailingZero(remainAmount)
        );
        onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
        onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
      }
    } else if (web3.utils.toBN(decimalsToBN(remainBalance, decimals)).isNeg()) {
      this.handleConfirmationError(
        formatMessage(
          MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY
        )
      );
    } else {
      toggleLoading(false);
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    }
  }

  handleValidateTrc20Fee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      toggleLoading,
      wallet,
      web3
    } = this.props;
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );
    const remainBalance = subBN(
      web3.utils.toBN(_get(wallet, "balance")),
      feeObj.amount,
      decimals
    );

    if (web3.utils.toBN(decimalsToBN(remainBalance, decimals)).isNeg()) {
      this.handleConfirmationError(
        formatMessage(
          MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY
        )
      );
    } else {
      toggleLoading(false);
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    }
  }

  handleValidateTrc21Fee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      toggleLoading,
      web3
    } = this.props;
    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );
    const balance = _get(sendTokenForm, [
      SEND_TOKEN_FIELDS.TOKEN,
      PORTFOLIO_COLUMNS.BALANCE
    ]);

    const remainBalance = subBN(
      web3.utils.toBN(balance),
      addBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        feeObj.amount,
        decimals
      ),
      decimals
    );

    if (
      balance ===
      decimalsToBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        decimals
      )
    ) {
      toggleLoading(false);
      const remainAmount = subBN(
        web3.utils.toBN(balance),
        feeObj.amount,
        decimals
      );
      onUpdateSendTokenInput(
        SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
        removeTrailingZero(remainAmount)
      );
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    } else if (web3.utils.toBN(decimalsToBN(remainBalance, decimals)).isNeg()) {
      this.handleConfirmationError(
        formatMessage(
          MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY
        )
      );
    } else {
      toggleLoading(false);
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    }
  }

  handleValidatePrivacyFee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      toggleLoading,
      web3,
    } = this.props;
    const balance = _get(sendTokenForm, [
      SEND_TOKEN_FIELDS.TOKEN,
      PORTFOLIO_COLUMNS.BALANCE
    ]);

    const decimals = _get(
      sendTokenForm,
      [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );

    const remainBalance = subBN(
      web3.utils.toBN(balance),
      addBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT], 0),
        feeObj.amount.toString(),
        decimals
      ),
      decimals
    );

    if (
      balance === decimalsToBN(
        _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
        decimals
      )
    ) {
      toggleLoading(false);
      const remainAmount = subBN(
        web3.utils.toBN(balance),
        feeObj.amount,
        decimals
      );
      onUpdateSendTokenInput(
        SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
        removeTrailingZero(remainAmount)
      );
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    } else if (web3.utils.toBN(decimalsToBN(remainBalance, decimals)).isNeg()) {
      this.handleConfirmationError(
        formatMessage(
          MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY
        )
      );
    } else {
      toggleLoading(false);
      onUpdateSendTokenInput(SEND_TOKEN_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateSendTokenPopupStage(SEND_TOKEN_STAGES.CONFIRMATION);
    }
	}
	
	handleValidateDepositFee(feeObj) {
    const {
      intl: { formatMessage },
			onUpdateDepositPrivacyInput,
		  onUpdateDepositPrivacyPopupStage,
      depositForm,
      toggleLoading,
      wallet,
      web3,
    } = this.props;
    // const balance = _get(wallet, 'balance', 0);

    const decimals = _get(
      depositForm,
      [DEPOSIT_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );
    const balance =  decimalsToBN(
      _get(wallet, 'balance', 0),
      decimals
    )

    const remainBalance = subBN(
      web3.utils.toBN(balance),
      addBN(
        _get(depositForm, [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
        feeObj.amount,
        decimals
      ),
      decimals
    );

    if (
      balance === decimalsToBN(
        _get(depositForm, [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
        decimals
      )
    ) {
      toggleLoading(false);
      const remainAmount = subBN(
        web3.utils.toBN(balance),
        feeObj.amount,
        decimals
      );
      onUpdateDepositPrivacyInput(
        DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT,
        removeTrailingZero(remainAmount)
      );
      onUpdateDepositPrivacyInput(DEPOSIT_PRIVACY_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateDepositPrivacyPopupStage(DEPOSIT_STAGES.CONFIRMATION);
    } else if (web3.utils.toBN(decimalsToBN(remainBalance, decimals)).isNeg()) {
      this.handleConfirmationError(
        formatMessage(
          MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY
        )
      );
    } else {
      toggleLoading(false);
      onUpdateDepositPrivacyInput(DEPOSIT_PRIVACY_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateDepositPrivacyPopupStage(DEPOSIT_STAGES.CONFIRMATION);
    }
  }

	handleValidateWithdrawFee(feeObj) {
    const {
      intl: { formatMessage },
      onUpdateWithdrawPrivacyInput,
      onUpdateWithdrawPrivacyPopupStage,
      withdrawForm,
      depositForm,
      toggleLoading,
      wallet,
      web3,
    } = this.props;

    const balance = _get(withdrawForm, [
      WITHDRAW_PRIVACY_FIELDS.TOKEN,
      PORTFOLIO_COLUMNS.BALANCE
    ]);

    const decimals = _get(
      withdrawForm,
      [WITHDRAW_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.DECIMALS],
      0
    );

    const remainBalance = subBN(
      web3.utils.toBN(balance),
      addBN(
        _get(depositForm, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
        feeObj.amount,
        decimals
      ),
      decimals
    );

    if (
      balance === decimalsToBN(
        _get(depositForm, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
        decimals
      )
    ) {
      toggleLoading(false);
      const remainAmount = subBN(
        web3.utils.toBN(balance),
        feeObj.amount,
        decimals
      );
      onUpdateWithdrawPrivacyInput(
        WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT,
        removeTrailingZero(remainAmount)
      );
      onUpdateWithdrawPrivacyInput(WITHDRAW_PRIVACY_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateWithdrawPrivacyPopupStage(WITHDRAW_STAGES.CONFIRMATION);
    } else if (web3.utils.toBN(decimalsToBN(remainBalance, decimals)).isNeg()) {
      this.handleConfirmationError(
        formatMessage(
          MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY
        )
      );
    } else {
      toggleLoading(false);
      onUpdateWithdrawPrivacyInput(WITHDRAW_PRIVACY_FIELDS.TRANSACTION_FEE, feeObj);
      onUpdateWithdrawPrivacyPopupStage(WITHDRAW_STAGES.CONFIRMATION);
    }
  }

  handleValidationSendForm() {
    const {
      intl: { formatMessage },
      sendTokenForm,
      privacyMode,
    } = this.props;
    const {
      isWalletAddress,
      isMaxLength,
      isMaxNumber,
      isMinNumber,
      isRequired,
      isPrivacyWallet,
    } = validations;

    const errorList = mergeErrors([
      isRequired(
        {
          name: SEND_TOKEN_FIELDS.TOKEN,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TOKEN])
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_TOKEN_REQUIRED)
      ),
      isRequired(
        {
          name: SEND_TOKEN_FIELDS.RECIPIENT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT])
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_REQUIRED)
      ),
      !privacyMode ?
        isPrivacyWallet(
          {
            name: SEND_TOKEN_FIELDS.RECIPIENT,
            value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT])
          },
          formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_PRIVACY_RECIPIENT_INVALID)
        )
        :
        isWalletAddress(
          {
            name: SEND_TOKEN_FIELDS.RECIPIENT,
            value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.RECIPIENT])
          },
          formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_INVALID)
      ),
      isRequired(
        {
          name: SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT])
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_REQUIRED)
      ),
      isMaxNumber(
        {
          name: SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
          max: parseFloat(
            privacyMode ? 
              _get(sendTokenForm, [
                SEND_TOKEN_FIELDS.TOKEN,
                PORTFOLIO_COLUMNS.BALANCE
              ])
              :
              bnToDecimals(
                _get(sendTokenForm, [
                  SEND_TOKEN_FIELDS.TOKEN,
                  PORTFOLIO_COLUMNS.BALANCE
                ]),
                _get(sendTokenForm, [
                  SEND_TOKEN_FIELDS.TOKEN,
                  PORTFOLIO_COLUMNS.DECIMALS
                ])
              )
            )
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID)
      ),
      isMinNumber(
        {
          name: SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT]),
          min: 0
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID)
      ),
      isMaxLength(
        {
          name: SEND_TOKEN_FIELDS.MESSAGE,
          value: _get(sendTokenForm, [SEND_TOKEN_FIELDS.MESSAGE]),
          max: 255
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_MESSAGE_MAXLENGTH)
      )
    ]);

    return errorList;
  }

  handleValidationWithdrawPrivacyForm() {
    const {
      intl: { formatMessage },
      withdrawForm,
    } = this.props;
    const {
      isMaxNumber,
      isMinNumber,
      isRequired,
    } = validations;

    const errorList = mergeErrors([
      isRequired(
        {
          name: WITHDRAW_PRIVACY_FIELDS.TOKEN,
          value: _get(withdrawForm, [WITHDRAW_PRIVACY_FIELDS.TOKEN])
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_TOKEN_REQUIRED)
      ),
      isRequired(
        {
          name: WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT,
          value: _get(withdrawForm, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT])
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_REQUIRED)
      ),
      isMaxNumber(
        {
          name: WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT,
          value: _get(withdrawForm, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
          max: parseFloat(
              bnToDecimals(
                _get(withdrawForm, [
                  WITHDRAW_PRIVACY_FIELDS.TOKEN,
                  PORTFOLIO_COLUMNS.BALANCE
                ]),
                _get(withdrawForm, [
                  WITHDRAW_PRIVACY_FIELDS.TOKEN,
                  PORTFOLIO_COLUMNS.DECIMALS
                ])
              )
            )
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID)
      ),
      isMinNumber(
        {
          name: WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT,
          value: _get(withdrawForm, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
          min: 0
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID)
      )
    ]);

    return errorList;
  }

  handleValidationDepositPrivacyForm() {
    const {
      intl: { formatMessage },
      wallet,
      depositForm,
    } = this.props;
    const {
      isMaxNumber,
      isMinNumber,
      isRequired,
    } = validations;

    const errorList = mergeErrors([
      isRequired(
        {
          name: DEPOSIT_PRIVACY_FIELDS.TOKEN,
          value: _get(depositForm, [DEPOSIT_PRIVACY_FIELDS.TOKEN])
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_TOKEN_REQUIRED)
      ),
      isRequired(
        {
          name: DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT,
          value: _get(depositForm, [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT])
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_REQUIRED)
      ),
      // isMaxNumber(
      //   {
      //     name: DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT,
      //     value: _get(depositForm, [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
      //     max: parseFloat(
      //         bnToDecimals(
      //           _get(wallet, 'balance', 0),
      //           _get(depositForm, [
      //             DEPOSIT_PRIVACY_FIELDS.TOKEN,
      //             PORTFOLIO_COLUMNS.DECIMALS
      //           ])
      //         )
      //       )
      //   },
      //   formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID)
      // ),
      isMinNumber(
        {
          name: DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT,
          value: _get(depositForm, [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
          min: 0
        },
        formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID)
      )
    ]);

    return errorList;
  }

  render() {
    const {
      intl: { formatMessage },
      onSetTableType,
      onToggleReceiveTokenPopup,
      onToggleSuccessPopup,
      onUpdateSendTokenInput,
      onUpdateSendTokenPopupStage,
      sendTokenForm,
      sendToKenPopup,
      successPopup,
      tableType,
      tokenOptions,
			wallet,
      depositPrivacyPopup,
      onUpdateDepositPrivacyInput,
      depositForm,
      onUpdateDepositPrivacyPopupStage,
      onToggleSuccessDepositPopup,
      successDepositPopup,
      withdrawPrivacyPopup,
      withdrawForm,
      onUpdateWithdrawPrivacyInput,
      onToggleSuccessWithdrawPopup,
      successWithdrawPopup,
      onUpdateWithdrawPrivacyPopupStage,
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{formatMessage(MSG.MY_WALLET_TITLE)}</title>
        </Helmet>
        <AddressInfo
          openReceiveTokenPopup={() => onToggleReceiveTokenPopup(true)}
          openSendTokenPopup={this.handleOpenSendTokenPopup}
          wallet={wallet}
        />
        <DataTables
          openReceiveTokenPopup={() => onToggleReceiveTokenPopup(true)}
					openSendTokenPopup={this.handleOpenSendTokenPopup}
          openDepositPrivacyPopup={this.handleOpenDepositPrivacyPopup}
          openWithdrawPrivacyPopup={this.handleOpenWithdrawPrivacyPopup}
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
            ""
          )}
        />
        <ReceiveTokenPopup />
				<DepositPrivacyPopup
          addFullAmount={this.handleAddFullAmount}
          closePopup={this.handleCloseDepositPrivacyPopup}
          confirmBeforeDeposit={this.handleConfirmBeforeDeposit}
          formValues={depositForm}
          popupData={depositPrivacyPopup}
          submitDeposit={this.handleGetDepositAction}
          tokenOptions={tokenOptions}
          updateInput={onUpdateDepositPrivacyInput}
					updateDepositPrivacyPopupStage={onUpdateDepositPrivacyPopupStage}
        />
        <SuccessDepositPopup
        amount={_get(depositForm, [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT])}
        togglePopup={onToggleSuccessDepositPopup}
        successDepositPopup={successDepositPopup}
        symbol={_get(
          depositForm,
          [DEPOSIT_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.SYMBOL],
          ""
        )}
        />
        <WithdrawPopup
          addFullAmount={this.handleWithdrawFullAmount}
          closePopup={this.handleCloseWithdrawPrivacyPopup}
          confirmBeforeSend={this.handleConfirmBeforeWithdraw}
          formValues={withdrawForm}
          popupData={withdrawPrivacyPopup}
          submitWithdraw={this.handleGetWithdrawAction}
          tokenOptions={tokenOptions}
          updateInput={onUpdateWithdrawPrivacyInput}
					updateWithdrawPrivacyPopupStage={onUpdateWithdrawPrivacyPopupStage}
        />
        <SuccessWithdrawPopup
        amount={_get(depositForm, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT])}
        togglePopup={onToggleSuccessWithdrawPopup}
        successWithdrawPopup={successWithdrawPopup}
        symbol={_get(
          depositForm,
          [WITHDRAW_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.SYMBOL],
          ""
        )}
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
	/** Action to show/hide deposit privacy popup */
  onToggleDepositPrivacyPopup: PropTypes.func,
  /** Action to handle input change in deposit privacy form */
  onUpdateDepositPrivacyInput: PropTypes.func,
  /** Deposit privacy popup's form values */
  depositForm: PropTypes.object,
  /** Action to show/hide deposit success popup */
  onToggleSuccessDepositPopup: PropTypes.func,
  /** Deposit success popup's data */
  successDepositPopup: PropTypes.object,
  /** Action to show/hide withdraw privacy popup */
  onToggleWithdrawPrivacyPopup: PropTypes.func,
  /** Withdraw privacy popup's data */
  withdrawPrivacyPopup: PropTypes.object,
  /** Action to handle input change in withdraw form */
  onUpdateWithdrawPrivacyInput: PropTypes.func,
  /** Action to store withdraw privacy form errors */
  onUpdateWithdrawPrivacyErrors: PropTypes.func,
    /** Action to store deposit privacy form errors */
    onUpdateDepositPrivacyErrors: PropTypes.func,
  /** Action to show/hide withdraw success popup */
  onToggleSuccessWithdrawPopup: PropTypes.func,
  /** Withdraw success popup's data */
  successWithdrawPopup: PropTypes.object,
};

MyWallet.defaultProps = {
  intl: {},
  onResetSendTokenForm: () => {},
  onResetState: () => {},
  onSetTableType: () => {},
  onToggleReceiveTokenPopup: () => {},
  onToggleSendTokenPopup: () => {},
  onToggleSuccessPopup: () => {},
  onUpdateSendTokenErrors: () => {},
  onUpdateSendTokenInput: () => {},
  onUpdateSendTokenPopupStage: () => {},
  sendTokenForm: {},
  sendToKenPopup: {},
  successPopup: {},
  tableType: LIST.MY_WALLET_TABLE_TYPES[0].value,
  toggleLoading: () => {},
  tokenOptions: [],
	wallet: {},
	onToggleDepositPrivacyPopup: () => {},
  depositPrivacyPopup: {},
  onUpdateDepositPrivacyInput: () => {},
  depositForm: {},
  onToggleSuccessDepositPopup: () => {},
  successDepositPopup: {},
  onToggleWithdrawPrivacyPopup: () => {},
  withdrawPrivacyPopup: {},
  onUpdateWithdrawPrivacyInput: () => {},
  onUpdateWithdrawPrivacyErrors: () => {},
  onUpdateDepositPrivacyErrors: () => {},
  onToggleWithdrawPrivacyPopup: () => {},
  successWithdrawPopup: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    sendTokenForm: selectSendTokenForm,
    sendToKenPopup: selectSendTokenPopup,
    successPopup: selectSuccessPopup,
    tableType: selectTableType,
    tokenOptions: selectTokenOptions,
		wallet: selectWallet,
    depositPrivacyPopup: selectDepositPrivacyPopup,
    depositForm: selectDepositPrivacyForm,
    successDepositPopup: selectSuccessDepositPopup,
    privacyMode: selectPrivacyMode,
    withdrawPrivacyPopup: selectWithdrawPrivacyPopup,
    withdrawForm: selectWithdrawPrivacyForm,
    successWithdrawPopup: selectSuccessWithdrawPopup,
  });
const mapDispatchToProps = dispatch => ({
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
	onUpdatePrivacyData: wallet => dispatch(updatePrivacyData(wallet)),
  onToggleDepositPrivacyPopup: (bool, initialValues) => dispatch(toggleDepositPrivacyPopup(bool, initialValues)),
  onUpdateDepositPrivacyInput: (name, value) => dispatch(updateDepositPrivacyInput(name, value)),
  onUpdateDepositPrivacyPopupStage: stage => dispatch(updateDepositPrivacyPopupStage(stage)),
  onToggleSuccessDepositPopup: (bool, hash) => dispatch(toggleSuccessDepositPopup(bool, hash)),
  onToggleWithdrawPrivacyPopup: (bool, initialValues) => dispatch(toggleWithdrawPrivacyPopup(bool, initialValues)),
  onUpdateWithdrawPrivacyInput: (name, value) => dispatch(updateWithdrawPrivacyInput(name, value)),
  onUpdateWithdrawPrivacyErrors: errors => dispatch(updateWithdrawPrivacyErrors(errors)),
  onUpdateDepositPrivacyErrors: errors => dispatch(updateDepositPrivacyErrors(errors)),
  onToggleSuccessWithdrawPopup: (bool, hash) => dispatch(toggleSuccessWithdrawPopup(bool, hash)),
  onUpdateWithdrawPrivacyPopupStage: stage => dispatch(updateWithdrawPrivacyPopupStage(stage)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

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
  withGlobal
)(MyWallet);
