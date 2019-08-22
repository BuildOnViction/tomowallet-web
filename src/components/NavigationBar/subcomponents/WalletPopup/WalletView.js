/**
 *
 * TomoWallet - Show Wallet Popup - Wallet View Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import QRCode from 'qrcode.react';
// Custom Components
import MnemonicBox from '../../../MnemonicBox';
// Utilities, Constants & Styles
import { getWeb3Info, mnemonicToPrivateKey } from '../../../../utils';
import { WALLET_POPUP_CONTENT_TAB } from '../../../../containers/Global/constants';
import { MSG } from '../../../../constants';
import { BoxImages, TextBlue } from '../../../../styles';
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
      return recoveryPhrase.replace(/^0x/, '');
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
      <div className='main_tab content-wallet-view'>
        <Nav tabs className='mb-4'>
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
          </NavItem>
          <NavItem>
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
          <TabPane
            tabId={WALLET_POPUP_CONTENT_TAB.PRIVATE_KEY}
            className='text-center mt-5 px-lg-5'
          >
            <div className='text-break'>
              <TextBlue>{this.handleGetPrivateKey()}</TextBlue>
            </div>
            <div className='mt-5'>
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
