/**
 *
 * TomoWallet - Storage Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import _get from 'lodash.get';
import _omit from 'lodash.omit';
import CryptoJS from 'crypto-js';
// ===================

// ===== METHODS =====
const setLocalStorage = (key, object) => {
  localStorage.setItem(
    'global',
    JSON.stringify({
      ...JSON.parse(localStorage.getItem('global')),
      [key]: object,
    }),
  );
};

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

const getLocalStorage = key => {
  return _get(JSON.parse(localStorage.getItem('global')), [key]);
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

// store privacy infor to localstorage (uxto, balance, scannedTo)
export const setPrivacyInfo = (privacyInfo) => {
  let infoToStore = {
    ...privacyInfo
  };

  setLocalStorage(privacyInfo.address.toString(), infoToStore);
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

export const getPrivacyWalletInfo = (address) => {
  const PrivacyWalletInfo = getLocalStorage(address) || null;

  return PrivacyWalletInfo;
};

export const removeWeb3Info = () => removeStorage('web3Info');

export const setLocale = locale => setStorage('locale', locale);
export const getLocale = () => getStorage('locale');
export const removeLocale = () => removeStorage('locale');

export const setNetwork = network => setStorage('network', network);
export const getNetwork = () => getStorage('network');
export const removeNetwork = () => removeStorage('network');

export const setLedger = ledger => setStorage('ledger', ledger);
export const getLedger = () => getStorage('ledger');
export const removeLedger = () => removeStorage('ledger');

export const setPrivacy = privacy => setLocalStorage('privacy', privacy);
export const getPrivacy = () => getLocaleStorage('privacy');
export const removePrivacy = () => removeStorage('privacy');
// ===================
