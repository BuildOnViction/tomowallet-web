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
import { addNativeCurrency, loadTokenOptions } from '../../actions';
import { selectTokenOptions } from '../../selectors';
import { withIntl } from '../../../../../components/IntlProvider';
import porfolioConfig from './configuration';
import { BoxPorfolio } from './style';
// ===================

// ===== MAIN COMPONENT =====
class PorfolioTable extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLoadData = this.handleLoadData.bind(this);
  }

  componentDidMount() {
    this.handleLoadData();
  }

  handleLoadData() {
    const { onAddNativeCurrency, onLoadTokenOptions } = this.props;
    onLoadTokenOptions('0xec6c16a19d6f799b1d2bc4b0df128ff39df00bfb');
  }

  render() {
    const {
      data,
      intl: { formatMessage },
      openSendTokenPopup,
    } = this.props;
    return (
      <BoxPorfolio>
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
      </BoxPorfolio>
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
  /** Condition flag to trigger data reload */
  isActive: PropTypes.bool,
  /** Action to add native currency at the beginning of the porfolio table */
  onAddNativeCurrency: PropTypes.func,
  /** Action to request for token list by address */
  onLoadTokenOptions: PropTypes.func,
  /** Action to show/hide send token popup */
  openSendTokenPopup: PropTypes.func,
};

PorfolioTable.defaultProps = {
  data: [],
  intl: {},
  isActive: false,
  onAddNativeCurrency: () => {},
  onLoadTokenOptions: () => {},
  openSendTokenPopup: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    data: selectTokenOptions,
  });
const mapDispatchToProps = dispatch => ({
  onAddNativeCurrency: token => dispatch(addNativeCurrency(token)),
  onLoadTokenOptions: address => dispatch(loadTokenOptions(address)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
)(PorfolioTable);
