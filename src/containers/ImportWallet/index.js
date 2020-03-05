/**
 *
 * TomoWallet - Import Wallet Page
 *
 */
// Modules
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import _get from "lodash.get";
import _isEmpty from "lodash.isempty";
import {
  CardBody,
  Row,
  Col,
  CardHeader,
  CardImg,
  CardText,
  CardFooter,
  Card,
} from "reactstrap";
import { Helmet } from "react-helmet";
// Custom Components
import {
  CustomContainer,
  ButtonStyler,
  HeadingLarge,
  TextBlue,
  ImporWalletStyler,
} from "../../styles";
import LedgerForm from "./subcomponents/LedgerForm";
import MetaMaskForm from "./subcomponents/MetaMaskForm";
import RPOrPKForm from "./subcomponents/RPOrPKForm";
import KeystoreForm from "./subcomponents/KeystoreForm";
import AddressPopup from "./subcomponents/AddressPopup";
// Utilities, Constants & Styles
import { IMPORT_TYPES, DOMAIN_KEY, KEY_INPUT_TYPE } from "./constants";
import { selectAddressPopup, selectImportState } from "./selectors";
import {
  resetState,
  updateErrors,
  updateImportType,
  updateInput,
  loadWalletAddresses,
  toggleAddressPopup,
  updateChosenWallet
} from "./actions";
import reducer from "./reducer";
import { ROUTE, MSG, ENUM, RPC_SERVER } from "../../constants";
import {
  injectReducer,
  createWeb3,
  setWeb3Info,
  withGlobal,
  validations,
  getBalance,
  removeWeb3Info,
  isElectron,
  isRecoveryPhrase,
  isHDPath,
  isPrivateKey,
  removeKeystore,
  selectHDPath,
  getNetwork,
  getWalletInfo,
  encryptKeystore,
  mnemonicToPrivateKey,
  trimMnemonic,
  getPrivacyAddressInfo,
} from "../../utils";
import { withWeb3 } from "../../components/Web3";
import { withIntl } from "../../components/IntlProvider";
import { storeWallet, storePrivacyWallet } from "../Global/actions";
import { updatePrivacyBalance } from '../MyWallet/actions';
import LogoLedger from "../../assets/images/logo-ledger.svg";
import LogoMetaMask from "../../assets/images/logo-metamask.png";
import LogoKey from "../../assets/images/logo-key.png";
import { writeRPFile } from "../../utils/electron";
import { Wrapper } from './style';

// ===== MAIN COMPONENT =====
class ImportWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.LEDGER_WALLET_LIMIT = 5;

    this.handleAccessByLedger = this.handleAccessByLedger.bind(this);
    this.handleAccessByRecoveryPhrase = this.handleAccessByRecoveryPhrase.bind(
      this
    );
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleGetLedgerAddresses = this.handleGetLedgerAddresses.bind(this);
    this.handleUpdateError = this.handleUpdateError.bind(this);
  }
  componentDidMount () {
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleAccessByLedger() {
    const { addressPopup, importWallet, onStoreWallet } = this.props;
    const chosenWallet = _get(addressPopup, [
      "wallets",
      _get(addressPopup, "chosenIndex")
    ]);
    const serverConfig = _get(RPC_SERVER, [getNetwork()], {});

    if (chosenWallet) {
      getBalance(chosenWallet.address, serverConfig).then(balance => {
        const walletInfo = {
          address: chosenWallet.address,
          balance
        };
        onStoreWallet(walletInfo);
        removeWeb3Info();
        setWeb3Info({
          loginType: ENUM.LOGIN_TYPE.LEDGER,
          address: chosenWallet.address,
          hdPath: `${_get(importWallet, "input.hdPath")}/${_get(
            addressPopup,
            "chosenIndex"
          )}`
        });
        if (isElectron()) {
          removeKeystore().then(
            ({ error }) => error && this.handleUpdateError(error.message)
          );
        }
      });
    }
  }

  handleAccessByRecoveryPhrase(accessType) {
    const {
      history,
      importWallet,
      intl: { formatMessage },
      onStoreWallet,
      rpcServer,
      toggleLoading,
      updateWeb3,
      onStorePrivacyWallet,
      onLoadPrivacyBalance
    } = this.props;
    const formValues = _get(importWallet, "input", {});
    const keyInputType = _get(
      importWallet,
      "keyInputType",
      KEY_INPUT_TYPE.PRIVATE_KEY
    );
    let errorList = {};

    // Validate form inputs
    if (keyInputType === KEY_INPUT_TYPE.PRIVATE_KEY) {
      errorList = {
        ...(!isPrivateKey(formValues.privateKey)
          ? {
              privateKey: [
                formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_PRIVATE_KEY)
              ]
            }
          : {})
      };
    } else if (keyInputType === KEY_INPUT_TYPE.RECOVERY_PHRASE) {
      errorList = {
        ...(!isRecoveryPhrase(formValues.recoveryPhrase)
          ? {
              recoveryPhrase: [
                formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_RECOVERY_PHRASE)
              ]
            }
          : {}),
        ...this.handleValidateHDPath()
      };
    }

    if (_isEmpty(errorList)) {
        // Create Web3 provider & store wallet data into state if form validation is passed.
        try {
            toggleLoading(true);
            const accessKey = trimMnemonic(
                formValues.recoveryPhrase || formValues.privateKey
            );
            const hdPath = _get(importWallet, "input.hdPath", "");
            const isTestnet = getNetwork() === ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;
            const updatedRpcServer = hdPath ?
                {
                    ...rpcServer,
                    hdPath
                } :
                rpcServer;
            const newWeb3 = createWeb3(accessKey, updatedRpcServer);
            updateWeb3(newWeb3);

            getWalletInfo(newWeb3)
                .then(walletInfo => {
                    onStoreWallet(walletInfo);

                    // get privacy address
                    const privacyObject = getPrivacyAddressInfo(
                      walletInfo.address,
                      isPrivateKey(accessKey) ? accessKey: mnemonicToPrivateKey(accessKey, updatedRpcServer),
                      updatedRpcServer,
                      isTestnet
                    );
                    // listen privacy events
                    privacyObject.privacyWallet.on("NEW_UTXO", (utxo) => {
                      let isExisted = privacyObject.privacyWallet.utxos.find((element) => {
                        return element["3"] === utxo["3"] || parseInt(element["3"]) === parseInt(utxo["3"])
                      })
                      if (!isExisted) {
                        privacyObject.privacyWallet.utxos.push(utxo)
                        privacyObject.privacyWallet.balance = privacyObject.privacyWallet._calTotal(privacyObject.privacyWallet.utxos)
                        onLoadPrivacyBalance(privacyObject.privacyWallet.balance.toString(10))
                      }
                  })
                    
                  onStorePrivacyWallet(privacyObject)

                    setWeb3Info({
                        loginType: ENUM.LOGIN_TYPE.PRIVATE_KEY,
                        recoveryPhrase: accessKey,
                        address: walletInfo.address,
                        ...(hdPath ?
                            {
                                hdPath
                            } :
                            {})
                    });
                })
                .then(() => {
                    if (isElectron() && accessType !== "keystore") {
                        // Specific handle in Electron app:
                        // Store encrypted wallet key into temporary file for quick access
                        const privKey = formValues.recoveryPhrase ?
                            mnemonicToPrivateKey(formValues.recoveryPhrase, rpcServer) :
                            formValues.privateKey;
                        removeKeystore().then(
                            ({
                                error
                            }) => error && this.handleUpdateError(error.message)
                        );
                        writeRPFile(
                            JSON.stringify(encryptKeystore(privKey, "recoveryPhrase"))
                        ).then(
                            ({
                                error
                            }) => error && this.handleUpdateError(error.message)
                        );
                    }
                    toggleLoading(false);
                    history.push(ROUTE.MY_WALLET);
                });
        } catch (error) {
            this.handleUpdateError(error.message);
        }
    } else {
        this.handleUpdateError(errorList);
    }
  }

  handleChangeType(newType) {
    const { onUpdateImportType } = this.props;
    onUpdateImportType(newType);
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  handleGetLedgerAddresses() {
    const {
      importWallet,
      onLoadWalletAddresses,
      onUpdateErrors,
      toggleLoading,
      web3
    } = this.props;
    const hdPath = _get(importWallet, "input.hdPath", "");
    const errorList = this.handleValidateHDPath();

    if (!_isEmpty(errorList)) {
      onUpdateErrors(Object.values(errorList));
    } else {
      toggleLoading(true);
      onUpdateErrors([]);
      selectHDPath(web3, hdPath)
        .then(wallets => {
          toggleLoading(false);
          onLoadWalletAddresses(wallets);
        })
        .catch(error => this.handleUpdateError(error.message));
    }
  }

  handleValidateHDPath() {
    const {
      importWallet,
      intl: { formatMessage }
    } = this.props;
    const { isRequired } = validations;

    return {
      ...isRequired(
        {
          name: "hdPath",
          value: _get(importWallet, "input.hdPath")
        },
        formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_HD_PATH)
      ),
      ...(!isHDPath(_get(importWallet, "input.hdPath"))
        ? {
            hdPath: [formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_HD_PATH)]
          }
        : {})
    };
  }

  handleUpdateError(error, clientMode) {
    const { importWallet, onUpdateErrors, toggleLoading } = this.props;
    const keyInputType = _get(
      importWallet,
      "keyInputType",
      KEY_INPUT_TYPE.PRIVATE_KEY
    );
    if (!clientMode) {
      toggleLoading(false);
    }
    if (typeof error === "string") {
      const field =
        (keyInputType === KEY_INPUT_TYPE.PRIVATE_KEY && "privateKey") ||
        (keyInputType === KEY_INPUT_TYPE.RECOVERY_PHRASE && "recoveryPhrase");
      if (field) {
        onUpdateErrors({
          [field]: [error]
        });
      }
    } else if (typeof error === "object") {
      onUpdateErrors(error);
    }
  }

  render() {
    const {
      addressPopup,
      importWallet,
      intl: { formatMessage },
      onToggleAddressPopup,
      onUpdateChosenWallet,
      onUpdateInput
    } = this.props;

    return (
      <Wrapper>
        <Helmet>
          <title>{formatMessage(MSG.IMPORT_WALLET_TITLE)}</title>
        </Helmet>
        <CustomContainer size="large">
          <Card>
            <CardHeader>
              <HeadingLarge>
                {formatMessage(MSG.IMPORT_WALLET_HEADER_TITLE)}
              </HeadingLarge>
              <CardText>
                {`${formatMessage(MSG.IMPORT_WALLET_ALTERNATIVE_TEXT)} `}
                <TextBlue
                  role="presentation"
                  onClick={() => this.handleRedirect(ROUTE.CREATE_WALLET)}
                >
                  {formatMessage(MSG.IMPORT_WALLET_ALTERNATIVE_LINK)}
                </TextBlue>
              </CardText>
            </CardHeader>
            <CardBody>
              <Row noGutters>
                <Col className="pr-3">
                  <ImporWalletStyler
                    isActive={
                      _get(importWallet, "type") === IMPORT_TYPES.LEDGER
                    }
                    onClick={() => this.handleChangeType(IMPORT_TYPES.LEDGER)}
                  >
                    <CardImg
                      src={LogoLedger}
                      alt={formatMessage(
                        MSG.IMPORT_WALLET_TAB_LEDGER_IMAGE_ALT
                      )}
                    />
                    <CardText className="mt-3">
                      {formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_TEXT)}
                    </CardText>
                  </ImporWalletStyler>
                </Col>
                {!isElectron() && (
                  <Col className="px-3">
                    <ImporWalletStyler
                      isActive={
                        _get(importWallet, "type") === IMPORT_TYPES.META_MASK
                      }
                      onClick={() =>
                        this.handleChangeType(IMPORT_TYPES.META_MASK)
                      }
                    >
                      <CardImg
                        src={LogoMetaMask}
                        alt={formatMessage(
                          MSG.IMPORT_WALLET_TAB_METAMASK_IMAGE_ALT
                        )}
                      />
                      <CardText className="mt-3">
                        {formatMessage(MSG.IMPORT_WALLET_TAB_METAMASK_TEXT)}
                      </CardText>
                    </ImporWalletStyler>
                  </Col>
                )}
                <Col className="px-3">
                  <ImporWalletStyler
                    isActive={
                      _get(importWallet, "type") === IMPORT_TYPES.RP_OR_PK
                    }
                    onClick={() => this.handleChangeType(IMPORT_TYPES.RP_OR_PK)}
                  >
                    <CardImg
                      src={LogoKey}
                      alt={formatMessage(
                        MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT
                      )}
                    />
                    <CardText className="mt-3">
                      {formatMessage(
                        MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT
                      )}
                    </CardText>
                    <CardText className="text-end small text-danger">
                      {formatMessage(
                        MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_NOT_RECOMMENDED_TEXT
                      )}
                    </CardText>
                  </ImporWalletStyler>
                </Col>
                <Col className="pl-3">
                  <ImporWalletStyler
                    isActive={
                      _get(importWallet, "type") === IMPORT_TYPES.KEYSTORE
                    }
                    onClick={() => this.handleChangeType(IMPORT_TYPES.KEYSTORE)}
                  >
                    <CardImg
                      src={LogoKey}
                      alt={formatMessage(
                        MSG.IMPORT_WALLET_TAB_KEYSTORE_IMAGE_ALT
                      )}
                    />
                    <CardText className="mt-3">
                      {formatMessage(MSG.IMPORT_WALLET_TAB_KEYSTORE_TEXT)}
                    </CardText>
                    <CardText className="text-end small text-danger">
                      {formatMessage(
                        MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_NOT_RECOMMENDED_TEXT
                      )}
                    </CardText>
                  </ImporWalletStyler>
                </Col>
              </Row>
              <Row noGutters className="mt-5">
                <Col>
                  {_get(importWallet, "type") === IMPORT_TYPES.LEDGER && (
                    <LedgerForm
                      errors={_get(importWallet, "errors", [])}
                      formValues={_get(importWallet, "input", {})}
                      updateInput={onUpdateInput}
                    />
                  )}
                  {_get(importWallet, "type") === IMPORT_TYPES.META_MASK && (
                    <MetaMaskForm />
                  )}
                  {_get(importWallet, "type") === IMPORT_TYPES.RP_OR_PK && (
                    <RPOrPKForm
                      handleSubmit={this.handleAccessByRecoveryPhrase}
                    />
                  )}
                  {_get(importWallet, "type") === IMPORT_TYPES.KEYSTORE && (
                    <KeystoreForm
                      accessWallet={this.handleAccessByRecoveryPhrase}
                    />
                  )}
                </Col>
              </Row>
            </CardBody>
            {![IMPORT_TYPES.META_MASK, IMPORT_TYPES.KEYSTORE].includes(
              _get(importWallet, "type")
            ) && (
              <CardFooter>
                <Row>
                  <Col size={6}>
                    <ButtonStyler
                      onClick={() => this.handleRedirect(ROUTE.LOGIN)}
                    >
                      {formatMessage(MSG.COMMON_BUTTON_BACK)}
                    </ButtonStyler>
                  </Col>
                  <Col size={6}>
                    <ButtonStyler
                      btnYellow
                      onClick={
                        _get(importWallet, "type") === IMPORT_TYPES.RP_OR_PK
                          ? this.handleAccessByRecoveryPhrase
                          : this.handleGetLedgerAddresses
                      }
                    >
                      {formatMessage(MSG.COMMON_BUTTON_IMPORT)}
                    </ButtonStyler>
                  </Col>
                </Row>
              </CardFooter>
            )}
          </Card>
          <AddressPopup
            accessByLedger={this.handleAccessByLedger}
            data={addressPopup}
            togglePopup={onToggleAddressPopup}
            updateChosenAddress={onUpdateChosenWallet}
          />
        </CustomContainer>
      </Wrapper>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ImportWallet.propTypes = {
  /** Ledger address popup's data */
  addressPopup: PropTypes.object,
  /** React Router's API object */
  history: PropTypes.object,
  /** Wallet import's data set */
  importWallet: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to save wallet information in global store */
  onStoreWallet: PropTypes.func,
  /** Action to show/hide ledger address popup */
  onToggleAddressPopup: PropTypes.func,
  /** Action to update chosen wallet address */
  onUpdateChosenWallet: PropTypes.func,
  /** Action to set error messages */
  onUpdateErrors: PropTypes.func,
  /** Action to change import tab */
  onUpdateImportType: PropTypes.func,
  /** Action to handle input change */
  onUpdateInput: PropTypes.func,
  /** Action to show/hide loading screen */
  toggleLoading: PropTypes.func,
};

ImportWallet.defaultProps = {
  addressPopup: {},
  history: {},
  importWallet: {},
  intl: {},
  onStoreWallet: () => {},
  onToggleAddressPopup: () => {},
  onUpdateChosenWallet: () => {},
  onUpdateErrors: () => {},
  onUpdateImportType: () => {},
  onUpdateInput: () => {},
  toggleLoading: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    addressPopup: selectAddressPopup,
    importWallet: selectImportState
  });
const mapDispatchToProps = dispatch => ({
  onLoadWalletAddresses: data => dispatch(loadWalletAddresses(data)),
  onResetState: () => dispatch(resetState()),
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
  onToggleAddressPopup: bool => dispatch(toggleAddressPopup(bool)),
  onUpdateChosenWallet: index => dispatch(updateChosenWallet(index)),
  onUpdateErrors: errors => dispatch(updateErrors(errors)),
  onUpdateImportType: type => dispatch(updateImportType(type)),
  onUpdateInput: (name, value) => dispatch(updateInput(name, value)),
  onStorePrivacyWallet: wallet => dispatch(storePrivacyWallet(wallet)),
  onLoadPrivacyBalance: (wallet) => dispatch(updatePrivacyBalance(wallet)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
// ======================

export default compose(
  withConnect,
  withIntl,
  withGlobal,
  withReducer,
  withRouter,
  withWeb3
)(ImportWallet);
