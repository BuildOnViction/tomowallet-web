/**
 *
 * TomoWallet - My Wallet Page - Portfolio Table
 *
 * This component defines a table of tokens which current account owns,
 * including actions to send/receive with other accounts
 */
// ===== IMPORTS =====
// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import _isEmpty from 'lodash.isempty';
// Custom Components
import CommonTable from '../../../../components/Table';
import { BoxPortfolio } from './style';
// Utilities, Constants & Style
import { loadTokenOptions } from '../../actions';
import {
  selectTokenOptions,
  selectSuccessPopup,
  selectTableType,
} from '../../selectors';
import { withIntl } from '../../../../components/IntlProvider';
import portfolioConfig from './configuration';
import { PORTFOLIO_COLUMNS } from '../../constants';
import { selectWallet } from '../../../Global/selectors';
import { LIST } from '../../../../constants';
import tomoIcon from '../../../../assets/images/logo-tomo.png';
// ===================

// ===== MAIN COMPONENT =====
class PortfolioTable extends Component {
  constructor(props) {
    super(props);

    this.handleGetNativeCurrency = this.handleGetNativeCurrency.bind(this);
    this.handleLoadTokenOptions = this.handleLoadTokenOptions.bind(this);
  }

  componentDidMount() {
    const { wallet } = this.props;
    if (!_isEmpty(wallet)) {
      this.handleLoadTokenOptions();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !_isEqual(_get(prevProps, 'wallet'), _get(this.props, 'wallet')) ||
      (!_get(prevProps, 'successPopup.isOpen') &&
        _get(this.props, 'successPopup.isOpen')) ||
      (!_isEqual(_get(prevProps, 'tableType'), _get(this.props, 'tableType')) &&
        _isEqual(
          _get(this.props, 'tableType'),
          _get(LIST, ['MY_WALLET_TABLE_TYPES', 0, 'value']),
        ))
    ) {
      this.handleLoadTokenOptions();
    }
  }

  handleGetNativeCurrency() {
    const { wallet } = this.props;
    return [
      {
        [PORTFOLIO_COLUMNS.TOKEN_NAME]: 'TOMO',
        [PORTFOLIO_COLUMNS.SYMBOL]: 'TOMO',
        [PORTFOLIO_COLUMNS.ICON]: tomoIcon,
        [PORTFOLIO_COLUMNS.BALANCE]: _get(wallet, 'balance', 0),
        [PORTFOLIO_COLUMNS.DECIMALS]: 18,
        [PORTFOLIO_COLUMNS.PRICE]: 0.4,
        [PORTFOLIO_COLUMNS.VALUE]: _get(wallet, 'balance', 0) * 0.4,
        [PORTFOLIO_COLUMNS.TYPE]: 'TRC20',
        [PORTFOLIO_COLUMNS.TRANSACTION_FEE]: 0.03,
        [PORTFOLIO_COLUMNS.PUBLISHER]: 'TomoChain',
      },
    ];
  }

  handleLoadTokenOptions() {
    const { onLoadTokenOptions, wallet } = this.props;
    onLoadTokenOptions(
      _get(wallet, 'address', ''),
      this.handleGetNativeCurrency(),
    );
  }

  render() {
    const {
      data,
      intl: { formatMessage },
      openReceiveTokenPopup,
      openSendTokenPopup,
    } = this.props;
    return (
      <BoxPortfolio>
        <CommonTable
          data={data}
          setConfig={portfolioConfig}
          getConfigProps={{
            formatMessage,
            openReceiveTokenPopup,
            openSendTokenPopup,
          }}
          getTableProps={{
            minRows: 3,
            showPagination: false,
            TheadComponent: props =>
              props.className !== '-header' && props.children,
          }}
        />
      </BoxPortfolio>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PortfolioTable.propTypes = {
  /** Table data */
  data: PropTypes.arrayOf(PropTypes.object),
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Condition flag to trigger data reload */
  isActive: PropTypes.bool,
  /** Success popup's data */
  successPopup: PropTypes.object,
  /** Current table tab's type */
  tableType: PropTypes.string,
  /** Action to request for token list by address */
  onLoadTokenOptions: PropTypes.func,
  /** Action to show receive token popup */
  openReceiveTokenPopup: PropTypes.func,
  /** Action to show send token popup */
  openSendTokenPopup: PropTypes.func,
};

PortfolioTable.defaultProps = {
  data: [],
  intl: {},
  isActive: false,
  successPopup: {},
  tableType: '1',
  onLoadTokenOptions: () => {},
  openReceiveTokenPopup: () => {},
  openSendTokenPopup: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    data: selectTokenOptions,
    successPopup: selectSuccessPopup,
    tableType: selectTableType,
    wallet: selectWallet,
  });
const mapDispatchToProps = dispatch => ({
  onLoadTokenOptions: (address, initialTokens) =>
    dispatch(loadTokenOptions(address, initialTokens)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
)(PortfolioTable);
