import React, { PureComponent } from 'react';
// import { isEqual as _isEqual } from 'lodash';
import { Container, Row, Col } from 'reactstrap';
import AccountInfo from './components/AccountInfo';
// import GetBalance from './components/GetBalance';
// import SendToken from './components/SendToken';
import SendMoney from './components/SendMoney';
import { withWeb3AndState } from '../../components/Web3';

class Homepage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      txHash: '',
    };
    this.handleReloadPage = this.handleReloadPage.bind(this);
  }

  handleReloadPage(newHash) {
    this.setState({ txHash: newHash });
  }

  render() {
    const { web3 } = this.props;
    const { txHash } = this.state;
    console.warn('render Hompage');

    return (
      <Container fluid className='px-0'>
        <Row noGutters>
          <Col>
            <AccountInfo web3={web3} txHash={txHash} />
          </Col>
        </Row>
        {/* <Row noGutters>
          <Col>
            <GetBalance web3={web3} />
          </Col>
        </Row> */}
        {/* <Row noGutters>
          <Col>
            <SendToken web3={web3} activeAccount={account} />
          </Col>
        </Row> */}
        <Row noGutters>
          <Col>
            <SendMoney web3={web3} reloadHomepage={this.handleReloadPage} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withWeb3AndState(Homepage);
