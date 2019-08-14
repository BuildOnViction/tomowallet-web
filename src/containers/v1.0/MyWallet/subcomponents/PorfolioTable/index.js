/**
 *
 * TomoWallet - My Wallet Page - Porfolio Table
 *
 * This component defines a table of tokens which current account owns,
 * including actions to send/receive with other accounts
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
// Custom Components
import CommonTable from '../../../../../components/Table';
// Utilities
import { withIntl } from '../../../../../components/IntlProvider';
import porfolioConfig from './configuration';
// Mock Data
import { porfolio } from '../../mockData.json';
// ===================

// ===== MAIN COMPONENT =====
class PorfolioTable extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      openSendTokenPopup,
    } = this.props;
    return (
      <CommonTable
        data={porfolio}
        setConfig={porfolioConfig}
        getConfigProps={{
          formatMessage,
          openSendTokenPopup,
        }}
        getTableProps={{
          minRows: 3,
          showPagination: false,
          TheadComponent: props => props.className !== '-header' && props.children
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PorfolioTable.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to show/hide send token popup */
  openSendTokenPopup: PropTypes.func,
};

PorfolioTable.defaultProps = {
  intl: {},
  openSendTokenPopup: () => {},
};
// ======================

export default compose(withIntl)(PorfolioTable);
