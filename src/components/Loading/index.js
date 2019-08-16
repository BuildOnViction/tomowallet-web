/**
 *
 * TomoWallet - Loading Component
 *
 * This component defines a loading cover screen whenever a Web3 action is triggered.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner } from 'reactstrap';
// Custom Components
import { LoadingStyler } from './style';
// Utilities
import { selectLoading } from '../../containers/Global/selectors';
// ===================

// ===== MAIN COMPONENT =====
class LoadingScreen extends PureComponent {
  render() {
    const { loading } = this.props;
    return (
      <LoadingStyler loading={loading}>
        <Spinner color='secondary' />
      </LoadingStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
LoadingScreen.propTypes = {
  /** Condition flag to show/hide loading screen */
  loading: PropTypes.bool,
};

LoadingScreen.defaultProps = {
  loading: false,
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    loading: selectLoading,
  });
const withConnect = connect(mapStateToProps);
// ======================

export default withConnect(LoadingScreen);
