import React from 'react';

import Chart from './Chart';

import { Wrapper, Col, BalanceIncognito, BalanceMain, TextTitle, TextValue } from './style';

const BalanceInfo = (props) => {
    return (
        <Wrapper>
            <Col>
                <div>
                    <TextTitle>Balance</TextTitle>
                    <TextValue>5.600 TOMO</TextValue>
                </div>
                <div>
                    <TextTitle>Estimated value</TextTitle>
                    <TextValue>$3.600</TextValue>
                </div>
            </Col>
            <Col><Chart /></Col>
            <Col>
                <BalanceIncognito>
                    <TextTitle>Incognito Balance</TextTitle>
                    <TextValue>0 TOMO</TextValue>
                </BalanceIncognito>
                <BalanceMain>
                    <TextTitle>Main Balance</TextTitle>
                    <TextValue>5.600 TOMO</TextValue>
                </BalanceMain>
            </Col>
        </Wrapper>
    )
}

export default BalanceInfo