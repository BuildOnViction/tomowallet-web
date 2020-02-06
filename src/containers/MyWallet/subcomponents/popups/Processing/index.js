import React from 'react'
import { compose } from 'redux'
import styled from 'styled-components'
import { Progress, ModalHeader } from 'reactstrap'

import { MSG } from '../../../../../constants'

import { withIntl } from '../../../../../components/IntlProvider';
import Popup from '../../../../../components/Popup'

const ProcessingPopup = (props) => {
    const { togglePopup } = props

    return (
        <StyledPopup
            backdrop
            isOpen={false}
            toggle={() => togglePopup(false)}
            Content={WrappedContent}
            button={{}} />
    )
}

const StyledPopup = styled(Popup)``

const Content = (props) => {
    const { intl: { formatMessage }} = props

    return (
        <Wrapper>
            <ModalHeader>{formatMessage(MSG.MY_WALLET_POPUP_PROCESSING_SEND_TOKEN_TITLE)}</ModalHeader>
            <Description>Main mode allows you to make the transactions which are ingconitive and couldn’t be traceable</Description>
            <StyledProgress color="yellow" value={60} />
        </Wrapper>
    )
}

const WrappedContent = compose(
    withIntl,
)(Content)

const Wrapper = styled.div.attrs({
    className: 'text-center',
})`
    padding-left: 20px;
    padding-right: 20px;
`

const StyledProgress = styled(Progress)`
    height: 12px;
    border-radius: 10px;
    background-color: #F1F5FF;

    .progress-bar.bg-yellow {
        background-color: #E4AE63;
    }
`

const Description = styled.div`
    margin-top: 12px;
    margin-bottom: 65px;
    color: ${props => props.theme.color};
`

export default ProcessingPopup