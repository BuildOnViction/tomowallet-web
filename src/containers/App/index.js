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
import { ThemeProvider } from 'styled-components';
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
import { TextLinkBlue, theme } from '../../styles';
// Utilities & Constants
import { withWeb3 } from '../../components/Web3';
import { selectWallet, selectClipboardPopup, selectPrivacyMode, selectPrivacyWallet } from '../Global/selectors';
import { storeWallet, storePrivacyWallet } from '../Global/actions';
import { updatePrivacyBalance } from '../MyWallet/actions';
import { ROUTE, RPC_SERVER, ENUM, MSG } from '../../constants';
import './app.scss';
import {
  createWeb3,
  getBalance,
  getNetwork,
  getWalletInfo,
  getWeb3Info,
  withGlobal,
  isPrivateKey,
  getPrivacyAddressInfo,
  mnemonicToPrivateKey
} from '../../utils';
import { withIntl } from '../../components/IntlProvider';
import { Container } from 'reactstrap';


// ===== MAIN COMPONENT =====
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCheckLoggedIn = this.handleCheckLoggedIn.bind(this);
  }

  componentDidMount() {
    const {
        onStoreWallet,
        onStorePrivacyWallet,
        onLoadPrivacyBalance
    } = this.props;
    const {
        address,
        hdPath,
        recoveryPhrase
    } = getWeb3Info() || {};
    const networkKey = getNetwork() || ENUM.NETWORK_TYPE.TOMOCHAIN_MAINNET;
    const serverConfig = hdPath ?
        {
            ..._get(RPC_SERVER, [networkKey], {}),
            hdPath,
        } :
        _get(RPC_SERVER, [networkKey], {});

    if (recoveryPhrase) {
        const newWeb3 = createWeb3(recoveryPhrase, serverConfig);
        getWalletInfo(newWeb3).then(wallet => {
            // get privacy address
            const privacyObject = getPrivacyAddressInfo(
                wallet.address,
                isPrivateKey(recoveryPhrase) ? recoveryPhrase: mnemonicToPrivateKey(recoveryPhrase, serverConfig),
                serverConfig,
                true
            );

            // listen privacy events
            privacyObject.privacyWallet.on("NEW_UTXO", (utxo) => {
                let isExisted = privacyObject.privacyWallet.utxos.find((element) => {
                  return element["3"] === utxo["3"] || parseInt(element["3"]) === parseInt(utxo["3"])
                })
                if (!isExisted) {
                  privacyObject.privacyWallet.utxos.push(utxo)
                  privacyObject.privacyWallet.balance = privacyObject.privacyWallet._calTotal(privacyObject.privacyWallet.utxos)
                  onLoadPrivacyBalance(privacyObject.privacyWallet.balance.toString(10))
                }
            })
            // privacyObject.privacyWallet.on("NEW_TRANSACTION", (transaction) => {
            //   console.log(transaction)
              
            //   // onLoadPrivacyBalance(privacyObject.privacyWallet)
            // })
            onStorePrivacyWallet(privacyObject)
            onStoreWallet(wallet);
        });
    } else if (address) {
        getBalance(address, serverConfig).then(balance => {
            const walletInfo = {
                address,
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
      privacyMode,
    } = this.props;
    const isLoggedIn = this.handleCheckLoggedIn();

    const mode = privacyMode ? 'privacy' : 'main';

    return (
      <Router>
        <ThemeProvider theme={theme[mode]}>
          <AppStyler>
            <LoadingComponent />
            <NavigationBar isLoggedIn={isLoggedIn} />
            
            <Container>
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
            </Container>
            <ClipboardPopup data={clipboardData} />
          </AppStyler>
        </ThemeProvider>
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
  /** Action to show/hide loading screen */
  toggleLoading: PropTypes.func,
  /** Wallet's state */
  wallet: PropTypes.object,
};
App.defaultProps = {
  clipboardData: {},
  intl: {},
  onStoreWallet: () => {},
  toggleLoading: () => {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    clipboardData: selectClipboardPopup,
    wallet: selectWallet,
    privacyMode: selectPrivacyMode,
  });
const mapDispatchToProps = dispatch => ({
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
  onStorePrivacyWallet: wallet => dispatch(storePrivacyWallet(wallet)),
  onLoadPrivacyBalance: (wallet) => dispatch(updatePrivacyBalance(wallet)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withGlobal,
  withIntl,
  withWeb3,
)(App);
