import React, { PureComponent } from 'react';
import { get as _get } from 'lodash';
import { Container, Row, Col, Input, Label, Button } from 'reactstrap';

class SendMoney extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sender: '',
      recipient: '',
      amount: '',
      transactionStatus: '',
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleCheckUnlock = this.handleCheckUnlock.bind(this);
    this.handleSendMoney = this.handleSendMoney.bind(this);
  }

  handleChangeInput(name, event) {
    this.setState({
      [name]: _get(event, 'target.value', ''),
      transactionStatus: '',
    });
  }

  handleCheckUnlock() {
    const { web3 } = this.props;
    const { sender } = this.state;

    return new Promise((resolve, reject) => {
      try {
        web3.eth.sign('', sender);
        resolve();
      } catch {
        reject('[FAILED] Account is invalid, or locked!');
      }
    });
  }

  handleSendMoney() {
    const { web3, reloadHomepage } = this.props;
    const { sender, recipient, amount } = this.state;

    if (sender && recipient && amount) {
      Promise.all([this.handleCheckUnlock()])
        .then(() => {
          this.setState({
            transactionStatus: 'Pending',
          });
          web3.eth
            .sendTransaction({
              from: sender,
              to: recipient,
              value: web3.utils.toWei(amount),
            })
            .then(result => {
              console.warn('Send Successfully!', result);

              this.setState({
                transactionStatus: 'Success',
              });
              reloadHomepage(result.transactionHash);
            })
            .catch(() => {
              this.setState({
                transactionStatus: 'Failed',
              });
            });
        })
        .catch(msg => this.setState({ transactionStatus: msg }));
    }
  }

  render() {
    const { sender, recipient, amount, transactionStatus } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col>
            <span>Transaction to send ETH to other wallet:</span>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>Sender:</Label>
            <Input
              name='sender'
              value={sender}
              onChange={e => this.handleChangeInput('sender', e)}
              className='full-width'
            />
          </Col>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>Recipient:</Label>
            <Input
              name='recipient'
              value={recipient}
              onChange={e => this.handleChangeInput('recipient', e)}
              className='full-width'
            />
          </Col>
          <Col xs={3} sm={3} md={3} lg={2}>
            <Label>Amount:</Label>
            <Input
              type='number'
              name='amount'
              value={amount}
              onChange={e => this.handleChangeInput('amount', e)}
              className='full-width'
            />
          </Col>
        </Row>
        <Row className='my-3'>
          <Col>
            <Button onClick={this.handleSendMoney}>Send</Button>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col>
            <span>{`=> Transaction status: ${transactionStatus}`}</span>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SendMoney;
