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
import { loadTokenOptions, scanPrivacyData, } from '../../actions';
import {
  selectTokenOptions,
  selectSuccessPopup,
  selectTableType,
  selectCoinData,
  selectPrivacyData,
  selectSuccessDepositPopup,
  selectSuccessWithdrawPopup,
} from '../../selectors';
import { withIntl } from '../../../../components/IntlProvider';
import portfolioConfig from './configuration';
import portfolioPrivacyConfig from './privacy-configuration';
import { PORTFOLIO_COLUMNS } from '../../constants';
import { selectWallet, selectPrivacyMode, selectPrivacyWallet } from '../../../Global/selectors';
import { LIST, ENUM } from '../../../../constants';
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
      !_isEqual(_get(prevProps, ['wallet', 'address']), _get(this.props, ['wallet', 'address'])) ||
      (!_get(prevProps, 'successPopup.isOpen') &&
        _get(this.props, 'successPopup.isOpen')) ||
      (!_isEqual(_get(prevProps, 'tableType'), _get(this.props, 'tableType')) &&
        _isEqual(
          _get(this.props, 'tableType'),
          _get(LIST, ['MY_WALLET_TABLE_TYPES', 0, 'value']),
        )) ||
        (!_isEqual(_get(prevProps, 'privacyMode'), _get(this.props, 'privacyMode')) &&
        _isEqual(
          _get(this.props, 'tableType'),
          _get(LIST, ['MY_WALLET_TABLE_TYPES', 0, 'value']),
        )) ||
        (!_get(prevProps, 'successDepositPopup.isOpen') &&
        _get(this.props, 'successDepositPopup.isOpen')) ||
        (!_get(prevProps, 'successWithdrawPopup.isOpen') &&
        _get(this.props, 'successWithdrawPopup.isOpen'))
    ) {
      this.handleLoadTokenOptions();
    }
  }

  handleGetNativeCurrency() {
    const { coinData, wallet } = this.props;
    return [
      {
        [PORTFOLIO_COLUMNS.TOKEN_NAME]: 'TomoChain',
        [PORTFOLIO_COLUMNS.SYMBOL]: 'TOMO',
        [PORTFOLIO_COLUMNS.ICON]: tomoIcon,
        [PORTFOLIO_COLUMNS.BALANCE]: _get(wallet, 'balance', 0),
        [PORTFOLIO_COLUMNS.DECIMALS]: 18,
        [PORTFOLIO_COLUMNS.PRICE]: _get(coinData, 'data.quotes.USD.price', 0),
        [PORTFOLIO_COLUMNS.TYPE]: ENUM.TOKEN_TYPE.CURRENCY,
        [PORTFOLIO_COLUMNS.TRANSACTION_FEE]: 0.03
      },
    ];
  }

  handleLoadTokenOptions() {
    const {
        onLoadTokenOptions,
        wallet,
        privacyMode,
        onScanPrivacyData,
        privacyWallet,
    } = this.props;
    if (privacyMode) {
        onScanPrivacyData({ wallet, privacyWallet });
    } else {
        onLoadTokenOptions({
                address: _get(wallet, 'address', ''),
            },
            this.handleGetNativeCurrency(),
        );
    }
  }

  render() {
    const {
      data,
      intl: { formatMessage },
      openSendTokenPopup,
      privacyMode,
      privacyData,
      openDepositPrivacyPopup,
      openWithdrawPrivacyPopup,
    } = this.props;

    let dt = privacyMode ? privacyData : data
    let cf = privacyMode ? portfolioPrivacyConfig : portfolioConfig

    return (
      <BoxPortfolio>
        <CommonTable
          data={dt}
          setConfig={cf}
          getConfigProps={{
            formatMessage,
            openSendTokenPopup,
            privacyMode,
            openDepositPrivacyPopup,
            openWithdrawPrivacyPopup
          }}
          getTableProps={{
            minRows: 3,
            showPagination: false,
            defaultPageSize: undefined,
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
  /** TomoChain coin data */
  coinData: PropTypes.object,
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
  /** Action to show send token popup */
  openSendTokenPopup: PropTypes.func,
  /**Action to scan privacy data */
  onScanPrivacyData: PropTypes.func,
  /** Action to show deposit privacy popup */
  openDepositPrivacyPopup: PropTypes.func,
  /** Success Deposit popup's data */
  successDepositPopup: PropTypes.object,
  /** Action to open withdraw privacy popup */
  openWithdrawPrivacyPopup: PropTypes.func,
  /** Success Withdraw popup's data */
  successWithdrawPopup: PropTypes.object,
};

PortfolioTable.defaultProps = {
  coinData: {},
  data: [],
  intl: {},
  isActive: false,
  successPopup: {},
  tableType: '1',
  onLoadTokenOptions: () => {},
  openSendTokenPopup: () => {},
  onScanPrivacyData: () => {},
  openDepositPrivacyPopup: () => {},
  successDepositPopup: {},
  openWithdrawPrivacyPopup: () => {},
  successWithdrawPopup: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    coinData: selectCoinData,
    data: selectTokenOptions,
    successPopup: selectSuccessPopup,
    tableType: selectTableType,
    wallet: selectWallet,
    privacyMode: selectPrivacyMode,
    privacyData: selectPrivacyData,
    successDepositPopup: selectSuccessDepositPopup,
    successWithdrawPopup: selectSuccessWithdrawPopup,
    privacyWallet: selectPrivacyWallet,
  });
const mapDispatchToProps = dispatch => ({
  onLoadTokenOptions: (params, initialTokens) =>
    dispatch(loadTokenOptions(params, initialTokens)),
  onScanPrivacyData: wallet => dispatch(scanPrivacyData(wallet)),
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
