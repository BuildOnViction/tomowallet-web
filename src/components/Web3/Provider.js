/**
 *
 * TomoWallet - Web3 Provider
 *
 * This component provides initiated Web3 object with supported methods,
 * in order to handle blockchain transactions throughout the application.
 */
// ===== IMPORTS =====
// Modules
import React, { Component, createContext } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { createStructuredSelector } from 'reselect';
import Web3 from 'web3';
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import _isEqual from 'lodash.isequal';
// Custom Components
import { FailureComponent, LoadingComponent } from './';
// Utilities & Constants
import {
  createWeb3,
  getNetwork,
  getWalletInfo,
  getWeb3Info,
  removeWeb3Info,
  setNetwork,
  setWeb3Info,
  withGlobal,
} from '../../utils';
import { RPC_SERVER, ENUM } from '../../constants';
import { storeWallet, releaseWallet } from '../../containers/Global/actions';
import { selectWallet } from '../../containers/Global/selectors';
// ===================

// ===== Web3 Context =====
const Web3Context = createContext({
  web3: {},
  web3Status: '',
  switchRPCServer: () => {},
});
// ========================

// ===== Web3 Provider Component =====
class Web3Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: {},
      status: ENUM.WEB3_STATUSES.LOADING,
      error: null,
      rpcServer: {},
    };

    this.handleInitiateDefaultWeb3 = this.handleInitiateDefaultWeb3.bind(this);
    this.handleRemoveMetaMaskProvider = this.handleRemoveMetaMaskProvider.bind(
      this,
    );
    this.handleSetMetaMaskProvider = this.handleSetMetaMaskProvider.bind(this);
    this.handleSetWeb3 = this.handleSetWeb3.bind(this);
    this.handleTryProvider = this.handleTryProvider.bind(this);
    this.handleUpdateMetaMaskAccount = this.handleUpdateMetaMaskAccount.bind(
      this,
    );
    this.handleUpdateRpcServer = this.handleUpdateRpcServer.bind(this);

    this.updateMetaMaskAccountListener = () => {
      this.handleUpdateMetaMaskAccount();
    };
  }

  componentDidMount() {
    const web3Info = getWeb3Info();
    if (
      _isEqual(_get(web3Info, 'loginType'), ENUM.LOGIN_TYPE.META_MASK) &&
      Web3.givenProvider
    ) {
      this.handleSetMetaMaskProvider();
    } else if (_get(web3Info, 'recoveryPhrase')) {
      const { recoveryPhrase } = web3Info;
      const networkKey = getNetwork() || ENUM.NETWORK_TYPE.TOMOCHAIN_TESETNET;
      const rpcServer = _get(web3Info, 'hdPath')
        ? {
            ..._get(RPC_SERVER, [networkKey]),
            hdPath: _get(web3Info, 'hdPath'),
          }
        : _get(RPC_SERVER, [networkKey]);
      const newWeb3 = createWeb3(recoveryPhrase, rpcServer);

      this.handleSetWeb3(newWeb3);
      this.setState({
        rpcServer,
      });
    } else {
      this.handleInitiateDefaultWeb3();
    }
  }

  componentWillUnmount() {
    this.handleRemoveMetaMaskProvider();
  }

  handleInitiateDefaultWeb3() {
    const networkKey = getNetwork();
    if (networkKey) {
      this.handleUpdateRpcServer(networkKey);
    } else {
      this.handleUpdateRpcServer(ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET);
    }
  }

  handleRemoveMetaMaskProvider() {
    if (this.checkMetaMaskLogin) {
      clearInterval(this.checkMetaMaskLogin);
      this.checkMetaMaskLogin = null;
    }
    if (window.ethereum) {
      window.ethereum.removeListener(
        'accountsChanged',
        this.updateMetaMaskAccountListener,
      );
    }
  }

  handleSetMetaMaskProvider() {
    const { onReleaseWallet } = this.props;

    if (Web3.givenProvider) {
      window.ethereum.enable().then(() => {
        this.handleUpdateMetaMaskAccount();
        window.ethereum.on(
          'accountsChanged',
          this.updateMetaMaskAccountListener,
        );
        if (!this.checkMetaMaskLogin) {
          this.checkMetaMaskLogin = setInterval(() => {
            Web3.givenProvider._metamask.isUnlocked().then(bool => {
              const web3Info = getWeb3Info();
              if (
                !_isEmpty(web3Info) &&
                web3Info.loginType === ENUM.LOGIN_TYPE.META_MASK &&
                !bool
              ) {
                removeWeb3Info();
                onReleaseWallet();
                this.handleRemoveMetaMaskProvider();
              }
            });
          }, 1000);
        }
      });
    }
  }

  handleSetWeb3(web3) {
    this.setState({ web3: new Web3(web3) }, () =>
      this.state.web3.eth.net
        .isListening()
        .then(() =>
          this.setState({
            status: ENUM.WEB3_STATUSES.INITIALIZED,
          }),
        )
        .catch(() => this.setState({ status: ENUM.WEB3_STATUSES.FAILED })),
    );
  }

  handleTryProvider(web3, next = null) {
    if (web3) {
      this.handleSetWeb3(web3);
    } else if (next) {
      next();
    } else {
      this.setState({
        status: ENUM.WEB3_STATUSES.FAILED,
        error: 'Unexpected Web3 error!',
      });
    }
  }

  handleUpdateMetaMaskAccount() {
    const { onStoreWallet } = this.props || {};
    const newWeb3 = new Web3(Web3.givenProvider);

    Web3.givenProvider._metamask.isUnlocked().then(bool => {
      if (bool) {
        const networkKey = getNetwork() || ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;
        const rpcServer = _get(RPC_SERVER, [networkKey]);
        this.handleSetWeb3(newWeb3);
        this.setState({
          rpcServer,
        });
        getWalletInfo(newWeb3).then(walletInfo => {
          if (walletInfo) {
            setWeb3Info({
              address: walletInfo.address,
              loginType: ENUM.LOGIN_TYPE.META_MASK,
            });
            onStoreWallet(walletInfo);
          }
        });
      }
    });
  }

  handleUpdateRpcServer(newKey) {
    this.setState(
      {
        rpcServer: _get(RPC_SERVER, newKey, {}),
      },
      () => {
        setNetwork(newKey);
        const newWeb3 = createWeb3(null, this.state.rpcServer);
        this.handleSetWeb3(newWeb3);
      },
    );
  }

  render() {
    const { children } = this.props;
    const { web3, status, rpcServer } = this.state;

    return (
      <Web3Context.Provider
        value={{
          web3,
          web3Status: status,
          rpcServer,
          removeMetaMaskProvider: this.handleRemoveMetaMaskProvider,
          setMetaMaskProvider: this.handleSetMetaMaskProvider,
          switchRPCServer: this.handleUpdateRpcServer,
          updateWeb3: this.handleSetWeb3,
        }}
      >
        {children}
      </Web3Context.Provider>
    );
  }
}

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    wallet: selectWallet,
  });
const mapDispatchToProps = dispatch => ({
  onReleaseWallet: () => dispatch(releaseWallet()),
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withGlobal,
)(Web3Provider);
// ===================================

// ===== Web3 Injection =====
export const withWeb3 = WrappedComponent => {
  class Web3Consumer extends Component {
    render() {
      return (
        <Web3Context.Consumer>
          {({
            web3,
            rpcServer,
            removeMetaMaskProvider,
            setMetaMaskProvider,
            switchRPCServer,
            updateWeb3,
          }) => (
            <WrappedComponent
              {...this.props}
              web3={web3}
              rpcServer={rpcServer}
              removeMetaMaskProvider={removeMetaMaskProvider}
              setMetaMaskProvider={setMetaMaskProvider}
              switchRPCServer={switchRPCServer}
              updateWeb3={updateWeb3}
            />
          )}
        </Web3Context.Consumer>
      );
    }
  }

  if (WrappedComponent.defaultProps) {
    Web3Consumer.defaultProps = { ...WrappedComponent.defaultProps };
  }

  return hoistNonReactStatics(Web3Consumer, WrappedComponent);
};

export const withWeb3AndState = WrappedComponent => {
  class Web3AndStateConsumer extends Component {
    render() {
      return (
        <Web3Context.Consumer>
          {({
            web3,
            web3Status,
            rpcServer,
            removeMetaMaskProvider,
            setMetaMaskProvider,
            switchRPCServer,
            updateWeb3,
          }) =>
            (web3Status === ENUM.WEB3_STATUSES.LOADING && (
              <LoadingComponent />
            )) ||
            (web3Status === ENUM.WEB3_STATUSES.FAILED && (
              <FailureComponent />
            )) ||
            (web3Status === ENUM.WEB3_STATUSES.INITIALIZED && (
              <WrappedComponent
                {...this.props}
                web3={web3}
                web3Status={web3Status}
                rpcServer={rpcServer}
                removeMetaMaskProvider={removeMetaMaskProvider}
                setMetaMaskProvider={setMetaMaskProvider}
                switchRPCServer={switchRPCServer}
                updateWeb3={updateWeb3}
              />
            ))
          }
        </Web3Context.Consumer>
      );
    }
  }

  if (WrappedComponent.defaultProps) {
    Web3AndStateConsumer.defaultProps = { ...WrappedComponent.defaultProps };
  }

  return hoistNonReactStatics(Web3AndStateConsumer, WrappedComponent);
};
// ==========================
