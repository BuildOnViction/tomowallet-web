/**
 *
 * TomoWallet - Loading State Injection
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
// Utilities & Constants
import {
  selectLoading,
  selectPrivacyMode,
} from '../containers/Global/selectors';
import {
  toggleLoading,
  toggleClipboardCopyState,
  togglePrivacyMode,
} from '../containers/Global/actions';
import { copyToClipboard } from './miscellaneous';
import { getPrivacyMode, setPrivacyMode, getWeb3Info } from './storage';
import { isBoolean } from 'util';
import { ENUM } from '../constants';
// ===================

// ===== INJECTOR =====
export const withGlobal = WrappedComponent => {
  class LoadingConsumer extends PureComponent {
    constructor(props) {
      super(props);

      this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
      this.handleTogglePrivacyMode = this.handleTogglePrivacyMode.bind(this);
    }

    componentDidMount() {
      const { onTogglePrivacyMode } = this.props;
      const storedPrivacyMode = getPrivacyMode();
      const loggedInByModule = [
        ENUM.LOGIN_TYPE.META_MASK,
        ENUM.LOGIN_TYPE.LEDGER,
      ].includes(_get(getWeb3Info(), 'loginType'));
      if (!loggedInByModule && isBoolean(storedPrivacyMode)) {
        if (!storedPrivacyMode) {
          onTogglePrivacyMode(null);
        } else {
          onTogglePrivacyMode(storedPrivacyMode);
        }
      }
    }

    handleCopyToClipboard(stringToCopy) {
      const { onToggleClipboardPopup } = this.props;
      copyToClipboard(stringToCopy);
      onToggleClipboardPopup(true);
    }

    handleTogglePrivacyMode(bool) {
      const { onTogglePrivacyMode } = this.props;
      onTogglePrivacyMode(bool);
      setPrivacyMode(bool);
    }

    render() {
      const {
        onToggleClipboardPopup,
        onToggleLoading,
        onTogglePrivacyMode,
        ...remains
      } = this.props;
      return (
        <WrappedComponent
          {...remains}
          handleCopyToClipboard={this.handleCopyToClipboard}
          toggleLoading={onToggleLoading}
          togglePrivacyMode={this.handleTogglePrivacyMode}
        />
      );
    }
  }

  if (WrappedComponent.defaultProps) {
    LoadingConsumer.defaultProps = { ...WrappedComponent.defaultProps };
  }

  const mapStateToProps = () =>
    createStructuredSelector({
      loading: selectLoading,
      privacyMode: selectPrivacyMode,
    });
  const mapDispatchToProps = dispatch => ({
    onToggleClipboardPopup: bool => dispatch(toggleClipboardCopyState(bool)),
    onToggleLoading: bool => dispatch(toggleLoading(bool)),
    onTogglePrivacyMode: bool => dispatch(togglePrivacyMode(bool)),
  });
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return hoistNonReactStatics(withConnect(LoadingConsumer), WrappedComponent);
};
// ====================
