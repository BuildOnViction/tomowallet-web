export default {
  TOMOCHAIN_TESTNET: {
    type: 'ws',
    host: 'wss://testnet.tomochain.com/ws',
    networkId: 89,
    hdPath: "m/44'/889'/0'/0/",
  },
  GANACHE: {
    type: 'ws',
    host: 'ws://127.0.0.1:7545',
    networkId: '*',
    hdPath: "m/44'/60'/0'/0/",
  },
};
