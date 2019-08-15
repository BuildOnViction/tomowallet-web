/**
 *
 * TomoWallet - Show Wallet Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Utilities & Style
import { selectWalletPopup } from '../../../../containers/Global/selectors';
import { withIntl } from '../../../IntlProvider';
// -- TO-DO: Update style for Show Wallet Popup
import WalletPopupStyler from './style';
// ===================

// ===== MAIN COMPONENT =====
class WalletPopup extends PureComponent {
  render() {
    return <WalletPopupStyler />;
  }
}
// ==========================

// ===== PROP TYPES =====
WalletPopup.propTypes = {
  /** Show wallet popup's data */
  walletPopup: PropTypes.object,
};

WalletPopup.defaultProps = {
  walletPopup: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    walletPopup: selectWalletPopup,
  });
const mapDispatchToProps = dispatch => ({});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withIntl,
  withConnect,
)(WalletPopup);
