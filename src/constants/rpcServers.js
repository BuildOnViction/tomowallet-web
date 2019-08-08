export default {
  TOMOCHAIN_TESTNET: {
    type: 'http',
    host: 'https://testnet.tomochain.com',
    networkId: 89,
    hdPath: "m/44'/889'/0'/0/",
  },
  GANACHE: {
    type: 'http',
    host: 'http://127.0.0.1:7545',
    networkId: '*',
    hdPath: "m/44'/60'/0'/0/",
  },
};
