/**
 *
 * TomoWallet - Wallet Creation Page
 *
 * This component defines a wizard form for users to create their new wallet,
 * using a randomly generated mnemonic phrase
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { get as _get, isEqual as _isEqual } from 'lodash';
// Custom Component
import Warning from './subcomponents/Warning';
import RecoveryPhrase from './subcomponents/RecoveryPhrase';
import Verification from './subcomponents/Verification';
import SuccessNotification from './subcomponents/Success';
import ConfirmationPopup from './subcomponents/popups/ConfirmationPopup';
import KeyViewPopup from './subcomponents/popups/KeyViewPopup';
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
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { injectReducer, generateWeb3, getWalletInfo } from '../../../utils';
import { FORM_STATES, DOMAIN_KEY } from './constants';
import { MSG } from '../../../constants';
import { storeWallet } from '../../Global/actions';
import { ContainerMin } from '../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class WalletCreationPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      test: '',
    };

    this.handleVerifyMnemonic = this.handleVerifyMnemonic.bind(this);
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleVerifyMnemonic() {
    const {
      intl: { formatMessage },
      mnemonic,
      onClearComparison,
      onSetFormState,
      onStoreWallet,
      onUpdateErrors,
      rpcServer,
      updateWeb3,
    } = this.props;

    if (
      _isEqual(
        _get(mnemonic, 'origin'),
        _get(mnemonic, 'compare', []).join(' '),
      )
    ) {
      const newWeb3 = generateWeb3(_get(mnemonic, 'origin'), rpcServer);
      const address = newWeb3.currentProvider.addresses[0];

      console.warn('getBalance', newWeb3, address);

      newWeb3.eth.getBalance(address, console.error);

      Promise.all([getWalletInfo(newWeb3)]).then(result => {
        console.warn('result', result);
      });
      // getWalletInfo(newWeb3).then(newWalletInfo =>
      //   Promise.all([onStoreWallet(newWalletInfo), updateWeb3(newWeb3)]).then(
      //     () => onSetFormState(FORM_STATES.SUCCESS),
      //   ),
      // );
    } else {
      onUpdateErrors([formatMessage(MSG.VERIFICATION_ERROR_VERIFY_FAILED)]);
      onClearComparison();
    }
  }

  render() {
    const {
      confirmation,
      errors,
      formState,
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
    console.warn('render', this.state);

    return (
      <ContainerMin>
        {(formState === FORM_STATES.WARNING && (
          <Warning
            setFormState={onSetFormState}
            setPrivateKey={onSetPrivateKey}
            storeMnemonic={onStoreMnemonic}
          />
        )) ||
          (formState === FORM_STATES.RECOVERY_PHRASE && (
            <RecoveryPhrase
              mnemonic={_get(mnemonic, 'origin')}
              setFormState={onSetFormState}
              toggleKeyViewPopup={onToggleKeyViewPopup}
              toggleConfirmationPopup={onToggleConfirmationPopup}
            />
          )) ||
          (formState === FORM_STATES.VERIFICATION && (
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
          )) ||
          (formState === FORM_STATES.SUCCESS && <SuccessNotification />)}
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
      </ContainerMin>
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
)(WalletCreationPage);
