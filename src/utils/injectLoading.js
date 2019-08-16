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
import { toggleLoading } from '../containers/Global/actions';
// ===================

// ===== INJECTOR =====
export const withLoading = WrappedComponent => {
  class LoadingConsumer extends PureComponent {
    render() {
      const { loading, onToggleLoading } = this.props;
      return (
        <WrappedComponent
          {...this.props}
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
    onToggleLoading: bool => dispatch(toggleLoading(bool)),
  });
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return hoistNonReactStatics(withConnect(LoadingConsumer), WrappedComponent);
};
// ====================
