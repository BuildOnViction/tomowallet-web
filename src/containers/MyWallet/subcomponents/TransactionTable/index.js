/**
 *
 * TomoWallet - My Wallet Page - Transaction Table
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
import _isEqual from 'lodash.isequal';
// Custom Components
import CommonTable from '../../../../components/Table';
import { BoxTransaction, BoxPrivacyTransaction } from './style';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import transactionConfig from './configuration';
import privacyTransactionConfig from './privacy-config';
import { selectTransactionData, selectTableType, selectPrivacyTransactionData } from '../../selectors';
import { loadTransactionData, scanPrivacyTransaction } from '../../actions';
import { LIST } from '../../../../constants';
import { selectWallet, selectPrivacyMode, selectPrivacyWallet } from '../../../Global/selectors';
// ===================

// ===== MAIN COMPONENT =====
class TransactionTable extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLoadTransactionData = this.handleLoadTransactionData.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (
      (!_isEqual(_get(prevProps, 'tableType'), _get(this.props, 'tableType')) &&
        _isEqual(
          _get(this.props, 'tableType'),
          _get(LIST, ['MY_WALLET_TABLE_TYPES', 1, 'value']),
        )) ||
        (!_isEqual(_get(prevProps, 'privacyMode'), _get(this.props, 'privacyMode')) &&
        _isEqual(
          _get(this.props, 'tableType'),
          _get(LIST, ['MY_WALLET_TABLE_TYPES', 1, 'value']),
        ))
    ) {
      this.handleLoadTransactionData();
    }
  }

  handleLoadTransactionData(newPage) {
    const {
      onLoadTransactionData,
      wallet,
      privacyMode,
      onLoadPrivacyTransaction,
      privacyWallet
    } = this.props;
    if (privacyMode) {
      onLoadPrivacyTransaction({ wallet, privacyWallet });
    } else {
      onLoadTransactionData({
        page: newPage || 1,
        address: _get(wallet, 'address', ''),
      });
    }
  }

  render() {
    const {
        intl: { formatMessage },
        transData,
        privacyTransData,
        privacyMode,
    } = this.props;
    let dt = privacyMode ? _get(privacyTransData, 'data', []) : _get(transData, 'data', [])
    return (
        <>
            {privacyMode ? 
                <BoxPrivacyTransaction>
                <CommonTable
                    data={dt}
                    setConfig={privacyTransactionConfig}
                    getConfigProps={{
                        formatMessage,
                    }}
                    getTableProps={{
                        defaultPageSize: 5,
                        minRows: 5,
                        getPaginationProps: () => ({
                        changePage: this.handleLoadTransactionData,
                        currentPage: _get(transData, 'page', 1),
                        totalPages: _get(transData, 'pages', 1),
                        }),
                    }}
                />
                </BoxPrivacyTransaction>
                :
                <BoxTransaction>
                    <CommonTable
                        data={dt}
                        setConfig={transactionConfig}
                        getConfigProps={{
                            formatMessage,
                        }}
                        getTableProps={{
                            defaultPageSize: 5,
                            minRows: 5,
                            getPaginationProps: () => ({
                            changePage: this.handleLoadTransactionData,
                            currentPage: _get(transData, 'page', 1),
                            totalPages: _get(transData, 'pages', 1),
                            }),
                        }}
                    />
            </BoxTransaction>
        }
        </>
        
    );
  }
}
// ==========================

// ===== PROP TYPES =====
TransactionTable.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Current table tab's type */
  tableType: PropTypes.string,
  /** Transaction table's data */
  transData: PropTypes.object,
  /** Current wallet's data */
  wallet: PropTypes.object,
  /** Transaction table's privacy data */
  privacyTransData: PropTypes.object,
  /** Current privacy wallet's data */
  privacyWallet: PropTypes.object,
};

TransactionTable.defaultProps = {
  intl: {},
  tableType: '1',
  transData: {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    transData: selectTransactionData,
    tableType: selectTableType,
    wallet: selectWallet,
    privacyMode: selectPrivacyMode,
    privacyTransData: selectPrivacyTransactionData,
    privacyWallet: selectPrivacyWallet,
  });
const mapDispatchToProps = dispatch => ({
  onLoadTransactionData: params => dispatch(loadTransactionData(params)),
  onLoadPrivacyTransaction: wallet => dispatch(scanPrivacyTransaction(wallet)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
)(TransactionTable);
