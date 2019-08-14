/**
 *
 * TomoWallet - My Wallet Page - Transaction Table
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Custom Components
import CommonTable from '../../../../../components/Table';
// Utilities
import { withIntl } from '../../../../../components/IntlProvider';
import transactionConfig from './configuration';
import { BoxTransction } from './style';
// Mock Data
import { transactions } from '../../mockData.json';
// ===================

// ===== MAIN COMPONENT =====
class TransactionTable extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <BoxTransction>
        <CommonTable
          data={transactions}
          setConfig={transactionConfig}
          getConfigProps={{
            formatMessage,
          }}
          getTableProps={{
            defaultPageSize: 5,
          }}
        />
      </BoxTransction>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
TransactionTable.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
};
// ======================

export default withIntl(TransactionTable);
