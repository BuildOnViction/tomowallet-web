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
/**
 * mnemonicToPrivateKey
 *
 * Get private key from mnemonic and RPC server's HD path
 * @param {String} mnemonic A string of 12 words
 * @param {Object} serverConfig Current RPC server configurations
 */
const mnemonicToPrivateKey = (mnemonic = '', serverConfig = {}) => {
  const web3 = generateWeb3(mnemonic, serverConfig);
  if (web3) {
    const pkInBytes =
      web3.currentProvider.wallets[web3.currentProvider.addresses[0]]._privKey;

    return web3.utils.bytesToHex(pkInBytes);
  }
  return '';
};

/**
 * generateWeb3
 *
 * Create a new Web3 object with provided mnemonic & RPC server configurations
 * @param {String} mnemonic A string of 12 words
 * @param {Object} serverConfig Current RPC server configurations
 * @param {function} callback Action to handle error cases
 */
const generateWeb3 = (
  mnemonic = '',
  serverConfig = {},
  callback = () => {},
) => {
  const { host, hdPath } = serverConfig;
  let provider;
  try {
    provider = new HDWalletProvider(mnemonic, host, 0, 1, true, hdPath);
    return new Web3(provider);
  } catch (error) {
    callback(error);
    return null;
  }
};

/**
 * getWalletInfo
 *
 * Retrieve some wallet's basic information from a Web3 object
 * @param {Web3} web3 A Web3 object having provider
 */
const getWalletInfo = web3 => {
  if (web3) {
    const address = web3.currentProvider.addresses[0];
    return {
      address,
    };
  }
  return null;
};

/**
 * decryptWalletInfo
 *
 * Decrypt current encrypted wallet info by password
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {Wallet} rawInfo Encrypted Wallet object
 */
const decryptWalletInfo = (web3, rawInfo) => {
  if (web3 && rawInfo) {
    return web3.eth.accounts.wallet.decrypt(
      rawInfo,
      process.env.REACT_APP_WALLET_ENCRYPT_PASSWORD,
    );
  }
  return null;
};
// ===================

export { mnemonicToPrivateKey, generateWeb3, decryptWalletInfo, getWalletInfo };
