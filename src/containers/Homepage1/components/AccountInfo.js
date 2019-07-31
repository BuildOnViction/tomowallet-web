import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import { isEqual as _isEqual } from 'lodash';

class AccountInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      balance: '',
    };

    this.handleGetAccounts = this.handleGetAccounts.bind(this);
    this.handleGetBalance = this.handleGetBalance.bind(this);
  }

  componentDidMount() {
    this.handleGetAccounts();
  }

  componentDidUpdate({ web3: prevWeb3, txHash: prevTxHash }) {
    const { web3, txHash } = this.props;
    if (
      !_isEqual(prevWeb3._provider.host, web3._provider.host) ||
      !_isEqual(prevTxHash, txHash)
    ) {
      this.handleGetAccounts();
    }
  }

  handleGetAccounts() {
    const { web3 } = this.props;
    if (web3) {
      web3.eth.getAccounts().then(accounts => {
        this.setState(
          {
            accounts: accounts.map(acc => ({
              address: acc,
            })),
          },
          () =>
            this.state.accounts.map(acc => this.handleGetBalance(acc.address)),
        );
      });
    }
  }

  handleGetBalance(accountAddress) {
    const { web3 } = this.props;
    if (accountAddress) {
      web3.eth.getBalance(accountAddress).then(balance => {
        this.setState(({ accounts }) => ({
          accounts: accounts.map(acc =>
            acc.address === accountAddress
              ? {
                  ...acc,
                  balance: web3.utils.fromWei(balance),
                }
              : acc,
          ),
        }));
      });
    }
  }

  render() {
    const { accounts } = this.state;
    return (
      <Table dark striped>
        <thead>
          <tr>
            <th colSpan='3'>ACCOUNTS</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc, accIdx) => (
            <tr key={`account_${accIdx + 1}`}>
              <td>{accIdx + 1}</td>
              <td>{acc.address}</td>
              <td>{acc.balance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default AccountInfo;
