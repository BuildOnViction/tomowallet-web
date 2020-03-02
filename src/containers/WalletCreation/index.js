/**
 *
 * TomoWallet - Wallet Creation Page
 *
 * This component defines a wizard form for users to create their new wallet,
 * using a randomly generated mnemonic phrase
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import { Helmet } from 'react-helmet';
// Custom Component
import Warning from './subcomponents/Warning';
import RecoveryPhrase from './subcomponents/RecoveryPhrase';
import Verification from './subcomponents/Verification';
import SuccessNotification from './subcomponents/Success';
import ConfirmationPopup from './subcomponents/popups/ConfirmationPopup';
import KeyViewPopup from './subcomponents/popups/KeyViewPopup';
import { Wrapper, WalletCreationStyler } from './style';
// Utilities
import {
  selectConfirmationState,
  selectFormState,
  selectKeyViewState,
  selectMnemonic,
  selectErrors,
} from './selectors';
import {
  addWord,
  removeWord,
  resetState,
  setFormState,
  setPrivateKey,
  storeMnemonic,
  toggleConfirmationPopup,
  toggleKeyViewPopup,
  toggleKeyVisibile,
  updateErrors,
  clearComparisonMnemonic,
} from './actions';
import reducer from './reducer';
import { withIntl } from '../../components/IntlProvider';
import { withWeb3 } from '../../components/Web3';
import {
  injectReducer,
  createWeb3,
  getWalletInfo,
  getPrivacyAddressInfo,
  setWeb3Info,
  withGlobal,
  isElectron,
  mnemonicToPrivateKey,
  removeKeystore,
  encryptKeystore,
  getNetwork,
  isPrivateKey
} from '../../utils';
import { FORM_STATES, DOMAIN_KEY } from './constants';
import { MSG, ENUM } from '../../constants';
import { storeWallet, storePrivacyWallet } from '../Global/actions';
import { writeRPFile } from '../../utils/electron';
import { updatePrivacyBalance } from '../MyWallet/actions'
// ===================

// ===== MAIN COMPONENT =====
class WalletCreationPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      storeData: {},
    };

    this.handleStoreWalletData = this.handleStoreWalletData.bind(this);
    this.handleVerifyMnemonic = this.handleVerifyMnemonic.bind(this);
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleStoreWalletData() {
    const { onStoreWallet, updateWeb3 } = this.props;
    const { storeData } = this.state;

    onStoreWallet(_get(storeData, 'walletInfo'));
    updateWeb3(_get(storeData, 'web3'));
    setWeb3Info(_get(storeData, 'web3Info'));
  }

  handleVerifyMnemonic() {
const {
    intl: {
        formatMessage
    },
    mnemonic,
    onClearComparison,
    onSetFormState,
    onUpdateErrors,
    rpcServer,
    toggleLoading,
    onStorePrivacyWallet,
    onLoadPrivacyBalance
} = this.props;
const recoveryPhrase = _get(mnemonic, 'origin');

if (_isEqual(recoveryPhrase, _get(mnemonic, 'compare', []).join(' '))) {
    toggleLoading(true);
    const newWeb3 = createWeb3(recoveryPhrase, rpcServer);
    const isTestnet = getNetwork() === ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;
    getWalletInfo(newWeb3)
        .then(walletInfo => {
            // get privacy address
            const privacyObject = getPrivacyAddressInfo(
              walletInfo.address,
              isPrivateKey(recoveryPhrase) ? recoveryPhrase : mnemonicToPrivateKey(recoveryPhrase, rpcServer),
              rpcServer,
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

          onStorePrivacyWallet(privacyObject);

            this.setState({
                storeData: {
                    walletInfo,
                    web3: newWeb3,
                    web3Info: {
                        loginType: ENUM.LOGIN_TYPE.PRIVATE_KEY,
                        recoveryPhrase,
                        address: walletInfo.address,
                    },
                },
            });
        })
        .then(() => {
            if (isElectron()) {
                const privKey = mnemonicToPrivateKey(recoveryPhrase, rpcServer);
                removeKeystore().then(
                    ({
                        error
                    }) => error && onUpdateErrors([error.message]),
                );
                writeRPFile(
                    JSON.stringify(encryptKeystore(privKey, 'recoveryPhrase')),
                ).then(({
                    error
                }) => error && onUpdateErrors([error.message]));
            }
            toggleLoading(false);
            onSetFormState(FORM_STATES.SUCCESS);
        });
} else {
    toggleLoading(false);
    onUpdateErrors([formatMessage(MSG.VERIFICATION_ERROR_VERIFY_FAILED)]);
    onClearComparison();
}
  }

  render() {
    const {
      confirmation,
      errors,
      formState,
      intl: { formatMessage },
      keyView,
      mnemonic,
      onAddWord,
      onClearComparison,
      onRemoveWord,
      onSetFormState,
      onSetPrivateKey,
      onStoreMnemonic,
      onToggleConfirmationPopup,
      onToggleKeyViewPopup,
      onToggleKeyVisible,
      onUpdateErrors,
    } = this.props;

    return (
      <Wrapper>
        <Helmet>
          <title>{formatMessage(MSG.CREATE_WALLET_TITLE)}</title>
        </Helmet>
        
        {(formState === FORM_STATES.WARNING && (
          <WalletCreationStyler>
            <Warning
              setFormState={onSetFormState}
              setPrivateKey={onSetPrivateKey}
              storeMnemonic={onStoreMnemonic}
            />
          </WalletCreationStyler>
        )) ||
          (formState === FORM_STATES.RECOVERY_PHRASE && (
            <WalletCreationStyler>
              <RecoveryPhrase />
            </WalletCreationStyler>
          )) ||
          (formState === FORM_STATES.VERIFICATION && (
            <WalletCreationStyler>
              <Verification
                addWord={onAddWord}
                clearComparison={onClearComparison}
                errors={errors}
                mnemonic={mnemonic}
                removeWord={onRemoveWord}
                setFormState={onSetFormState}
                updateErrors={onUpdateErrors}
                verifyMnemonic={this.handleVerifyMnemonic}
              />
            </WalletCreationStyler>
          )) ||
          (formState === FORM_STATES.SUCCESS && (
            <WalletCreationStyler size="430px">
              <SuccessNotification
                confirmSuccess={this.handleStoreWalletData}
              />
            </WalletCreationStyler>
          ))}
          <ConfirmationPopup
            confirmation={confirmation}
            setFormState={onSetFormState}
            togglePopup={onToggleConfirmationPopup}
          />
          <KeyViewPopup
            keyView={keyView}
            toggleKeyVisibile={onToggleKeyVisible}
            togglePopup={onToggleKeyViewPopup}
          />
      </Wrapper>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WalletCreationPage.propTypes = {
  /** Recovery phrase confirmation popup's data set */
  confirmation: PropTypes.object,
  /** List of error messages */
  errors: PropTypes.arrayOf(PropTypes.string),
  /** Current form state */
  formState: PropTypes.number,
  /** React Router's API object */
  history: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Private key view popup's data set */
  keyView: PropTypes.object,
  /** Mnemonic data set (including original & comparison mnemonic) */
  mnemonic: PropTypes.shape({
    origin: PropTypes.string,
    compare: PropTypes.arrayOf(PropTypes.string),
  }),
  /** Action to concatenate a word into comparison mnemonic array */
  onAddWord: PropTypes.func,
  /** Action to clear comparison mnemonic array for verification retry */
  onClearComparison: PropTypes.func,
  /** Action to remove a word from a specific index from comparison mnemonic array */
  onRemoveWord: PropTypes.func,
  /** Action to reset all states */
  onResetState: PropTypes.func,
  /** Action to set new form state */
  onSetFormState: PropTypes.func,
  /** Action to store private key converted from generated mnemonic */
  onSetPrivateKey: PropTypes.func,
  /** Action to store generated mnemonic into state */
  onStoreMnemonic: PropTypes.func,
  /** Action to store new wallet data */
  onStoreWallet: PropTypes.func,
  /** Action to toggle recovery phrase confirmation popup */
  onToggleConfirmationPopup: PropTypes.func,
  /** Action to toggle private key view popup */
  onToggleKeyViewPopup: PropTypes.func,
  /** Action to show/hide private key's QR Code */
  onToggleKeyVisible: PropTypes.func,
  /** Action to update error message list */
  onUpdateErrors: PropTypes.func,
  /** Current RPC server configuration */
  rpcServer: PropTypes.object,
  /** Action to show/hide loading screen */
  toggleLoading: PropTypes.func,
  /** Action to set new Web3 object into context */
  updateWeb3: PropTypes.func,
};

WalletCreationPage.defaultProps = {
  history: {},
  intl: {},
  confirmation: {},
  errors: [],
  formState: 0,
  keyView: {},
  mnemonic: {
    origin: '',
    compare: [],
  },
  onAddWord: () => {},
  onClearComparison: () => {},
  onRemoveWord: () => {},
  onResetState: () => {},
  onSetFormState: () => {},
  onSetPrivateKey: () => {},
  onStoreMnemonic: () => {},
  onStoreWallet: () => {},
  onToggleConfirmationPopup: () => {},
  onToggleKeyViewPopup: () => {},
  onToggleKeyVisible: () => {},
  onUpdateErrors: () => {},
  rpcServer: {},
  toggleLoading: () => {},
  updateWeb3: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    confirmation: selectConfirmationState,
    errors: selectErrors,
    formState: selectFormState,
    keyView: selectKeyViewState,
    mnemonic: selectMnemonic,
  });
const mapDispatchToProps = dispatch => ({
  onAddWord: word => dispatch(addWord(word)),
  onClearComparison: () => dispatch(clearComparisonMnemonic()),
  onRemoveWord: index => dispatch(removeWord(index)),
  onResetState: () => dispatch(resetState()),
  onSetFormState: newState => dispatch(setFormState(newState)),
  onSetPrivateKey: key => dispatch(setPrivateKey(key)),
  onStoreMnemonic: mnemonic => dispatch(storeMnemonic(mnemonic)),
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
  onToggleConfirmationPopup: bool => dispatch(toggleConfirmationPopup(bool)),
  onToggleKeyViewPopup: bool => dispatch(toggleKeyViewPopup(bool)),
  onToggleKeyVisible: bool => dispatch(toggleKeyVisibile(bool)),
  onUpdateErrors: errors => dispatch(updateErrors(errors)),
  onStorePrivacyWallet: wallet => dispatch(storePrivacyWallet(wallet)),
  onLoadPrivacyBalance: (wallet) => dispatch(updatePrivacyBalance(wallet)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
// ======================

export default compose(
  withConnect,
  withReducer,
  withIntl,
  withWeb3,
  withRouter,
  withGlobal
)(WalletCreationPage);
