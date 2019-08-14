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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Custom Components
import CommonTable from '../../../../../components/Table';
// Utilities
import { selectTokenOptions } from '../../selectors';
import { withIntl } from '../../../../../components/IntlProvider';
import porfolioConfig from './configuration';
// ===================

// ===== MAIN COMPONENT =====
class PorfolioTable extends PureComponent {
  render() {
    const {
      data,
      intl: { formatMessage },
      openSendTokenPopup,
    } = this.props;
    return (
      <CommonTable
        data={data}
        setConfig={porfolioConfig}
        getConfigProps={{
          formatMessage,
          openSendTokenPopup,
        }}
        getTableProps={{
          minRows: 3,
          showPagination: false,
          TheadComponent: props =>
            props.className !== '-header' && props.children,
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PorfolioTable.propTypes = {
  /** Table data */
  data: PropTypes.arrayOf(PropTypes.object),
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to show/hide send token popup */
  openSendTokenPopup: PropTypes.func,
};

PorfolioTable.defaultProps = {
  data: [],
  intl: {},
  openSendTokenPopup: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    data: selectTokenOptions,
  });
const withConnect = connect(mapStateToProps);
// ======================

export default compose(
  withConnect,
  withIntl,
)(PorfolioTable);
