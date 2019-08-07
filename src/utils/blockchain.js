/**
 *
 * TomoWallet - Utility - Blockchain supported methods
 *
 */
// ===== IMPORTS =====
// Modules
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
// ===================

// ===== METHODS =====
const mnemonicToPrivateKey = (mnemonic = '', serverConfig = {}) => {
  const { host, hdPath } = serverConfig;
  let provider;
  try {
    provider = new HDWalletProvider(mnemonic, host, 0, 1, true, hdPath);
    const web3 = new Web3(provider);
    console.warn('find private key', web3);
  } finally {
    if (provider) {
      provider.engine.stop();
    }
  }
};
// ===================

export { mnemonicToPrivateKey };
