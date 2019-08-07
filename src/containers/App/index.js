// Modules
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty as _isEmpty } from 'lodash';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
// Custom Components
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
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
import './app.scss';

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
            <AppStyler className='px-0'>
              <NavigationBar isLoggedIn={isLoggedIn} />
              <div className='maincontent pt-3 pb-3'>
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
              </div>
              <Footer className='mt-5' isLoggedIn={isLoggedIn} />
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
