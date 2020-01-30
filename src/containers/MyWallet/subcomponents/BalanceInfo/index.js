import React, { PureComponent } from 'react';

import { MSG } from '../../../../constants';

import Chart from './Chart';
import PropTypes from 'prop-types';
import { Wrapper, Col, BalanceIncognito, BalanceMain, TextTitle, TextValue } from './style';
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
        let privacyBalance = 0;
        const privacyWallet = _get(wallet, ['privacy', 'privacyWallet'], {});
        if (privacyWallet && privacyWallet.balance) {
            privacyBalance = bnToDecimals(
                privacyWallet.balance.toString(10),
                9
            );
        }
        const balance = bnToDecimals(
            _get(wallet, ['balance'], 0),
            18
        );
        return (
            <Wrapper>
                <Col>
                    <div>
                        <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_BALANCE)}</TextTitle>
                        <TextValue>{convertLocaleNumber(parseFloat(balance))} TOMO</TextValue>
                    </div>
                    <div>
                        <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_ESTIMATED)}</TextTitle>
                        <TextValue>$ {convertLocaleNumber(parseFloat(balance * _get(coinData, ['data', 'quotes', 'USD', 'price'], 0)))}</TextValue>
                    </div>
                </Col>
                <Col><Chart /></Col>
                <Col>
                    <BalanceIncognito>
                        <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_INCOGNITO)}</TextTitle>
                        <TextValue>{privacyBalance} TOMO</TextValue>
                    </BalanceIncognito>
                    <BalanceMain>
                        <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_MAIN)}</TextTitle>
                        <TextValue>{convertLocaleNumber(parseFloat(balance))} TOMO</TextValue>
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