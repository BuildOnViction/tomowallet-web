/**
 *
 * TomoWallet - My Wallet Page
 *
 * This component defines a wallet-provided home page, with all basic information &
 * options to send/receive tokens...
 */
// ==== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Custom Components
import AddressInfo from './subcomponents/AddressInfo';
import DataTables from './subcomponents/DataTables';
// Utilities
import { setTableType } from './actions';
import { selectTableType } from './selectors';
import reducer from './reducer';
import { DOMAIN_KEY } from './constants';
import { injectReducer } from '../../../utils';
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { selectWallet } from '../../Global/selectors';
// -- TO-DO: Add style for My Wallet page component
// ==================

// ===== MAIN COMPONENT =====
class MyWallet extends PureComponent {
  render() {
    const { onSetTableType, tableType, wallet } = this.props;
    return (
      <Fragment>
        <AddressInfo wallet={wallet} />
        <DataTables setTableType={onSetTableType} tableType={tableType} />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MyWallet.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to set current table tab */
  onSetTableType: PropTypes.func,
  /** Current highlighted table tab */
  tableType: PropTypes.string,
  /** Current wallet's data */
  wallet: PropTypes.object,
};

MyWallet.defaultProps = {
  intl: {},
  onSetTableType: () => {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    tableType: selectTableType,
    wallet: selectWallet,
  });
const mapDispatchToProps = dispatch => ({
  onSetTableType: type => dispatch(setTableType(type)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
// ======================

export default compose(
  withConnect,
  withReducer,
  withIntl,
  withRouter,
  withWeb3,
)(MyWallet);
