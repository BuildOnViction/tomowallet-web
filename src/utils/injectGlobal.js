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
// Utilities
import { selectLoading } from '../containers/Global/selectors';
import {
  toggleLoading,
  toggleClipboardCopyState,
} from '../containers/Global/actions';
import { copyToClipboard } from './miscellaneous';
// ===================

// ===== INJECTOR =====
export const withGlobal = WrappedComponent => {
  class LoadingConsumer extends PureComponent {
    constructor(props) {
      super(props);

      this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
    }

    handleCopyToClipboard(stringToCopy) {
      const { onToggleClipboardPopup } = this.props;
      copyToClipboard(stringToCopy);
      onToggleClipboardPopup(true);
    }

    render() {
      const { loading, onToggleLoading } = this.props;
      return (
        <WrappedComponent
          {...this.props}
          handleCopyToClipboard={this.handleCopyToClipboard}
          loading={loading}
          toggleLoading={onToggleLoading}
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
    });
  const mapDispatchToProps = dispatch => ({
    onToggleClipboardPopup: bool => dispatch(toggleClipboardCopyState(bool)),
    onToggleLoading: bool => dispatch(toggleLoading(bool)),
  });
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return hoistNonReactStatics(withConnect(LoadingConsumer), WrappedComponent);
};
// ====================
