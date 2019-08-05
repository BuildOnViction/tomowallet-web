// Modules
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get as _get } from 'lodash';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
// Custom Components
import NavigationBar from '../../components/NavigationBar';
import WelcomePage from '../v1.0/Welcome';
import CreateWalletPage from '../v1.0/WalletCreation';
// -- TO-DO: Update style for App component in the following styled component:
import AppStyler from './style';
// Utilities & Constants
import { Web3Provider } from '../../components/Web3';
import { CustomIntlProvider } from '../../components/IntlProvider';
import { selectAccount } from '../Global/selectors';
import { ROUTE } from '../../constants';

// ===== MAIN COMPONENT =====
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCheckLoggedIn = this.handleCheckLoggedIn.bind(this);
  }

  handleCheckLoggedIn() {
    const { account } = this.props;
    return _get(account, 'address', false);
  }

  render() {
    const isLoggedIn = this.handleCheckLoggedIn();

    return (
      <Router>
        <Web3Provider>
          <CustomIntlProvider>
            <AppStyler fluid className='px-0'>
              <Row noGutters>
                <Col
                  xs={12}
                  sm={12}
                  md={{ size: 8, offset: 2 }}
                  lg={{ size: 8, offset: 2 }}
                >
                  <NavigationBar isLoggedIn={isLoggedIn} />
                </Col>
              </Row>
              <Row noGutters>
                <Col
                  xs={12}
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
    account: selectAccount,
  });
// ======================

export default connect(mapStateToProps)(App);
