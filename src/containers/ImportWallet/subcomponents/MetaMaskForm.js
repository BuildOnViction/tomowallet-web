/**
 *
 * TomoWallet - Import Wallet Page - MetaMask Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
// Utilities & Constants
import { withWeb3 } from '../../../components/Web3';
import { getMessage } from '../../../components/IntlProvider';
import { MSG } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class MetaMaskForm extends PureComponent {
  componentDidMount() {
    const { setMetaMaskProvider } = this.props;
    setMetaMaskProvider();
  }

  render() {
    return (
      <div>{getMessage(MSG.IMPORT_WALLET_TAB_METAMASK_CONTENT_MESSAGE)}</div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MetaMaskForm.propTypes = {
  /** Action to set MetaMask provider */
  setMetaMaskProvider: PropTypes.func,
};

MetaMaskForm.defaultProps = {
  setMetaMaskProvider: () => {},
};
// ======================

export default withWeb3(MetaMaskForm);
