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
import { createStructuredSelector } from 'reselect';
// Custom Component
import Warning from './subcomponents/Warning';
// Utilities
import { selectFormState } from './selectors';
import { setFormState } from './actions';
import reducer from './reducer';
import { withIntl } from '../../../components/IntlProvider';
import { injectReducer } from '../../../utils';
import { FORM_STATES, DOMAIN_KEY } from './constants';
// ===================

// ===== MAIN COMPONENT =====
class WalletCreationPage extends PureComponent {
  render() {
    const { formState, onSetFormState } = this.props;
    console.warn('render', formState);

    return (
      formState === FORM_STATES.WARNING && (
        <Warning formState={formState} setFormState={onSetFormState} />
      )
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WalletCreationPage.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Current form state */
  formState: PropTypes.number,
  /** Action to set new form state */
  onSetFormState: PropTypes.func,
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    formState: selectFormState,
  });
const mapDispatchToProps = dispatch => ({
  onSetFormState: newState => dispatch(setFormState(newState)),
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
)(WalletCreationPage);
