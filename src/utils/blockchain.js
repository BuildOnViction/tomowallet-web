/**
 *
 * TomoWallet - Utility - Blockchain supported methods
 *
 */
// ===== IMPORTS =====
// Modules
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { isEqual as _isEqual, isEmpty as _isEmpty } from 'lodash';
// Utilities & Constants
import { ENUM } from '../constants';
import trc20 from '../contractABIs/trc20.json';
import trc21 from '../contractABIs/trc21.json';
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
 * @param {Web3} web3 A Web3 object with supported APIs
 */
const getWalletInfo = web3 => {
  if (web3) {
    const address = web3.currentProvider.addresses[0];
    return Promise.all([web3.eth.getBalance(address)]).then(([balance]) => ({
      address,
      balance: Number(web3.utils.fromWei(balance)),
    }));
  }
  return null;
};

/**
 * initiateWallet
 *
 * Initiate Web3 & wallet information when refreshing page
 * @param {String} mnemonic A string of recovery phrase for wallet access
 * @param {Object} serverConfig RPC server configuration properties
 * @param {Function} callback Method to catch exception
 */
const initiateWallet = (mnemonic, serverConfig, callback = () => {}) => {
  const web3 = generateWeb3(mnemonic, serverConfig, callback);
  return getWalletInfo(web3).then(walletInfo => ({
    web3,
    walletInfo,
  }));
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

/**
 * estimateTRC20Gas
 *
 * Retrieve gas price for the specific transaction
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {Object} txData A transaction object (including from, to, value, ...)
 */
const estimateTRC20Gas = (web3, txData) => {
  return web3.eth.estimateGas(txData);
};

/**
 * sendToken
 *
 * Execute token transfer contract
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {*} contractData An object which contains contract data
 */
const sendToken = (web3, contractData) => {
  const { amount, contractAddress, decimals, from, to, type } = contractData;

  const contract = new web3.eth.Contract(
    _isEqual(type, ENUM.TOKEN_TYPE.TRC21) ? trc21 : trc20,
    contractAddress,
  );
  const weiAmount = web3.utils
    .toBN(amount)
    .mul(web3.utils.toBN(10 ** decimals))
    .toString();
  // In case token type is TRC21
  if (_isEqual(type, ENUM.TOKEN_TYPE.TRC21)) {
    return contract.methods
      .estimateFee(weiAmount)
      .call({ from, to })
      .then(gasPrice =>
        contract.methods
          .transfer(to, weiAmount)
          .send({ from, gasPrice: '250000000' })
          .on('transactionHash', hash => {
            repeatCall({
              interval: 2000,
              timeout: 10000,
              action: () => {
                return web3.eth.getTransactionReceipt(hash);
              },
            });
          })
          .catch(ex => {
            console.log('[ERROR] -- ', ex);
          }),
      );
  } else {
    // In case token type is TRC20
    return estimateTRC20Gas(web3, { from, to, value: weiAmount }).then(
      gasPrice =>
        contract.methods
          .transfer(to, weiAmount)
          .send({
            from,
            to: contractAddress,
            gasPrice: '250000000',
            gas: 50000,
          })
          .on('transactionHash', hash => {
            repeatCall({
              interval: 2000,
              timeout: 10000,
              action: () => {
                return web3.eth.getTransactionReceipt(hash);
              },
            });
          })
          .catch(ex => {
            console.log('[ERROR] -- ', ex);
          }),
    );
  }
};

/**
 * sendMoney
 *
 * Execute token transfer contract
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {*} contractData An object which contains contract data
 */
const sendMoney = (web3, transactionData) => {
  const { amount, decimals, from, to } = transactionData;

  const weiAmount = web3.utils
    .toBN(amount)
    .mul(web3.utils.toBN(10 ** decimals))
    .toString();
  return web3.eth.sendTransaction({
    from,
    to,
    value: weiAmount,
    gasPrice: '250000000',
    gas: 50000,
  });
};

/**
 * repeatCall
 *
 * Execute a Promise action repeatly until there's a result
 * @param {Object} param0 Set of parameters (interval, timeout, action)
 */
const repeatCall = ({ interval = 1000, timeout = 1000, action = () => {} }) => {
  let intervalId = 0;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const repeat = (ms, func) =>
    new Promise(r => {
      intervalId = setInterval(func, ms);
      wait(ms).then(r);
    });
  const stopAfter10Seconds = () =>
    new Promise(r => r(setTimeout(() => clearInterval(intervalId)), 10000));
  return repeat(
    2000,
    action().then(trans => {
      if (!_isEmpty(trans)) {
        clearInterval(intervalId);
      }
    }),
  ).then(stopAfter10Seconds());
};
// ===================

export {
  decryptWalletInfo,
  estimateTRC20Gas,
  generateWeb3,
  getWalletInfo,
  initiateWallet,
  mnemonicToPrivateKey,
  sendMoney,
  sendToken,
};
