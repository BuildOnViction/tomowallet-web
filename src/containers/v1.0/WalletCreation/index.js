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
import Verification from './subcomponents/Verification';
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
      errors,
      formState,
      keyView,
      mnemonic,
      onAddWord,
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
      <Fragment>
        {(formState === FORM_STATES.WARNING && (
          <Warning setFormState={onSetFormState} />
        )) ||
          (formState === FORM_STATES.RECOVERY_PHRASE && (
            <RecoveryPhrase
              mnemonic={_get(mnemonic, 'origin')}
              setFormState={onSetFormState}
              setPrivateKey={onSetPrivateKey}
              storeMnemonic={onStoreMnemonic}
              toggleKeyViewPopup={onToggleKeyViewPopup}
              toggleConfirmationPopup={onToggleConfirmationPopup}
            />
          )) ||
          (formState === FORM_STATES.VERIFICATION && (
            <Verification
              addWord={onAddWord}
              errors={errors}
              mnemonic={mnemonic}
              removeWord={onRemoveWord}
              setFormState={onSetFormState}
              updateErrors={onUpdateErrors}
            />
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
      </Fragment>
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
  /** Action to update error message list */
  onUpdateErrors: PropTypes.func,
};

WalletCreationPage.defaultProps = {
  confirmation: {},
  errors: [],
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
  onUpdateErrors: () => {},
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
  onRemoveWord: index => dispatch(removeWord(index)),
  onResetState: () => dispatch(resetState()),
  onSetFormState: newState => dispatch(setFormState(newState)),
  onSetPrivateKey: key => dispatch(setPrivateKey(key)),
  onStoreMnemonic: mnemonic => dispatch(storeMnemonic(mnemonic)),
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
)(WalletCreationPage);
