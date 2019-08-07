import {
  STORE_WALLET_INFO,
  RELEASE_WALLET_INFO,
  SET_LANGUAGE,
} from './constants';

export const storeWallet = data => ({
  type: STORE_WALLET_INFO,
  data,
});

export const releaseWallet = () => ({
  type: RELEASE_WALLET_INFO,
});

export const setLanguage = language => ({
  type: SET_LANGUAGE,
  language,
});
