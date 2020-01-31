/**
 *
 * TomoWallet - Show Wallet Popup - Wallet View Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _get from 'lodash.get';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// Custom Components
import MnemonicBox from '../../../MnemonicBox';
// Utilities, Constants & Styles
import {
  // getNetwork,
  getWeb3Info,
  isPrivateKey,
  mnemonicToPrivateKey,
  withGlobal,
} from '../../../../utils';
import { withWeb3 } from '../../../Web3';
import { WALLET_POPUP_CONTENT_TAB } from '../../../../containers/Global/constants';
import { MSG } from '../../../../constants';
import { TextBlue } from '../../../../styles';
import { StyledMainTabWrapper } from './style';
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
    const { recoveryPhrase } = getWeb3Info();
    return isPrivateKey(recoveryPhrase);
  }

  handleGetPrivateKey() {
    const { rpcServer } = this.props;
    const { recoveryPhrase } = getWeb3Info();
    // const rpcServer = _get(RPC_SERVER, [getNetwork()], {});
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
    const {
      formatMessage,
      handleCopyToClipboard,
      updateTab,
      walletPopup,
    } = this.props;
    const activeTab = _get(walletPopup, 'tabType');
    const isLoggedInByPK = this.handleCheckPrivateKey();

    return (
      <StyledMainTabWrapper>
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
            <TextBlue
              role='presentation'
              onClick={() => handleCopyToClipboard(this.handleGetPrivateKey())}
              className='text-break'
            >
              {this.handleGetPrivateKey()}
            </TextBlue>
            <div className='mt-5'>
              {formatMessage(
                MSG.HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY_NOTE,
              )}
            </div>
          </TabPane>
        </TabContent>
      </StyledMainTabWrapper>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WalletViewContent.propTypes = {
  /** React Intl's API to get message */
  formatMessage: PropTypes.func,
  /** Action to copy text to clipboard with notification */
  handleCopyToClipboard: PropTypes.func,
  /** Action to change view's tab */
  updateTab: PropTypes.func,
  /** Wallet popup's data */
  walletPopup: PropTypes.object,
};

WalletViewContent.defaultProps = {
  formatMessage: () => {},
  handleCopyToClipboard: () => {},
  updateTab: () => {},
  walletPopup: {},
};
// ======================

export default compose(
  withGlobal,
  withWeb3,
)(WalletViewContent);
