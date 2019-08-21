// Modules
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _isEmpty from 'lodash.isempty';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// Custom Components
import LoadingComponent from '../../components/Loading';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import {
  WelcomePage,
  CreateWalletPage,
  ImportWallet,
  MyWallet,
} from './components/LoadableComponents';
import PrivateRoute from './components/PrivateRoute';
import AppStyler from './style';
// Utilities & Constants
import { withWeb3 } from '../../components/Web3';
import { selectWallet } from '../Global/selectors';
import { storeWallet } from '../Global/actions';
import { ROUTE } from '../../constants';
import './app.scss';
import { getWeb3Info, getLedger } from '../../utils';
import { initiateWallet } from '../../utils/blockchain';

// ===== MAIN COMPONENT =====
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCheckLoggedIn = this.handleCheckLoggedIn.bind(this);
  }

  componentDidMount() {
    const { onStoreWallet, updateWeb3 } = this.props;
    const walletParams = getWeb3Info();
    const ledger = getLedger();

    if (walletParams) {
      const { recoveryPhrase, rpcServer } = walletParams;
      initiateWallet(recoveryPhrase, rpcServer).then(({ web3, walletInfo }) => {
        updateWeb3(web3);
        onStoreWallet(walletInfo);
      });
    } else if (ledger) {
      onStoreWallet(ledger);
    }
  }

  handleCheckLoggedIn() {
    const { wallet } = this.props;
    return !_isEmpty(wallet) || !!getWeb3Info() || !!getLedger();
  }

  render() {
    const isLoggedIn = this.handleCheckLoggedIn();

    return (
      <Router>
        <AppStyler>
          <LoadingComponent />
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
            <PrivateRoute
              isLoggedIn={isLoggedIn}
              path={ROUTE.MY_WALLET}
              component={MyWallet}
            />
            <Route
              strict
              path={ROUTE.DEFAULT}
              render={() => <Redirect to={ROUTE.LOGIN} />}
            />
          </div>
          <Footer className='mt-5' isLoggedIn={isLoggedIn} />
        </AppStyler>
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
const mapDispatchToProps = dispatch => ({
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withWeb3,
  withConnect,
)(App);
