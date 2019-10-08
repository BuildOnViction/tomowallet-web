/**
 *
 * TomoWallet - Import Wallet Page - MetaMask Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _get from 'lodash.get';
// Utilities & Constants
import { withWeb3 } from '../../../components/Web3';
import { withIntl } from '../../../components/IntlProvider';
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
    const {
      intl: { formatMessage },
    } = this.props;

    return (
      <div>{formatMessage(MSG.IMPORT_WALLET_TAB_METAMASK_CONTENT_MESSAGE)}</div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MetaMaskForm.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to remove MetaMask provider */
  removeMetaMaskProvider: PropTypes.func,
  /** Action to set MetaMask provider */
  setMetaMaskProvider: PropTypes.func,
};

MetaMaskForm.defaultProps = {
  intl: {},
  removeMetaMaskProvider: () => {},
  setMetaMaskProvider: () => {},
};
// ======================

export default compose(
  withIntl,
  withWeb3,
)(MetaMaskForm);
