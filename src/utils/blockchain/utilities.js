/**
 *
 * TomoWallet - Utility - Blockchain - Common Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import Web3 from 'web3';
import _isEmpty from 'lodash.isempty';
// Utilities
import { trimMnemonic } from '../miscellaneous';
// ===================

// ===== PRE-DEFINED VARIABLES =====
const web3Utils = new Web3().utils;
// =================================

// ===== METHODS =====
/**
 * weiToDecimals
 *
 * Convert a Wei-format number into a decimal number
 * @param {Number} amount An amount of TOMO in Wei format
 */
const weiToDecimals = amount => {
  return web3Utils.fromWei(amount);
};

/**
 * bnToDecimals
 *
 * Convert a Big Number value into a value in specific numeral system
 * @param {BN} numberToConvert A string of Big Number amount
 * @param {int} decimals number of numeral systems
 */
const bnToDecimals = (numberToConvert, decimals) => {
  if (!numberToConvert) {
    return '0';
  }
  const numberObj = web3Utils
    .toBN(numberToConvert)
    .divmod(web3Utils.toBN(10 ** decimals));

  return `${numberObj.div}.${numberObj.mod.toString(10, decimals)}`;
};

/**
 * decimalsToBN
 *
 * Convert a value in specific numeral system into a Big Number value
 * @param {BN} numberToConvert A string of Big Number amount
 * @param {int} decimals number of numeral systems
 */
const decimalsToBN = (numberToConvert, decimals) => {
  if (!numberToConvert) {
    return '0';
  }

  const rawDecimals =
    numberToConvert.indexOf('.') !== -1
      ? numberToConvert.length - 1 - numberToConvert.indexOf('.')
      : 0;
  let remainDecimals;
  if (rawDecimals) {
    if (decimals >= rawDecimals) {
      remainDecimals = decimals - rawDecimals;
      return web3Utils
        .toBN(`${numberToConvert}`.replace('.', ''))
        .mul(web3Utils.toBN(remainDecimals === 0 ? 1 : 10 ** remainDecimals))
        .toString(10);
    } else {
      remainDecimals = rawDecimals - decimals;
      return web3Utils
        .toBN(`${numberToConvert}`.replace('.', ''))
        .div(web3Utils.toBN(10 ** remainDecimals))
        .toString(10);
    }
  }
  remainDecimals = decimals;
  return web3Utils
    .toBN(`${numberToConvert}`.replace('.', ''))
    .mul(web3Utils.toBN(10 ** remainDecimals))
    .toString(10);
};

/**
 * isRecoveryPhrase
 *
 * Check if the input string is a valid recovery phrase
 * @param {String} rawData recovery phrase input's value
 */
const isRecoveryPhrase = rawData => {
  if (rawData) {
    const trimData = trimMnemonic(rawData);

    return trimData.split(' ').length === 12;
  }
  return false;
};

/**
 * isPrivateKey
 *
 * Check if the input string is a valid private key
 * @param {String} rawData private key input's value
 */
const isPrivateKey = rawData => {
  if (rawData) {
    const trimData = rawData.trim().replace(/^0x/, '');

    return web3Utils.isHex(trimData) && trimData.length === 64;
  }
  return false;
};

/**
 * isAddress
 *
 * Check if the input string is a valid private key
 * @param {String} rawData address input's value
 */
const isAddress = rawData => !!rawData && web3Utils.isAddress(rawData);

/**
 * encryptKeystore
 *
 * Encrypt wallet's private key into keystore data by a given password
 * @param {String} rawInfo Wallet's data to be encrypted
 * @param {String} password A pass phrase for encryption
 */
const encryptKeystore = (rawInfo, password) => {
  if (rawInfo && password) {
    const web3 = new Web3();
    return web3.eth.accounts.encrypt(rawInfo, password);
  }
  return {};
};

/**
 * decryptKeystore
 *
 * Retrieve wallet's original data from keystore data by password
 * @param {Object} encryptedInfo Encrypted wallet's data
 * @param {String} password Pass phrase which was used to encrypt wallet's data
 */
const decryptKeystore = (encryptedInfo, password) => {
  if (encryptedInfo && password) {
    const web3 = new Web3();
    return web3.eth.accounts.decrypt(encryptedInfo, password);
  }
  return {};
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
// ===================

export {
  bnToDecimals,
  decimalsToBN,
  decryptKeystore,
  encryptKeystore,
  isAddress,
  isPrivateKey,
  isRecoveryPhrase,
  repeatCall,
  repeatGetTransaction,
  weiToDecimals,
};
