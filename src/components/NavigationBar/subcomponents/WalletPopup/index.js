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
import _get from 'lodash.get';
// Custom Components
import Warning from './Warning';
import WalletView from './WalletView';
// Utilities, Constants & Style
import { selectWalletPopup } from '../../../../containers/Global/selectors';
import { WALLET_POPUP_STAGE } from '../../../../containers/Global/constants';
import {
  updateWalletPopupStage,
  toggleWalletPopup,
  updateWalletPopupContentTab,
} from '../../../../containers/Global/actions';
import { withIntl } from '../../../IntlProvider';
import { withWeb3 } from '../../../Web3';
import { MSG } from '../../../../constants';
import { WalletPopupStyler } from './style';
// ===================

// ===== MAIN COMPONENT =====
class WalletPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleGetButton = this.handleGetButton.bind(this);
    this.handleGetContent = this.handleGetContent.bind(this);
  }

  handleClosePopup() {
    const { onTogglePopup } = this.props;
    onTogglePopup(false);
  }

  handleGetButton() {
    const {
      intl: { formatMessage },
      onUpdatePopupStage,
      walletPopup,
    } = this.props;

    if (_get(walletPopup, 'stage') === WALLET_POPUP_STAGE.WARNING) {
      return {
        secondary: {
          label: formatMessage(MSG.COMMON_BUTTON_BACK),
          action: this.handleClosePopup,
        },
        primary: {
          btnYellow: true,
          label: formatMessage(MSG.COMMON_BUTTON_NEXT),
          action: () => onUpdatePopupStage(WALLET_POPUP_STAGE.CONTENT),
        },
      };
    } else if (_get(walletPopup, 'stage') === WALLET_POPUP_STAGE.CONTENT) {
      return {
        primary: {
          label: formatMessage(MSG.COMMON_BUTTON_CLOSE),
          action: this.handleClosePopup,
        },
      };
    }

    return {};
  }

  handleGetContent() {
    const {
      intl: { formatMessage },
      onUpdatePopupContentTab,
      walletPopup,
    } = this.props;
    if (_get(walletPopup, 'stage') === WALLET_POPUP_STAGE.WARNING) {
      return {
        Content: Warning,
        getContentProps: {
          formatMessage,
        },
      };
    } else if (_get(walletPopup, 'stage') === WALLET_POPUP_STAGE.CONTENT) {
      return {
        Content: WalletView,
        getContentProps: {
          formatMessage,
          updateTab: onUpdatePopupContentTab,
          walletPopup,
        },
      };
    }

    return {};
  }

  render() {
    const {
      intl: { formatMessage },
      walletPopup,
    } = this.props;
    return (
      <WalletPopupStyler
        button={this.handleGetButton()}
        {...this.handleGetContent()}
        isOpen={_get(walletPopup, 'isOpen', false)}
        title={formatMessage(MSG.HEADER_NAVBAR_POPUP_SHOW_WALLET_TITLE)}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WalletPopup.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to show/hide wallet popup */
  onTogglePopup: PropTypes.func,
  /** Action to change wallet view's tab */
  onUpdatePopupContentTab: PropTypes.func,
  /** Action to change wallet popup stage */
  onUpdatePopupStage: PropTypes.func,
  /** Show wallet popup's data */
  walletPopup: PropTypes.object,
  /** Web3 object */
  web3: PropTypes.object,
};

WalletPopup.defaultProps = {
  intl: {},
  onTogglePopup: () => {},
  onUpdatePopupContentTab: () => {},
  onUpdatePopupStage: () => {},
  walletPopup: {},
  web3: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    walletPopup: selectWalletPopup,
  });
const mapDispatchToProps = dispatch => ({
  onTogglePopup: bool => dispatch(toggleWalletPopup(bool)),
  onUpdatePopupContentTab: tabType =>
    dispatch(updateWalletPopupContentTab(tabType)),
  onUpdatePopupStage: stage => dispatch(updateWalletPopupStage(stage)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withIntl,
  withConnect,
  withWeb3,
)(WalletPopup);
