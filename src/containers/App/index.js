// Modules
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get as _get } from 'lodash';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
// Custom Components
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from '../../components/NavigationBar';
import HomePage from '../HomePage';
import RecoveryPhrasePage from '../RecoveryPhrase';
import ImportWalletPage from '../ImportWallet';
import MyWallet from '../Homepage1';
// Utilities, Constants & Styles
import { Web3Provider } from '../../components/Web3';
import { setLanguage } from '../Global/actions';
import { selectAccount, selectLanguage } from '../Global/selectors';
import { ROUTE } from '../../constants';
import AppStyler from './style';

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
    const { language, onSetLanguage } = this.props;
    const isLoggedIn = this.handleCheckLoggedIn();

    return (
      <Router>
        <Web3Provider>
          <AppStyler fluid className='px-0'>
            <Row noGutters>
              <Col
                xs={12}
                sm={12}
                md={{ size: 10, offset: 1 }}
                lg={{ size: 10, offset: 1 }}
              >
                <NavigationBar
                  isLoggedIn={isLoggedIn}
                  language={language}
                  setLanguage={onSetLanguage}
                />
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <Route
                  path={ROUTE.HOMEPAGE}
                  render={() =>
                    isLoggedIn ? (
                      <Redirect strict to={ROUTE.MY_WALLET} />
                    ) : (
                      <HomePage />
                    )
                  }
                />
                <Route
                  path={ROUTE.RECOVERY_PHRASE}
                  render={() =>
                    isLoggedIn ? (
                      <Redirect strict to={ROUTE.MY_WALLET} />
                    ) : (
                      <RecoveryPhrasePage />
                    )
                  }
                />
                <Route
                  path={ROUTE.IMPORT_WALLET}
                  render={() =>
                    isLoggedIn ? (
                      <Redirect strict to={ROUTE.MY_WALLET} />
                    ) : (
                      <ImportWalletPage />
                    )
                  }
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={ROUTE.MY_WALLET}
                  component={MyWallet}
                />
                <Route
                  path={ROUTE.DEFAULT}
                  render={() => <Redirect strict to={ROUTE.HOMEPAGE} />}
                />
              </Col>
            </Row>
          </AppStyler>
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
    language: selectLanguage,
  });

const mapDispatchToProps = dispatch => ({
  onSetLanguage: language => dispatch(setLanguage(language)),
});
// ======================

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
