/**
 *
 * TomoWallet - Application Container
 *
 * This component contains all possible pages of this website,
 * with supported router methods to navigate between pages & handle log-in cases
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import { ROUTE, RPC_SERVER, ENUM, MSG } from '../../constants';
import './app.scss';
import {
  createWeb3,
  getBalance,
  getNetwork,
  getWalletInfo,
  getWeb3Info,
} from '../../utils';
import { withIntl } from '../../components/IntlProvider';

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
    const serverConfig = _get(RPC_SERVER, [networkKey], {});

    if (_get(walletParams, 'recoveryPhrase')) {
      const { recoveryPhrase } = walletParams;
      const newWeb3 = createWeb3(recoveryPhrase, serverConfig);
      getWalletInfo(newWeb3).then(wallet => {
        updateWeb3(newWeb3);
        onStoreWallet(wallet);
      });
    } else if (_get(walletParams, 'address')) {
      getBalance(walletParams.address, serverConfig).then(balance => {
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
    const {
      clipboardData,
      intl: { formatMessage },
    } = this.props;
    const isLoggedIn = this.handleCheckLoggedIn();

    return (
      <Router>
        <AppStyler>
          <LoadingComponent />
          <NavigationBar isLoggedIn={isLoggedIn} />
          <div className='maincontent d-flex d-md-none align-items-center'>
            <div className='text-center'>
              <p>
                {formatMessage(
                  MSG.WELCOME_NOTIFICATION_MOBILE_BROWSER_NOT_SUPPORTED,
                )}
              </p>
              <p>
                {formatMessage(MSG.WELCOME_NOTIFICATION_MOBILE_DOWNLOAD_PART_1)}
                <br />
                <TextLinkBlue href='http://l.ead.me/bb0oA6'>
                  {formatMessage(
                    MSG.WELCOME_NOTIFICATION_MOBILE_DOWNLOAD_PART_2,
                  )}
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

// ===== PROP TYPES =====
App.propTypes = {
  /** Clipboard popup's state */
  clipboardData: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to save new wallet data into state */
  onStoreWallet: PropTypes.func,
  /** Action to save new Web3 provider into state */
  updateWeb3: PropTypes.func,
  /** Wallet's state */
  wallet: PropTypes.object,
};
App.defaultProps = {
  clipboardData: {},
  intl: {},
  onStoreWallet: () => {},
  updateWeb3: () => {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    clipboardData: selectClipboardPopup,
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
  withConnect,
  withIntl,
  withWeb3,
)(App);
