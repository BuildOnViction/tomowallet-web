/**
 *
 * TomoWallet - My Wallet Page - Porfolio Table
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
import { isEqual as _isEqual, get as _get, isEmpty as _isEmpty } from 'lodash';
// Custom Components
import CommonTable from '../../../../../components/Table';
// Utilities
import { loadTokenOptions } from '../../actions';
import { selectTokenOptions, selectSuccessPopup } from '../../selectors';
import { withIntl } from '../../../../../components/IntlProvider';
import porfolioConfig from './configuration';
import { BoxPorfolio } from './style';
import { PORFOLIO_COLUMNS } from '../../constants';
import tomoIcon from '../../../../../assets/images/logo-tomo.png';
import { selectWallet } from '../../../../Global/selectors';
// ===================

// ===== MAIN COMPONENT =====
class PorfolioTable extends Component {
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
        _get(this.props, 'successPopup.isOpen'))
    ) {
      this.handleLoadTokenOptions();
    }
  }

  handleGetNativeCurrency() {
    const { wallet } = this.props;
    return [
      {
        [PORFOLIO_COLUMNS.TOKEN_NAME]: 'TOMO',
        [PORFOLIO_COLUMNS.SYMBOL]: 'TOMO',
        [PORFOLIO_COLUMNS.ICON]: tomoIcon,
        [PORFOLIO_COLUMNS.BALANCE]: _get(wallet, 'balance', 0),
        [PORFOLIO_COLUMNS.DECIMALS]: 18,
        [PORFOLIO_COLUMNS.PRICE]: 0.4,
        [PORFOLIO_COLUMNS.VALUE]: _get(wallet, 'balance', 0) * 0.4,
        [PORFOLIO_COLUMNS.TYPE]: 'TRC20',
        [PORFOLIO_COLUMNS.TRANSACTION_FEE]: 0.03,
        [PORFOLIO_COLUMNS.PUBLISHER]: 'TomoChain',
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
      <BoxPorfolio>
        <CommonTable
          data={data}
          setConfig={porfolioConfig}
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
  /** Success popup's data */
  successPopup: PropTypes.object,
  /** Action to request for token list by address */
  onLoadTokenOptions: PropTypes.func,
  /** Action to show receive token popup */
  openReceiveTokenPopup: PropTypes.func,
  /** Action to show send token popup */
  openSendTokenPopup: PropTypes.func,
};

PorfolioTable.defaultProps = {
  data: [],
  intl: {},
  isActive: false,
  successPopup: {},
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
)(PorfolioTable);
