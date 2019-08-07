// Modules
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty as _isEmpty } from 'lodash';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
// Custom Components
import NavigationBar from '../../components/NavigationBar';
import WelcomePage from '../v1.0/Welcome';
import CreateWalletPage from '../v1.0/WalletCreation';
import ImportWallet from '../v1.0/ImportWallet';
// -- TO-DO: Update style for App component in the following styled component:
import AppStyler from './style';
// Utilities & Constants
import { Web3Provider } from '../../components/Web3';
import { CustomIntlProvider } from '../../components/IntlProvider';
import { selectWallet } from '../Global/selectors';
import { ROUTE } from '../../constants';

// ===== MAIN COMPONENT =====
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCheckLoggedIn = this.handleCheckLoggedIn.bind(this);
  }

  handleCheckLoggedIn() {
    const { wallet } = this.props;
    return !_isEmpty(wallet);
  }

  render() {
    const isLoggedIn = this.handleCheckLoggedIn();

    return (
      <Router>
        <Web3Provider>
          <CustomIntlProvider>
            <AppStyler fluid className='px-0'>
              <Row>
                <Col
                  sm={12}
                  md={{ size: 8, offset: 2 }}
                  lg={{ size: 8, offset: 2 }}
                >
                  <NavigationBar isLoggedIn={isLoggedIn} />
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col
                  sm={12}
                  md={{ size: 8, offset: 2 }}
                  lg={{ size: 8, offset: 2 }}
                >
                  <Route
                    path={ROUTE.LOGIN}
                    render={() =>
                      isLoggedIn ? (
                        <Redirect strict to={ROUTE.MY_WALLET} />
                      ) : (
                        <WelcomePage />
                      )
                    }
                  />
                  <Route
                    path={ROUTE.CREATE_WALLET}
                    render={() =>
                      isLoggedIn ? (
                        <Redirect strict to={ROUTE.MY_WALLET} />
                      ) : (
                        <CreateWalletPage />
                      )
                    }
                  />
                  <Route
                    path={ROUTE.IMPORT_WALLET}
                    render={() =>
                      isLoggedIn ? (
                        <Redirect strict to={ROUTE.MY_WALLET} />
                      ) : (
                        <ImportWallet />
                      )
                    }
                  />
                  <Route
                    path={ROUTE.DEFAULT}
                    render={() => <Redirect strict to={ROUTE.LOGIN} />}
                  />
                </Col>
              </Row>
            </AppStyler>
          </CustomIntlProvider>
        </Web3Provider>
      </Router>
    );
  }
}
// ==========================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    wallet: selectWallet,
  });
// ======================

export default connect(mapStateToProps)(App);
