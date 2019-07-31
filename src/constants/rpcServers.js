export default {
  GANACHE: {
    type: 'ws',
    host: 'ws://127.0.0.1:7545',
    networkId: '*',
  },
  TOMOCHAIN_TESTNET: {
    type: 'http',
    host: 'https://testnet.tomochain.com',
    networkId: 89,
  },
  NONEXISTENCE_NET: {
    type: 'http',
    host: 'https://mytestnet.com',
    networkId: 100,
  },
};
