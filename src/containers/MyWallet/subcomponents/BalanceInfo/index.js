import React from 'react';

import { MSG } from '../../../../constants';

import Chart from './Chart';
import { Wrapper, Col, BalanceIncognito, BalanceMain, TextTitle, TextValue } from './style';

const BalanceInfo = (props) => {
    const { formatMessage } = props

    return (
        <Wrapper>
            <Col>
                <div>
                    <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_BALANCE)}</TextTitle>
                    <TextValue>5.600 TOMO</TextValue>
                </div>
                <div>
                    <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_ESTIMATED)}</TextTitle>
                    <TextValue>$3.600</TextValue>
                </div>
            </Col>
            <Col><Chart /></Col>
            <Col>
                <BalanceIncognito>
                    <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_INCOGNITO)}</TextTitle>
                    <TextValue>1.100 TOMO</TextValue>
                </BalanceIncognito>
                <BalanceMain>
                    <TextTitle>{formatMessage(MSG.MY_WALLET_SECTION_BALANCE_MAIN)}</TextTitle>
                    <TextValue>4.500 TOMO</TextValue>
                </BalanceMain>
            </Col>
        </Wrapper>
    )
}

export default BalanceInfo;