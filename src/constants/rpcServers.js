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
    host: 'http://206.189.39.242:8545',
    ws: 'ws://206.189.39.242:8546',
    networkId: 89,
    hdPath: "m/44'/889'/0'/0/",
    privacyContract: '0x8Bd1936717f1176539C6EfD8f7Ff1c831c271fF4'
  },
};
