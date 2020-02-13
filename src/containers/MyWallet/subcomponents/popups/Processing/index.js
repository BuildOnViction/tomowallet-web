import React, { PureComponent, Component } from 'react';
import { compose } from 'redux'
import styled from 'styled-components'
import { Progress, ModalHeader } from 'reactstrap'

import { MSG } from '../../../../../constants'

import { withIntl } from '../../../../../components/IntlProvider';
import Popup from '../../../../../components/Popup'

import ProcessingContent from './content';

const ProcessingPopup = (props) => {
    const { togglePopup, data } = props
    const { status, screen } = data;

    return (
        <StyledPopup
            backdrop
            isOpen={screen === 'scanning' ? status : false}
            Content={ProcessingContent}
            getContentProps={{ process: data }}
            button={{}} />
    )
}

const StyledPopup = styled(Popup)``

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