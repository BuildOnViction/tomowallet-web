/**
 *
 * TomoWallet - Constants - APIs
 *
 */
// Base URLs
const WALLET_TESTNET = 'https://apiwallet.testnet.tomochain.com';
const SCAN_TESTNET = 'https://scan.testnet.tomochain.com';
const WALLET_MAINNET = 'https://wallet.tomochain.com';
const SCAN_MAINNET = 'https://scan.tomochain.com';

export default {
  TOMOCHAIN_TESTNET: {
    GET_TOKENS: `${WALLET_TESTNET}/api/tokens`,
    GET_TRANSACTIONS: `${SCAN_TESTNET}/api/txs/listByAccount`,
  },
  TOMOCHAIN_MAINNET: {
    GET_TOKENS: `${WALLET_MAINNET}/api/tokens`,
    GET_TRANSACTIONS: `${SCAN_MAINNET}/api/txs/listByAccount`,
  },
};
