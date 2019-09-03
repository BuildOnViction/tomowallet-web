// Modules
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _isEmpty from 'lodash.isempty';
import _get from 'lodash.get';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
// Custom Components
import LoadingComponent from '../../components/Loading';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import ClipboardPopup from '../../components/ClipboardPopup';
import {
  WelcomePage,
  CreateWalletPage,
  ImportWallet,
  MyWallet,
} from './components/LoadableComponents';
import PrivateRoute from './components/PrivateRoute';
import AppStyler from './style';
import { TextLinkBlue } from '../../styles';
// Utilities & Constants
import { withWeb3 } from '../../components/Web3';
import { selectWallet, selectClipboardPopup } from '../Global/selectors';
import { storeWallet } from '../Global/actions';
import { ROUTE, RPC_SERVER, ENUM } from '../../constants';
import './app.scss';
import { getWeb3Info, getNetwork } from '../../utils';
import { initiateWallet, getBalance } from '../../utils/blockchain';

// ===== MAIN COMPONENT =====
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCheckLoggedIn = this.handleCheckLoggedIn.bind(this);
  }

  componentDidMount() {
    const { onStoreWallet, updateWeb3 } = this.props;
    const walletParams = getWeb3Info();
    const networkKey = getNetwork() || ENUM.NETWORK_TYPE.TOMOCHAIN_MAINNET;

    if (_get(walletParams, 'recoveryPhrase')) {
      const { recoveryPhrase } = walletParams;
      const serverConfig = _get(RPC_SERVER, [networkKey], {});
      initiateWallet(recoveryPhrase, serverConfig).then(
        ({ web3, walletInfo }) => {
          updateWeb3(web3);
          onStoreWallet(walletInfo);
        },
      );
    } else if (_get(walletParams, 'address')) {
      getBalance(walletParams.address).then(balance => {
        const walletInfo = {
          address: walletParams.address,
          balance,
        };
        onStoreWallet(walletInfo);
      });
    }
  }

  handleCheckLoggedIn() {
    const { wallet } = this.props;
    return !_isEmpty(wallet) || !!getWeb3Info();
  }

  render() {
    const { clipboardData } = this.props;
    const isLoggedIn = this.handleCheckLoggedIn();

    return (
      <Router>
        <AppStyler>
          <LoadingComponent />
          <NavigationBar isLoggedIn={isLoggedIn} />
          <div className='maincontent d-flex d-md-none align-items-center'>
            <div className='text-center'>
              <p>
                Sorry! We don’t support TomoWallet web version on mobile
                browsers. Please download app version to access TomoWallet.
              </p>
              <p>
                Download TomoWallet app
                <br />
                <TextLinkBlue href='http://l.ead.me/bb0oA6'>
                  Link: http://l.ead.me/bb0oA6
                </TextLinkBlue>
              </p>
            </div>
          </div>
          <div className='maincontent pt-3 pb-3 d-none d-md-block'>
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
          <ClipboardPopup data={clipboardData} />
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
    clipboardData: selectClipboardPopup,
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
