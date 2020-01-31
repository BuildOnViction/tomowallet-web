/**
 *
 * TomoWallet - Common Table Component
 *
 * This component defines a common table component for all pages,
 * based on React Table module.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import { injectIntl } from 'react-intl';
// Custom Components
import CustomPagination from './subcomponents/Pagination';
import { CommonTableStyler, NoData } from './style';
import { MSG } from '../../constants';

// ===================

// ===== MAIN COMPONENT =====
class CommonTable extends PureComponent {
  constructor(props) {
    super(props);
    const { getConfigProps, setConfig } = props;

    this.state = {
      columns: setConfig(getConfigProps),
    };

    this.handleUpdateConfig = this.handleUpdateConfig.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      !_isEqual(
        _get(prevProps, 'getConfigProps'),
        _get(this.props, 'getConfigProps'),
      )
    ) {
      this.handleUpdateConfig();
    }
  }

  handleUpdateConfig() {
    const { getConfigProps, setConfig } = this.props;
    this.setState({
      columns: setConfig(getConfigProps),
    });
  }

  render() {
    const { data, getTableProps } = this.props;
    const { columns } = this.state;

    return (
      <CommonTableStyler
        columns={columns}
        data={data}
        defaultPageSize={3}
        minRows={3}
        loading={false}
        loadingText={null}
        PaginationComponent={CustomPagination}
        NoDataComponent={injectIntl(CustomNoDataComponent)}
        {...getTableProps}
      />
    );
  }
}

const CustomNoDataComponent = (props) => {
  const { intl: { formatMessage }} = props;

  return (<NoData>{formatMessage(MSG.MY_WALLET_TABLE_NODATA)}</NoData>);
}
// ==========================

// ===== PROP TYPES =====
CommonTable.propTypes = {
  /** Table column configuration */
  columns: PropTypes.arrayOf(PropTypes.object),
  /** Table data */
  data: PropTypes.arrayOf(PropTypes.object),
  /** Object of configuration generator arguments */
  getConfigProps: PropTypes.object,
  /** Action to generate table configuration */
  setConfig: PropTypes.func,
  /** Object of React Table configuration properties */
  getTableProps: PropTypes.object,
};

CommonTable.defaultProps = {
  columns: [],
  data: [],
  getConfigProps: {},
  setConfig: () => [],
  getTableProps: {},
};
// ======================

export default CommonTable;
