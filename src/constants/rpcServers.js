export default {
  TOMOCHAIN_MAINNET: {
    type: 'http',
    host: 'https://rpc.devnet.tomochain.com',
    ws: 'wss://ws.devnet.tomochain.com',
    networkId: 89,
    hdPath: "m/44'/889'/0'/0/",
    privacyContract: '0x959ac7C61a0b87c0B41aeaE268512CCa4c3e2573'
  },
  TOMOCHAIN_TESTNET: {
    type: 'http',
    host: 'https://rpc.devnet.tomochain.com',
    ws: 'wss://ws.devnet.tomochain.com',
    networkId: 99,
    hdPath: "m/44'/889'/0'/0/",
    privacyContract: '0xE307329FB04fb9DD4368909D3B2Ed24dA0372B20'
  },
};
