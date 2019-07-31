import {
  STORE_ACCOUNT_INFO,
  RELEASE_ACCOUNT_INFO,
  SET_LANGUAGE,
  RESET_GLOBAL_STATE,
} from './constants';

export const storeAccount = data => ({
  type: STORE_ACCOUNT_INFO,
  data,
});

export const releaseAccount = () => ({
  type: RELEASE_ACCOUNT_INFO,
});

export const setLanguage = language => ({
  type: SET_LANGUAGE,
  language,
});

export const resetState = () => ({
  type: RESET_GLOBAL_STATE,
});
