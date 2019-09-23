/**
 *
 * TomoWallet - My Wallet Page - Exchange Information Section
 *
 * This component shows latest exchange information of TomoChain cryptocurrency,
 * according to CoinMarketCap's data
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash.get';
// Custom Components
import Image from '../../../../components/Image';
import { ExchangeInfoStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { convertLocaleNumber } from '../../../../utils';
import { MSG } from '../../../../constants';
import { createStructuredSelector } from 'reselect';
import { selectCoinData } from '../../selectors';
import { loadCoinData } from '../../actions';
// ===================

// ===== MAIN COMPONENT =====
class ExchangeInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormatMoney = this.handleFormatMoney.bind(this);
    this.handleGetExchangeData = this.handleGetExchangeData.bind(this);
  }

  componentDidMount() {
    const { onLoadCoinData } = this.props;
    onLoadCoinData();
    this.requestCoinData = setInterval(() => {
      onLoadCoinData();
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.requestCoinData);
  }

  handleFormatMoney(number) {
    const absNumber = Math.abs(Number(number));
    if (absNumber >= 1.0e9) {
      return `${convertLocaleNumber(absNumber / 1.0e9, 2)} B`;
    } else if (absNumber >= 1.0e6) {
      return `${convertLocaleNumber(absNumber / 1.0e6, 2)} M`;
    } else if (absNumber >= 1.0e3) {
      return `${convertLocaleNumber(absNumber / 1.0e3, 2)} K`;
    }
    return convertLocaleNumber(absNumber, 2);
  }

  handleGetExchangeData() {
    const { coinData } = this.props;
    return {
      name: _get(coinData, 'data.name', '-----'),
      symbol: _get(coinData, 'data.symbol', '---'),
      usdPrice: _get(coinData, 'data.quotes.USD.price', 0),
      changeRate: _get(coinData, 'data.quotes.USD.percent_change_24h', 0),
      btcPrice: _get(coinData, 'data.quotes.BTC.price', 0),
      rank: _get(coinData, 'data.rank', 0),
      marketCap: _get(coinData, 'data.quotes.USD.market_cap', 0),
      volume: _get(coinData, 'data.quotes.USD.volume_24h', 0),
    };
  }

  render() {
    const {
      coinData,
      intl: { formatMessage },
    } = this.props;
    const data = this.handleGetExchangeData();
    const isDecrease = Math.sign(data.changeRate) === -1;

    return (
      <ExchangeInfoStyler isLoaded={_get(coinData, 'isLoaded', false)}>
        <div className='exchange-info__container'>
          <div>
            <div className='exchange-info__data'>
              <span className='exchange-info__data-title'>
                <a
                  href='https://coinmarketcap.com/currencies/tomochain/?utm_medium=widget&amp;utm_campaign=cmcwidget&amp;utm_source=localhost&amp;utm_content=tomochain'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {`${data.name} (${data.symbol})`}
                </a>
              </span>
              <br />
              <span className='exchange-info__data-rate--usd'>
                {data.usdPrice}
                <span
                  className={isDecrease ? 'text-danger' : ''}
                >{` (${data.changeRate}%)`}</span>
              </span>
              <br />
              <span className='exchange-info__data-rate--btc'>
                {`${data.btcPrice} ${formatMessage(
                  MSG.MY_WALLET_SECTION_EXCHANGE_UNIT_BTC,
                )}`}
              </span>
            </div>
            <div className='exchange-info__icon'>
              <Image src='https://s2.coinmarketcap.com/static/img/coins/64x64/2570.png' />
            </div>
          </div>
          <div className='exchange-info__charts'>
            <div className='exchange-info__charts-box'>
              {formatMessage(MSG.MY_WALLET_SECTION_EXCHANGE_CHART_RANK)}
              <br />
              <br />
              <span>{data.rank}</span>
            </div>
            <div className='exchange-info__charts-box'>
              {formatMessage(MSG.MY_WALLET_SECTION_EXCHANGE_CHART_MARKET_CAP)}
              <br />
              <br />
              <span>
                {`${this.handleFormatMoney(data.marketCap)} `}
                <span>
                  {formatMessage(MSG.MY_WALLET_SECTION_EXCHANGE_UNIT_USD)}
                </span>
              </span>
            </div>
            <div className='exchange-info__charts-box'>
              {formatMessage(MSG.MY_WALLET_SECTION_EXCHANGE_CHART_VOLUME)}
              <br />
              <br />
              <span>
                {`${this.handleFormatMoney(data.volume)} `}
                <span>
                  {formatMessage(MSG.MY_WALLET_SECTION_EXCHANGE_UNIT_USD)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </ExchangeInfoStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ExchangeInfo.propTypes = {
  /** Exchange information section's data */
  coinData: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to get currency statistic from CoinMarketCap */
  onLoadCoinData: PropTypes.func,
};

ExchangeInfo.defaultProps = {
  coinData: {},
  intl: {},
  onLoadCoinData: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    coinData: selectCoinData,
  });
const mapDispatchToProps = dispatch => ({
  onLoadCoinData: () => dispatch(loadCoinData()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withIntl,
  withConnect,
)(ExchangeInfo);
