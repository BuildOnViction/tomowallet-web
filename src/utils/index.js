import injectReducer from './injectReducer';
import injectSaga from './injectSaga';
import history from './history';
import createDeepEqualSelector from './deepSelector';
import {
  shuffleArray,
  trimMnemonic,
  convertLocaleNumber,
  getWeb3Info,
  setWeb3Info,
  removeWeb3Info,
  getLocale,
  setLocale,
  removeLocale,
  getNetwork,
  setNetwork,
  removeNetwork,
  getLedger,
  setLedger,
  removeLedger,
} from './miscellaneous';
import {
  decryptWalletInfo,
  estimateTRC20Gas,
  fromWei,
  generateWeb3,
  getWalletInfo,
  mnemonicToPrivateKey,
  sendToken,
} from './blockchain';
import getValidations, { mergeErrors } from './validations';
import { withLoading } from './injectLoading';

export {
  injectReducer,
  injectSaga,
  history,
  createDeepEqualSelector,
  shuffleArray,
  mnemonicToPrivateKey,
  generateWeb3,
  decryptWalletInfo,
  getWalletInfo,
  getValidations,
  mergeErrors,
  estimateTRC20Gas,
  sendToken,
  getWeb3Info,
  setWeb3Info,
  removeWeb3Info,
  withLoading,
  fromWei,
  getLocale,
  setLocale,
  removeLocale,
  getNetwork,
  setNetwork,
  removeNetwork,
  getLedger,
  setLedger,
  removeLedger,
  trimMnemonic,
  convertLocaleNumber,
};
