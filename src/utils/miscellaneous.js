/**
 *
 * TomoWallet - Other Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import _get from 'lodash.get';
import _omit from 'lodash.omit';
import _isNumber from 'lodash.isnumber';
import CryptoJS from 'crypto-js';
// ===================

export const shuffleArray = array => {
  let original = array;
  const result = [];

  while (original.length > 0) {
    // If the remaining array has only 1 element, add it directly to the result array
    if (original.length === 1) {
      result.push(original[0]);
      break;
    }

    const randomizedIndex = Math.floor((Math.random() * 100) % original.length);
    if (original[randomizedIndex]) {
      result.push(original[randomizedIndex]);
      original = original.filter((_, index) => index !== randomizedIndex);
    }
  }

  return result;
};

export const trimMnemonic = rawMnemonic => {
  const words = rawMnemonic
    .trim() // Remove beginning & end spaces
    .replace(/[\r\n]+/g, '') // Remove break-line characters
    .split(/[ ]+/);
  return words.join(' ');
};

export const convertLocaleNumber = (rawNumber, decimals = 3) => {
  if (_isNumber(rawNumber) && !isNaN(rawNumber)) {
    const convertedNumber =
      Math.floor(rawNumber * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return convertedNumber.toLocaleString();
  }
  return 0;
};

export const removeTrailingZero = rawNumber => {
  let result = `${rawNumber}`;

  if (result.includes('.')) {
    result = result.replace(/0+$/, '');
    if (result.match(/\.$/)) {
      result = result.replace('.', '');
    }
  }

  return result;
};

// Global state storage
const setStorage = (key, object) => {
  sessionStorage.setItem(
    'global',
    JSON.stringify({
      ...JSON.parse(sessionStorage.getItem('global')),
      [key]: object,
    }),
  );
};
const getStorage = key => {
  return _get(JSON.parse(sessionStorage.getItem('global')), [key]);
};
const removeStorage = key => {
  sessionStorage.setItem(
    'global',
    JSON.stringify(_omit(JSON.parse(sessionStorage.getItem('global')), key)),
  );
};

export const setWeb3Info = web3Info => {
  let infoToStore = {
    ...web3Info,
  };
  if (_get(web3Info, 'recoveryPhrase')) {
    const encryptedRP = CryptoJS.AES.encrypt(
      web3Info.recoveryPhrase,
      'ni@hC0m0T',
    ).toString();
    infoToStore.recoveryPhrase = encryptedRP;
  }

  setStorage('web3Info', infoToStore);
};
export const getWeb3Info = () => {
  const web3Info = getStorage('web3Info');
  const recoveryPhrase = _get(web3Info, 'recoveryPhrase');

  if (recoveryPhrase) {
    const decryptedRP = CryptoJS.AES.decrypt(
      recoveryPhrase,
      'ni@hC0m0T',
    ).toString(CryptoJS.enc.Utf8);
    return {
      ...web3Info,
      recoveryPhrase: decryptedRP,
    };
  }

  return web3Info;
};
export const removeWeb3Info = () => {
  removeStorage('web3Info');
};

export const setLocale = locale => {
  setStorage('locale', locale);
};
export const getLocale = () => {
  return getStorage('locale');
};
export const removeLocale = () => {
  removeStorage('locale');
};

export const setNetwork = network => {
  setStorage('network', network);
};
export const getNetwork = () => {
  return getStorage('network');
};
export const removeNetwork = () => {
  removeStorage('network');
};

export const setLedger = ledger => {
  setStorage('ledger', ledger);
};
export const getLedger = () => {
  return getStorage('ledger');
};
export const removeLedger = () => {
  return removeStorage('ledger');
};
