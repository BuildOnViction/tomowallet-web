import React, { Component, createContext } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Web3 from 'web3';
import { get as _get } from 'lodash';
import { FailureComponent, LoadingComponent } from './';
import { RPC_SERVER, ENUM } from '../../constants';

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
    };

    this.handleTryProvider = this.handleTryProvider.bind(this);
    this.handleUpdateWeb3 = this.handleUpdateWeb3.bind(this);
    this.handleSetWeb3 = this.handleSetWeb3.bind(this);
  }

  componentDidMount() {
    this.handleTryProvider(window.web3, () =>
      this.handleTryProvider(Web3.givenProvider, () =>
        this.handleUpdateWeb3(Object.keys(RPC_SERVER)[0]),
      ),
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

  handleUpdateWeb3(newKey) {
    const newServer = _get(RPC_SERVER, [newKey], {});
    let newWeb3;

    if (newServer.type === 'http') {
      newWeb3 = new Web3(Web3.givenProvider || newServer.host, null, {});
    } else if (newServer.type === 'ws') {
      newWeb3 = new Web3(Web3.givenProvider || newServer.host, null, {});
    }

    this.handleSetWeb3(newWeb3);
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
    const { web3, status } = this.state;

    return (
      <Web3Context.Provider
        value={{
          web3,
          web3Status: status,
          switchRPCServer: this.handleUpdateWeb3,
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
          {({ web3, switchRPCServer }) => (
            <WrappedComponent
              {...this.props}
              web3={web3}
              switchRPCServer={switchRPCServer}
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
          {({ web3, web3Status, switchRPCServer }) =>
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
                switchRPCServer={switchRPCServer}
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
