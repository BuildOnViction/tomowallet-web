/**
 *
 * TomoWallet - Utility - Blockchain supported methods
 *
 */
// ===== IMPORTS =====
// Modules
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import _isEmpty from 'lodash.isempty';
import _isEqual from 'lodash.isequal';
// Utilities & Constants
import { ENUM } from '../constants';
import trc20 from '../contractABIs/trc20.json';
import trc21 from '../contractABIs/trc21.json';
// ===================

// ===== SUPPORTED VARIABLES =====
const DEFAULT_GAS_PRICE = '250000000';
const DEFAULT_GAS = 21000;
// ===============================

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

    return web3.utils.bytesToHex(pkInBytes).replace(/^0x/, '');
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
    return web3.eth.getBalance(address).then(balance => ({
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
 * estimateGas
 *
 * Retrieve gas price for the specific transaction. Supported for both TRC20 & TRC21 tokens
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {Object} txData A transaction object (including from, to, value, ...)
 */
const estimateGas = (web3, txData) => {
  const { amount, contractAddress, decimals, from, to, type } = txData;

  const contract = new web3.eth.Contract(
    _isEqual(type, ENUM.TOKEN_TYPE.TRC21) ? trc21 : trc20,
    contractAddress || from,
  );
  const weiAmount = parseFloat(amount * 10 ** decimals).toString();

  // In case token type is TRC21
  if (_isEqual(type, ENUM.TOKEN_TYPE.TRC21)) {
    return contract.methods
      .estimateFee(weiAmount)
      .call({ from, to })
      .then(trc21Gas => {
        if (Number(trc21Gas)) {
          return trc21Gas;
        }
        console.warn('In case token type is TRC21', from, to, weiAmount);
        return contract.methods
          .transfer(to, weiAmount)
          .estimateGas({ from })
          .then(gas => gas);
      });
  } else {
    // In case token type is TRC20
    return contract.methods
      .transfer(to, weiAmount)
      .estimateGas({ from })
      .then(gas => gas);
  }
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
  const weiAmount = (amount * 10 ** decimals).toString();

  return estimateGas(web3, contractData).then(gas =>
    web3.eth.getGasPrice(price =>
      contract.methods
        .transfer(to, weiAmount)
        .send({ from, gasPrice: price, gas })
        .on('transactionHash', hash => {
          repeatCall({
            interval: 2000,
            timeout: 10000,
            action: () => {
              return web3.eth.getTransactionReceipt(hash);
            },
          });
        }),
    ),
  );
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

  const weiAmount = (amount * 10 ** decimals).toString();
  return estimateGas(web3, transactionData).then(gas =>
    web3.eth.getGasPrice().then(price => {
      return web3.eth.sendTransaction({
        from,
        to,
        value: weiAmount,
        gasPrice: price,
        gas,
      });
    }),
  );
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
    new Promise(r => r(setTimeout(() => clearInterval(intervalId)), timeout));
  return repeat(
    interval,
    action().then(trans => {
      if (!_isEmpty(trans)) {
        clearInterval(intervalId);
      }
    }),
  ).then(stopAfter10Seconds());
};

/**
 * fromWei
 *
 * Convert a Wei-format number into a decimal number
 * @param {Number} amount An amount of TOMO in Wei format
 */
const fromWei = amount => {
  const web3 = new Web3();
  return web3.utils.fromWei(amount);
};
// ===================

export {
  decryptWalletInfo,
  estimateGas,
  fromWei,
  generateWeb3,
  getWalletInfo,
  initiateWallet,
  mnemonicToPrivateKey,
  sendMoney,
  sendToken,
};
