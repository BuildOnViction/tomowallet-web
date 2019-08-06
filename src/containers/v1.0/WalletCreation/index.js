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
import { createStructuredSelector } from 'reselect';
import { get as _get } from 'lodash';
// Custom Component
import Warning from './subcomponents/Warning';
import RecoveryPhrase from './subcomponents/RecoveryPhrase';
import ConfirmationPopup from './subcomponents/popups/ConfirmationPopup';
import KeyViewPopup from './subcomponents/popups/KeyViewPopup';
// Utilities
import {
  selectConfirmationState,
  selectFormState,
  selectKeyViewState,
  selectMnemonic,
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
} from './actions';
import reducer from './reducer';
import { injectReducer } from '../../../utils';
import { FORM_STATES, DOMAIN_KEY } from './constants';
// ===================

// ===== MAIN COMPONENT =====
class WalletCreationPage extends PureComponent {
  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  render() {
    const {
      confirmation,
      formState,
      keyView,
      mnemonic,
      onSetFormState,
      onStoreMnemonic,
      onToggleConfirmationPopup,
      onToggleKeyViewPopup,
      onToggleKeyVisible,
    } = this.props;

    return (
      <Fragment>
        {(formState === FORM_STATES.WARNING && (
          <Warning setFormState={onSetFormState} />
        )) ||
          (formState === FORM_STATES.RECOVERY_PHRASE && (
            <RecoveryPhrase
              mnemonic={_get(mnemonic, 'origin')}
              setFormState={onSetFormState}
              storeMnemonic={onStoreMnemonic}
              toggleConfirmationPopup={onToggleConfirmationPopup}
              toggleKeyViewPopup={onToggleKeyViewPopup}
            />
          ))}
        <ConfirmationPopup
          confirmation={confirmation}
          setFormState={onSetFormState}
          togglePopup={onToggleConfirmationPopup}
        />
        <KeyViewPopup
          keyView={keyView}
          togglePopup={onToggleKeyViewPopup}
          toggleKeyVisibile={onToggleKeyVisible}
        />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WalletCreationPage.propTypes = {
  /** Recovery phrase confirmation popup's data set */
  confirmation: PropTypes.object,
  /** Current form state */
  formState: PropTypes.number,
  /** Private key view popup's data set */
  keyView: PropTypes.object,
  /** Mnemonic data set (including original & comparison mnemonic) */
  mnemonic: PropTypes.shape({
    origin: PropTypes.string,
    compare: PropTypes.arrayOf(PropTypes.string),
  }),
  /** Action to concatenate a word into comparison mnemonic array */
  onAddWord: PropTypes.func,
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
  /** Action to toggle recovery phrase confirmation popup */
  onToggleConfirmationPopup: PropTypes.func,
  /** Action to toggle private key view popup */
  onToggleKeyViewPopup: PropTypes.func,
  /** Action to show/hide private key's QR Code */
  onToggleKeyVisible: PropTypes.func,
};

WalletCreationPage.defaultProps = {
  confirmation: {},
  formState: 0,
  keyView: {},
  mnemonic: {
    origin: '',
    compare: [],
  },
  onAddWord: () => {},
  onRemoveWord: () => {},
  onResetState: () => {},
  onSetFormState: () => {},
  onSetPrivateKey: () => {},
  onStoreMnemonic: () => {},
  onToggleConfirmationPopup: () => {},
  onToggleKeyViewPopup: () => {},
  onToggleKeyVisible: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    confirmation: selectConfirmationState,
    formState: selectFormState,
    keyView: selectKeyViewState,
    mnemonic: selectMnemonic,
  });
const mapDispatchToProps = dispatch => ({
  onAddWord: word => dispatch(addWord(word)),
  onRemoveWord: index => dispatch(removeWord(index)),
  onResetState: () => dispatch(resetState()),
  onSetFormState: newState => dispatch(setFormState(newState)),
  onSetPrivateKey: key => dispatch(setPrivateKey(key)),
  onStoreMnemonic: mnemonic => dispatch(storeMnemonic(mnemonic)),
  onToggleConfirmationPopup: bool => dispatch(toggleConfirmationPopup(bool)),
  onToggleKeyViewPopup: bool => dispatch(toggleKeyViewPopup(bool)),
  onToggleKeyVisible: bool => dispatch(toggleKeyVisibile(bool)),
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
)(WalletCreationPage);
