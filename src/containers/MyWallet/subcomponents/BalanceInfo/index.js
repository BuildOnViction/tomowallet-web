import React, { PureComponent } from 'react';

import { MSG } from '../../../../constants';

import Chart from './Chart';
import PropTypes from 'prop-types';
import { Wrapper, Col, BalancePrivacy, BalanceMain, TextTitle, TextValue, Ellipsis } from './style';
import { bnToDecimals,
    convertLocaleNumber } from '../../../../utils'
import _get from "lodash.get";
import { createStructuredSelector } from 'reselect';
import { selectCoinData } from '../../selectors';
import { loadCoinData } from '../../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withIntl } from '../../../../components/IntlProvider';

class BalanceInfo extends PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          isRequested: false,
        };
    
        this.handleGetPrivacyBalance = this.handleGetPrivacyBalance.bind(this);
    }

    handleGetPrivacyBalance () {
        const { wallet } = this.props;
        let privacyBalance = 0;
        const privacyWallet = _get(wallet, ['privacy', 'privacyWallet'], {});
        if (privacyWallet && privacyWallet.balance) {
            privacyBalance = bnToDecimals(
                privacyWallet.balance.toString(10),
                9
            );
        }
        return privacyBalance;
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

    render() {
        const { formatMessage, wallet,coinData } = this.props;
        const balance = bnToDecimals(
            _get(wallet, ['balance'], 0),
            18
        );
        let totalBalance = parseFloat(balance) + parseFloat(this.handleGetPrivacyBalance())
        const data = [{ value: parseFloat(balance)}, { value: parseFloat(this.handleGetPrivacyBalance()) }]

        return (
            <Wrapper>
                <Col>
                    <div>
                        <TextTitle>
                            <Ellipsis title={formatMessage(MSG.MY_WALLET_SECTION_BALANCE_BALANCE)}>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_BALANCE)}</Ellipsis>
                        </TextTitle>
                        <TextValue title={`${convertLocaleNumber(totalBalance)} TOMO`}>
                            {convertLocaleNumber(totalBalance)} TOMO
                        </TextValue>
                    </div>
                    <div>
                        <TextTitle>
                            <Ellipsis title={formatMessage(MSG.MY_WALLET_SECTION_BALANCE_ESTIMATED)}>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_ESTIMATED)}</Ellipsis>
                        </TextTitle>
                        <TextValue title={`$ ${convertLocaleNumber(totalBalance * _get(coinData, ['data', 'quotes', 'USD', 'price'], 0))}`}>
                            $ {convertLocaleNumber(totalBalance * _get(coinData, ['data', 'quotes', 'USD', 'price'], 0))}
                        </TextValue>
                    </div>
                </Col>
                <Col>
                    <Chart data={data}/>
                </Col>
                <Col>
                    <BalancePrivacy>
                        <TextTitle>
                            <Ellipsis title={formatMessage(MSG.MY_WALLET_SECTION_BALANCE_PRIVACY)}>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_PRIVACY)}</Ellipsis>
                        </TextTitle>
                        <TextValue title={`${this.handleGetPrivacyBalance()} TOMO`}>{this.handleGetPrivacyBalance()} TOMO</TextValue>
                    </BalancePrivacy>
                    <BalanceMain>
                        <TextTitle title={formatMessage(MSG.MY_WALLET_SECTION_BALANCE_MAIN)}>
                            <Ellipsis>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_MAIN)}</Ellipsis>
                        </TextTitle>
                        <TextValue title={`${convertLocaleNumber(parseFloat(balance))} TOMO`}>
                            {convertLocaleNumber(parseFloat(balance))} TOMO
                        </TextValue>
                    </BalanceMain>
                </Col>
            </Wrapper>
        )
    }
}

// ===== PROP TYPES =====
BalanceInfo.propTypes = {
    /** Wallet's data */
    wallet: PropTypes.object,
    /** Coin's data */
    coinData: PropTypes.object,
};

BalanceInfo.defaultProps = {
    wallet: {},
};

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
  )(BalanceInfo);