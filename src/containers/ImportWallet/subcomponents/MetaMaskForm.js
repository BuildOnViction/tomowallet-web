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
import { MSG, ENUM } from '../../../constants';
import { getWeb3Info } from '../../../utils';
// ===================

// ===== MAIN COMPONENT =====
class MetaMaskForm extends PureComponent {
  componentDidMount() {
    const { setMetaMaskProvider } = this.props;
    setMetaMaskProvider();
  }

  componentWillUnmount() {
    const { removeMetaMaskProvider } = this.props;
    const web3Info = getWeb3Info();
    if (_get(web3Info, 'loginType') !== ENUM.LOGIN_TYPE.META_MASK) {
      removeMetaMaskProvider();
    }
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
  /** Action to remove MetaMask provider */
  removeMetaMaskProvider: PropTypes.func,
  /** Action to set MetaMask provider */
  setMetaMaskProvider: PropTypes.func,
};

MetaMaskForm.defaultProps = {
  removeMetaMaskProvider: () => {},
  setMetaMaskProvider: () => {},
};
// ======================

export default withWeb3(MetaMaskForm);
