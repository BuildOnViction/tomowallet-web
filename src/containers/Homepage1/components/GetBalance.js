import React, { PureComponent } from 'react';
import {  } from 'reactstrap';

class GetBalance extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      privateKey: '',
      balance: '',
    };

    this.handleChangePK = this.handleChangePK.bind(this);
    this.handleGetBalance = this.handleGetBalance.bind(this);
  }

  handleChangePK(e) {
    this.setState({
      privateKey: e.target.value,
    });
  }

  handleGetBalance(e) {
    const { privateKey } = this.state;

    if (e.keyCode === 13) {
      const { web3 } = this.props;

      const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
      if (account) {
        web3.eth
          .getBalance(account.address)
          .then(balance =>
            this.setState({ balance: web3.utils.fromWei(balance, 'ether') }),
          );
      }
    }
  }

  render() {
    const { privateKey, balance } = this.state;
    return (
      <div>
        <input
          type='text'
          name='privateKey'
          value={privateKey}
          onChange={this.handleChangePK}
          onKeyDown={this.handleGetBalance}
        />
        <span>{` => ${balance || '--'} TOMO`}</span>
      </div>
    );
  }
}

export default GetBalance;
