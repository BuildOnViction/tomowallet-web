/**
 *
 * TomoWallet - Show Wallet Popup - Wallet View Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// Custom Components
import MnemonicBox from '../../../MnemonicBox';
// Utilities & Constants
import { getWeb3Info, mnemonicToPrivateKey } from '../../../../utils';
import { WALLET_POPUP_CONTENT_TAB } from '../../../../containers/Global/constants';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class WalletViewContent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCheckPrivateKey = this.handleCheckPrivateKey.bind(this);
    this.handleGetPrivateKey = this.handleGetPrivateKey.bind(this);
    this.handleGetRecoveryPhrase = this.handleGetRecoveryPhrase.bind(this);
  }

  handleCheckPrivateKey() {
    const { isPrivateKey } = this.props;
    const { recoveryPhrase } = getWeb3Info();
    return isPrivateKey(recoveryPhrase);
  }

  handleGetPrivateKey() {
    const { recoveryPhrase, rpcServer } = getWeb3Info();
    if (this.handleCheckPrivateKey()) {
      return `0x${recoveryPhrase.replace('0x', '')}`;
    }
    return mnemonicToPrivateKey(recoveryPhrase, rpcServer);
  }

  handleGetRecoveryPhrase() {
    const { recoveryPhrase } = getWeb3Info();
    return recoveryPhrase || '';
  }

  render() {
    const { formatMessage, updateTab, walletPopup } = this.props;
    const activeTab = _get(walletPopup, 'tabType');
    const isLoggedInByPK = this.handleCheckPrivateKey();

    return (
      <div className='content-wallet-view'>
        <Nav tabs>
          <NavItem>
            {!isLoggedInByPK && (
              <NavLink
                active={activeTab === WALLET_POPUP_CONTENT_TAB.RECOVERY_PHRASE}
                onClick={() =>
                  updateTab(WALLET_POPUP_CONTENT_TAB.RECOVERY_PHRASE)
                }
              >
                {formatMessage(
                  MSG.HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_RECOVERY_PHRASE,
                )}
              </NavLink>
            )}
            <NavLink
              active={activeTab === WALLET_POPUP_CONTENT_TAB.PRIVATE_KEY}
              onClick={() => updateTab(WALLET_POPUP_CONTENT_TAB.PRIVATE_KEY)}
            >
              {formatMessage(
                MSG.HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY,
              )}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {!isLoggedInByPK && (
            <TabPane tabId={WALLET_POPUP_CONTENT_TAB.RECOVERY_PHRASE}>
              <MnemonicBox mnemonic={this.handleGetRecoveryPhrase()} />
            </TabPane>
          )}
          <TabPane tabId={WALLET_POPUP_CONTENT_TAB.PRIVATE_KEY}>
            <div>{this.handleGetPrivateKey()}</div>
            <div>
              {formatMessage(
                MSG.HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY_NOTE,
              )}
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WalletViewContent.propTypes = {
  /** React Intl's API to get message */
  formatMessage: PropTypes.func,
  /** Action to check if the stored recovery phrase is private key */
  isPrivateKey: PropTypes.func,
  /** Action to change view's tab */
  updateTab: PropTypes.func,
  /** Wallet popup's data */
  walletPopup: PropTypes.object,
};

WalletViewContent.defaultProps = {
  formatMessage: () => {},
  isPrivateKey: () => {},
  updateTab: () => {},
  walletPopup: {},
};
// ======================

export default WalletViewContent;
