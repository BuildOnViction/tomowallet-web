/**
 *
 * TomoWallet - Web3 Provider
 *
 */
// ===== IMPORTS =====
// Modules
import React, { Component, createContext } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Web3 from 'web3';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
// Utilities & Constants
import { FailureComponent, LoadingComponent } from './';
import { getWeb3Info, generateWeb3 } from '../../utils';
import { RPC_SERVER, ENUM, LIST } from '../../constants';
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

    // this.handleTryProvider = this.handleTryProvider.bind(this);
    this.handleUpdateRpcServer = this.handleUpdateRpcServer.bind(this);
    this.handleSetWeb3 = this.handleSetWeb3.bind(this);
  }

  componentDidMount() {
    // this.handleTryProvider(localStorage.getItem('web3'), () =>
    //   this.handleUpdateRpcServer(Object.keys(RPC_SERVER)[0]),
    // );
    const web3Info = getWeb3Info();
    if (web3Info) {
      const { recoveryPhrase, rpcServer } = web3Info;
      const newWeb3 = generateWeb3(recoveryPhrase, rpcServer);

      this.handleSetWeb3(newWeb3);
    } else {
      const storedNetwork = LIST.NETWORKS.find(
        opt => opt.value === localStorage.getItem('network'),
      );
      if (!_isEmpty(storedNetwork)) {
        this.handleUpdateRpcServer(storedNetwork.value);
      } else {
        this.handleUpdateRpcServer(Object.keys(RPC_SERVER)[0]);
      }
    }
  }

  // handleTryProvider(web3, next = null) {
  //   if (web3) {
  //     this.handleSetWeb3(web3);
  //   } else if (next) {
  //     next();
  //   } else {
  //     this.setState({
  //       status: ENUM.WEB3_STATUSES.FAILED,
  //       error: 'Unexpected Web3 error!',
  //     });
  //   }
  // }

  handleUpdateRpcServer(newKey) {
    this.setState(
      {
        rpcServer: _get(RPC_SERVER, newKey, {}),
      },
      () => {
        localStorage.setItem('network', newKey);
        const newWeb3 = new Web3(
          Web3.givenProvider || this.state.rpcServer.host,
          null,
          {},
        );
        this.handleSetWeb3(newWeb3);
      },
    );
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

  render() {
    const { children } = this.props;
    const { web3, status, rpcServer } = this.state;

    return (
      <Web3Context.Provider
        value={{
          web3,
          web3Status: status,
          rpcServer,
          switchRPCServer: this.handleUpdateRpcServer,
          updateWeb3: this.handleSetWeb3,
        }}
      >
        {children}
      </Web3Context.Provider>
    );
  }
}

export default Web3Provider;
// ===================================

// ===== Web3 Injection =====
export const withWeb3 = WrappedComponent => {
  class Web3Consumer extends Component {
    render() {
      return (
        <Web3Context.Consumer>
          {({ web3, rpcServer, switchRPCServer, updateWeb3 }) => (
            <WrappedComponent
              {...this.props}
              web3={web3}
              rpcServer={rpcServer}
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
          {({ web3, web3Status, rpcServer, switchRPCServer, updateWeb3 }) =>
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
