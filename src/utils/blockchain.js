/**
 *
 * TomoWallet - Utility - Blockchain supported methods
 *
 */
// ===== IMPORTS =====
// Modules
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import _isEqual from 'lodash.isequal';
// Utilities & Constants
import { getNetwork } from './miscellaneous';
import { ENUM, RPC_SERVER } from '../constants';
import trc20 from '../contractABIs/trc20.json';
import trc21 from '../contractABIs/trc21.json';
// ===================

// ===== SUPPORTED VARIABLES =====
const DEFAULT_GAS_PRICE = '250000000';
const DEFAULT_GAS_TOKEN = '500000';
const DEFAULT_GAS_CURRENCY = '21000';
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
    const address =
      web3.currentProvider.selectedAddress ||
      (web3.currentProvider.addresses && web3.currentProvider.addresses[0]);
    if (address) {
      return web3.eth.getBalance(address).then(balance => ({
        address,
        balance,
      }));
    }
  }
  return new Promise(r => r());
};

/**
 * getBalance
 *
 * Retrieve account balance by its address
 * @param {String} address A valid hex-string address
 */
const getBalance = address => {
  const networkURL = _get(RPC_SERVER, [getNetwork(), 'host']);
  const web3 = new Web3(networkURL);

  if (web3.utils.isAddress(address)) {
    return web3.eth.getBalance(address);
  }
  return new Promise(r => r());
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
  const remainDecimals =
    amount.indexOf('.') !== -1
      ? decimals - (amount.length - 1 - amount.indexOf('.'))
      : decimals;
  const weiAmount = web3.utils
    .toBN(`${amount}`.replace('.', ''))
    .mul(web3.utils.toBN(10 ** remainDecimals))
    .toString(10);

  // In case token type is TRC21
  if (_isEqual(type, ENUM.TOKEN_TYPE.TRC21)) {
    return contract.methods
      .estimateFee(weiAmount)
      .call({ from, to })
      .then(trc21Gas => {
        if (Number(trc21Gas)) {
          return trc21Gas;
        }
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

const estimateTRC21Fee = (web3, txData) => {
  const { amount, contractAddress, decimals, from, to } = txData;

  const contract = new web3.eth.Contract(trc21, contractAddress);
  const remainDecimals =
    amount.indexOf('.') !== -1
      ? decimals - (amount.length - 1 - amount.indexOf('.'))
      : decimals;
  const weiAmount = web3.utils
    .toBN(`${amount}`.replace('.', ''))
    .mul(web3.utils.toBN(10 ** remainDecimals))
    .toString(10);

  return contract.methods
    .estimateFee(weiAmount)
    .call({ from, to })
    .then(fee => {
      if (fee !== '0') {
        return {
          type: ENUM.TOKEN_TYPE.TRC21,
          amount: bnToDecimals(fee, decimals),
          gas: DEFAULT_GAS_TOKEN,
          gasPrice: fee,
        };
      }
      return estimateTRC20Fee(web3, txData);
    });
};

const estimateTRC20Fee = (web3, txData) => {
  const { amount, contractAddress, decimals, from, to } = txData;

  const contract = new web3.eth.Contract(trc20, contractAddress || from);
  const remainDecimals =
    amount.indexOf('.') !== -1
      ? decimals - (amount.length - 1 - amount.indexOf('.'))
      : decimals;
  const weiAmount = web3.utils
    .toBN(`${amount}`.replace('.', ''))
    .mul(web3.utils.toBN(10 ** remainDecimals))
    .toString(10);

  return contract.methods
    .transfer(to, weiAmount)
    .estimateGas({ from })
    .then(gas =>
      web3.eth.getGasPrice().then(price => {
        const feeObj = web3.utils
          .toBN(gas)
          .mul(web3.utils.toBN(price))
          .divmod(web3.utils.toBN(10 ** decimals));
        return {
          type: ENUM.TOKEN_TYPE.TRC20,
          amount: `${feeObj.div}.${feeObj.mod.toString(10, decimals)}`,
          gas,
          gasPrice: price,
        };
      }),
    );
};

const estimateCurrencyFee = (web3, txData) => {
  const { decimals, type } = txData;
  const feeObj = web3.utils
    .toBN(DEFAULT_GAS_PRICE)
    .mul(web3.utils.toBN(DEFAULT_GAS_CURRENCY))
    .divmod(web3.utils.toBN(10 ** decimals));
  const stringFee = `${feeObj.div}.${feeObj.mod.toString(10, decimals)}`;
  return new Promise(r =>
    r({
      type,
      amount: stringFee,
      gas: DEFAULT_GAS_CURRENCY,
      gasPrice: DEFAULT_GAS_PRICE,
    }),
  );
};

/**
 * getLedgerTokenTransferData
 *
 * Convert token transfer params for Ledger address into hex-string data
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {*} contractData An object which contains contract data
 */
const getLedgerTokenTransferData = (web3, contractData) => {
  const { amount, contractAddress, decimals, to, type } = contractData;
  const contract = new web3.eth.Contract(
    _isEqual(type, ENUM.TOKEN_TYPE.TRC21) ? trc21 : trc20,
    contractAddress,
  );
  const weiAmount = decimalsToBN(amount, decimals);

  return contract.methods.transfer(to, weiAmount).encodeABI();
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
  const weiAmount = decimalsToBN(amount, decimals);

  return new Promise(resolve => {
    if (type === ENUM.TOKEN_TYPE.TRC20) {
      resolve(estimateTRC20Fee(web3, contractData));
    } else if (type === ENUM.TOKEN_TYPE.TRC21) {
      resolve(estimateTRC21Fee(web3, contractData));
    }
  }).then(priceObj =>
    contract.methods
      .transfer(to, weiAmount)
      .send({
        from,
        gasPrice: (priceObj.type = ENUM.TOKEN_TYPE.TRC21
          ? DEFAULT_GAS_PRICE
          : priceObj.gasPrice),
        gas: priceObj.gas,
      })
      .on('transactionHash', hash => {
        repeatCall({
          interval: 2000,
          timeout: 10000,
          action: () => web3.eth.getTransactionReceipt(hash),
        });
      }),
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
  // const weiAmount = (amount * 10 ** decimals).toString();
  const remainDecimals =
    amount.indexOf('.') !== -1
      ? decimals - (amount.length - 1 - amount.indexOf('.'))
      : decimals;
  const weiAmount = web3.utils
    .toBN(`${amount}`.replace('.', ''))
    .mul(web3.utils.toBN(10 ** remainDecimals))
    .toString(10);

  return web3.eth.sendTransaction({
    from,
    to,
    value: weiAmount,
    gasPrice: DEFAULT_GAS_PRICE,
    gas: DEFAULT_GAS_CURRENCY,
  });
};

/**
 * repeatCall
 *
 * Execute a Promise action repeatly until there's a result
 * @param {Object} params Set of parameters (interval, timeout, action)
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

const convertAmountWithDecimals = (number, decimals) => {
  const web3 = new Web3();
  const normalNumber = web3.utils
    .toBN(number)
    .divmod(web3.utils.toBN(10 ** decimals));
  return `${normalNumber.div}.${normalNumber.mod.toString(10, decimals)}`;
};

/**
 * repeatGetTransaction
 *
 * Repeatly call to get transaction data with provided hash
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {String} txHash A hex string of transaction hash
 */
const repeatGetTransaction = (web3, txHash) => {
  repeatCall({
    interval: 2000,
    timeout: 10000,
    action: () => {
      return web3.eth.getTransactionReceipt(txHash);
    },
  });
};

const bnToDecimals = (numberToConvert, decimals) => {
  if (!numberToConvert) {
    return '0';
  }
  const web3 = new Web3();
  const numberObj = web3.utils
    .toBN(numberToConvert)
    .divmod(web3.utils.toBN(10 ** decimals));

  return `${numberObj.div}.${numberObj.mod.toString(10, decimals)}`;
};

const decimalsToBN = (numberToConvert, decimals) => {
  if (!numberToConvert) {
    return '0';
  }
  const web3 = new Web3();
  const remainDecimals =
    numberToConvert.indexOf('.') !== -1
      ? decimals - (numberToConvert.length - 1 - numberToConvert.indexOf('.'))
      : decimals;
  return web3.utils
    .toBN(`${numberToConvert}`.replace('.', ''))
    .mul(web3.utils.toBN(10 ** remainDecimals))
    .toString(10);
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
  convertAmountWithDecimals,
  getBalance,
  repeatGetTransaction,
  estimateCurrencyFee,
  estimateTRC20Fee,
  estimateTRC21Fee,
  bnToDecimals,
  decimalsToBN,
  getLedgerTokenTransferData,
};
