/**
 *
 * TomoWallet - Constants - APIs
 *
 */
// Base URLs
const WALLET_TESTNET = 'https://apiwallet.testnet.tomochain.com';
const SCAN_TESTNET = 'https://scan.testnet.tomochain.com';

export default {
  GET_TOKENS: `${WALLET_TESTNET}/api/tokens`,
  GET_TRANSACTIONS: `${SCAN_TESTNET}/api/txs/listByType/normalTsx`,
};
