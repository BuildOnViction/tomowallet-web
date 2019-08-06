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
// Custom Component
import Warning from './subcomponents/Warning';
import RecoveryPhrase from './subcomponents/RecoveryPhrase';
import ConfirmationPopup from './subcomponents/popups/ConfirmationPopup';
// Utilities
import {
  selectFormState,
  selectMnemonic,
  selectCompare,
  selectIsConfirmed,
} from './selectors';
import {
  addWord,
  removeWord,
  resetState,
  setFormState,
  storeMnemonic,
  toggleConfirmationPopup,
} from './actions';
import reducer from './reducer';
import { withIntl } from '../../../components/IntlProvider';
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
      formState,
      isConfirmed,
      mnemonic,
      onSetFormState,
      onStoreMnemonic,
      onToggleConfirmationPopup,
    } = this.props;

    return (
      <Fragment>
        {(formState === FORM_STATES.WARNING && (
          <Warning setFormState={onSetFormState} />
        )) ||
          (formState === FORM_STATES.RECOVERY_PHRASE && (
            <RecoveryPhrase
              mnemonic={mnemonic}
              setFormState={onSetFormState}
              storeMnemonic={onStoreMnemonic}
              toggleConfirmationPopup={onToggleConfirmationPopup}
            />
          ))}
        <ConfirmationPopup
          isOpen={isConfirmed}
          setFormState={onSetFormState}
          toggleConfirmationPopup={onToggleConfirmationPopup}
        />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WalletCreationPage.propTypes = {
  /** Current form state */
  formState: PropTypes.number,
  /** Condition flag to show/hide recovery phrase confirmation popup */
  isConfirmed: PropTypes.bool,
  /** Generated recovery phrase (a string of 12 words) */
  mnemonic: PropTypes.string,
  /** Action to store generated mnemonic into state */
  onStoreMnemonic: PropTypes.func,
  /** Action to set new form state */
  onSetFormState: PropTypes.func,
  /** Action to toggle recovery phrase confirmation popup */
  onToggleConfirmationPopup: PropTypes.func,
};

WalletCreationPage.defaultProps = {
  formState: 0,
  mnemonic: '',
  onStoreMnemonic: () => {},
  onSetFormState: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    compare: selectCompare,
    formState: selectFormState,
    isConfirmed: selectIsConfirmed,
    mnemonic: selectMnemonic,
  });
const mapDispatchToProps = dispatch => ({
  onAddWord: word => dispatch(addWord(word)),
  onRemoveWord: index => dispatch(removeWord(index)),
  onResetState: () => dispatch(resetState()),
  onStoreMnemonic: mnemonic => dispatch(storeMnemonic(mnemonic)),
  onSetFormState: newState => dispatch(setFormState(newState)),
  onToggleConfirmationPopup: bool => dispatch(toggleConfirmationPopup(bool)),
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
