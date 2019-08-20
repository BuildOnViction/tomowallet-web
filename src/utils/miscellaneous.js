/**
 *
 * TomoWallet - Other Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import { get as _get, omit as _omit } from 'lodash';
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

// Global state storage
const setStorage = (key, object) => {
  localStorage.setItem(
    'global',
    JSON.stringify({
      ...JSON.parse(localStorage.getItem('global')),
      [key]: object,
    }),
  );
};
const getStorage = key => {
  return _get(JSON.parse(localStorage.getItem('global')), [key]);
};
const removeStorage = key => {
  localStorage.setItem(
    'global',
    JSON.stringify(_omit(getStorage('global'), key)),
  );
};

export const setWeb3Info = web3Info => {
  setStorage('web3Info', web3Info);
};
export const getWeb3Info = () => {
  return getStorage('web3Info');
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
