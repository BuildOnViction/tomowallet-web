export default {
  TOMOCHAIN_MAINNET: {
    type: 'http',
    host: 'https://rpc.tomochain.com',
    ws: 'wss://ws.tomochain.com',
    networkId: 88,
    hdPath: "m/44'/889'/0'/0/",
    privacyContract: ''
  },
  TOMOCHAIN_TESTNET: {
    type: 'http',
    host: 'https://rpc.testnet.tomochain.com',
    ws: 'wss://ws.testnet.tomochain.com',
    networkId: 89,
    hdPath: "m/44'/889'/0'/0/",
    privacyContract: '0x2D94946815076471E204792798951a517cE2F5bf'
  },
};
