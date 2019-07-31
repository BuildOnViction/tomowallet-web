import React, { PureComponent } from 'react';
import { isEqual as _isEqual, get as _get } from 'lodash';
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Button,
  ButtonGroup,
} from 'reactstrap';
import { TransferABI } from '../../../contracts';

class SendToken extends PureComponent {
  constructor(props) {
    super(props);

    this.deployedContractAddress = '0x808e346b3eabc2b018ac07ff2c0b78c50178caf9';

    this.state = {
      contract: {},
      address: '',
      amount: '',
      token: {
        balance: '',
        decimals: 18,
        symbol: 'TOKEN',
      },
    };

    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleTransferToken = this.handleTransferToken.bind(this);
    this.handleGetContractInfo = this.handleGetContractInfo.bind(this);
    this.handleInitiateContract = this.handleInitiateContract.bind(this);
    this.handleReceiveToken = this.handleReceiveToken.bind(this);
  }

  componentDidMount() {
    this.handleInitiateContract();
  }

  componentDidUpdate(prevProps) {
    if (
      !_isEqual(
        _get(prevProps, 'activeAccount'),
        _get(this.props, 'activeAccount'),
      )
    ) {
      new Promise(resolve => {
        this.handleInitiateContract();
        resolve();
      }).then(this.handleGetContractInfo);
    }
  }

  handleInitiateContract() {
    const { web3 } = this.props;
    let newContract;
    newContract = new web3.eth.Contract(
      TransferABI,
      this.deployedContractAddress,
    );
    this.setState({
      contract: newContract,
    });
  }

  handleChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  handleChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  handleTransferToken() {
    const { address, amount, contract, token } = this.state;
    const { web3, activeAccount } = this.props;

    contract.methods
      .transfer(
        address,
        web3.utils
          .toBN(amount)
          .mul(web3.utils.toBN(10 ** token.decimals))
          .toString(),
      )
      .send({
        from: activeAccount,
        gasPrice: '1000000',
        gasLimit: 200000,
      })
      .then(this.handleGetContractInfo);
  }

  handleReceiveToken() {
    const { web3, activeAccount } = this.props;
    const { address, amount, contract, token } = this.state;

    contract.methods
      .transfer(
        activeAccount,
        web3.utils
          .toBN(amount)
          .mul(web3.utils.toBN(10 ** token.decimals))
          .toString(),
      )
      .send({
        from: address,
        gasPrice: '1000000',
        gasLimit: 200000,
      })
      .then(this.handleGetContractInfo);
  }

  handleGetContractInfo() {
    const { activeAccount } = this.props;
    const { contract } = this.state;

    if (contract && activeAccount) {
      Promise.all([
        contract.methods.balanceOf(activeAccount).call({ from: activeAccount }),
        contract.methods.symbol().call({ from: activeAccount }),
        contract.methods.decimals().call({ from: activeAccount }),
      ]).then(([balance, symbol, decimals]) =>
        this.setState({
          token: {
            balance,
            symbol,
            decimals,
          },
        }),
      );
    }
  }

  render() {
    const { web3 } = this.props;
    const { address, amount, token } = this.state;
    console.warn('SendToken', token);

    const convertedBalance = token.balance
      ? web3.utils
          .toBN(token.balance)
          .div(web3.utils.toBN(10 ** token.decimals))
          .toString()
      : '--';

    return (
      <Container fluid>
        <Row>
          <Col>Send Token:</Col>
        </Row>
        <Row className='align-items-end'>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>Recipient Address:</Label>
            <Input
              name='address'
              value={address}
              onChange={this.handleChangeAddress}
              className='full-width'
            />
          </Col>
          <Col xs={3} sm={3} md={3} lg={2}>
            <Label>Amount:</Label>
            <Input
              type='number'
              name='amount'
              value={amount}
              onChange={this.handleChangeAmount}
              className='full-width'
            />
          </Col>
        </Row>
        <Row className='my-3'>
          <Col>
            <ButtonGroup>
              <Button color='primary' onClick={this.handleReceiveToken}>
                {'Receive <-'}
              </Button>
              <Button color='secondary' onClick={this.handleTransferToken}>
                {'Send ->'}
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <span>{`=> Current Token Amount: ${convertedBalance} ${
              token.symbol
            }`}</span>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SendToken;
