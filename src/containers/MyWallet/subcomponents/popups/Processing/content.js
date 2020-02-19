import React, { PureComponent, Component } from 'react';
import { compose } from 'redux'
import styled from 'styled-components'
import { Progress, ModalHeader } from 'reactstrap'
import PropTypes from 'prop-types';

import { MSG } from '../../../../../constants'

import { withIntl } from '../../../../../components/IntlProvider';
import { calculatePercentage } from '../../../../../utils';

const tipTexts = [
    'Send/Receive tokens anonymously with hidden transactions’ wallet addresses & amounts.',
    'Leave no traces behind with no leaks of personal information.',
    'Protect your identity using privacy accounts that cannot be traced.'
]

class ProcessingContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            timeouts: [],
            textId: 0,
        }
        this.setPercent = this.setPercent.bind(this);
        this.setTips = this.setTips.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
            if (this.state.process &&
                !this.state.process.status
            ) {
                return false
            }

            return true
    }

    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.process.status) {
            this.state.timeouts.forEach((timeout) => {
                clearTimeout(timeout);
            });
        }
    }

    setTips () {
        this.interval = setInterval(() => {
            let currentId = this.state.textId;
            this.setState({
                textId: currentId + 1,
            })
        }, 20000);
    }

    setPercent (total, i) {
        const timeouts = this.state.timeouts;
        timeouts.push(setTimeout(() => {
            const percent = calculatePercentage(total, i);
            this.setState({
                percent: percent < 90 ? percent : 95,
            })
        }, 1000 * i));
        this.setState({
            timeouts: timeouts
        })
    }

    componentDidMount() {
        const {
            process,
        } = this.props;
        this.setTips();
        

        if (process.status && process.total > 0 && process.screen === 'scanning') {
            const total = (process.total);
            const seconds = total / 25;
            for (let i = 1; i < seconds; i++) {
                this.setPercent(seconds, i);
            }
        }
    }
    
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    
    render () {
        const {
            intl: { formatMessage },
        } = this.props

        return (
            <Wrapper>
            <ModalHeader>{formatMessage(MSG.MY_WALLET_POPUP_PROCESSING_SCANNING_PRIVACY_TITLE)}</ModalHeader>
            <Description>Tips: {tipTexts[this.state.textId % tipTexts.length]}</Description>
            <StyledProgress color="yellow" value={this.state.percent} />
        </Wrapper>
        )
    }
}
// ===== PROP TYPES =====
ProcessingContent.propTypes = {
    /** Processing props */
    process: PropTypes.object,
    updateProcess: PropTypes.func,
};
ProcessingContent.defaultProps = {
    process: {},
    updateProcess: () => {},
}

export default compose(withIntl)(ProcessingContent);

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