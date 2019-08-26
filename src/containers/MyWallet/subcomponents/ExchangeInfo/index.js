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
import _get from 'lodash.get';
// Custom Components
import Image from '../../../../components/Image';
import { ExchangeInfoStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { convertLocaleNumber } from '../../../../utils';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class ExchangeInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormatMoney = this.handleFormatMoney.bind(this);
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

  render() {
    const {
      coinData,
      intl: { formatMessage },
    } = this.props;

    return (
      <ExchangeInfoStyler>
        <div className='exchange-info__container'>
          <div>
            <div className='exchange-info__data'>
              <span className='exchange-info__data-title'>
                <a
                  href='https://coinmarketcap.com/currencies/tomochain/?utm_medium=widget&amp;utm_campaign=cmcwidget&amp;utm_source=localhost&amp;utm_content=tomochain'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {`${_get(coinData, 'data.name', '')} (${_get(
                    coinData,
                    'data.symbol',
                    '',
                  )})`}
                </a>
              </span>
              <br />
              <span className='exchange-info__data-rate--usd'>
                {_get(coinData, 'data.quotes.USD.price', 0)}
                <span>{` (${_get(
                  coinData,
                  'data.quotes.USD.percent_change_24h',
                  0,
                )}%)`}</span>
              </span>
              <br />
              <span className='exchange-info__data-rate--btc'>
                {`${_get(coinData, 'data.quotes.BTC.price', 0)} ${formatMessage(
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
              <span>{_get(coinData, 'data.rank', 0)}</span>
            </div>
            <div className='exchange-info__charts-box'>
              {formatMessage(MSG.MY_WALLET_SECTION_EXCHANGE_CHART_MARKET_CAP)}
              <br />
              <br />
              <span>
                {`${this.handleFormatMoney(
                  _get(coinData, 'data.quotes.USD.market_cap', 0),
                )} `}
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
                {`${this.handleFormatMoney(
                  _get(coinData, 'data.quotes.USD.volume_24h', 0),
                )} `}
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
};

ExchangeInfo.defaultProps = {
  coinData: {},
  intl: {},
};
// ======================

export default withIntl(ExchangeInfo);
