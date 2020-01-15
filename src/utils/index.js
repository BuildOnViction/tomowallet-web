import injectReducer from './injectReducer';
import injectSaga from './injectSaga';
import history from './history';
import createDeepEqualSelector from './deepSelector';
import {
  changeInputWithSubmit,
  convertLocaleNumber,
  copyToClipboard,
  detectSubmit,
  downloadFile,
  removeTrailingZero,
  shuffleArray,
  trimMnemonic,
} from './miscellaneous';
import {
  addBN,
  bnToDecimals,
  createWeb3,
  decimalsToBN,
  decryptKeystore,
  divBN,
  encryptKeystore,
  estimateCurrencyFee,
  estimateFee,
  estimateTRC20Fee,
  estimateTRC21Fee,
  getBalance,
  getWalletInfo,
  isAddress,
  isHDPath,
  isHex,
  isPrivateKey,
  isRecoveryPhrase,
  mnemonicToPrivateKey,
  mulBN,
  repeatGetTransaction,
  selectHDPath,
  sendMoney,
  sendSignedTransaction,
  sendToken,
  subBN,
  toBN,
  weiToDecimals,
  getPrivacyAddressInfo,
  depositPrivacyMoney,
  getPrivacyBalance,
  sendMoneyPrivacy,
  isPrivacyAddress,
  estimatePrivacyFee,
  withdrawPrivacy,
  getLastUTXO
} from './blockchain';
import validations, { mergeErrors } from './validations';
import { withGlobal } from './injectGlobal';
import {
  getLedger,
  getLocale,
  getPrivacy,
  getNetwork,
  getWeb3Info,
  removeLedger,
  removeLocale,
  removeNetwork,
  removePrivacy,
  removeWeb3Info,
  setLedger,
  setNetwork,
  setLocale,
  setWeb3Info,
  setPrivacy,
  setPrivacyInfo,
} from './storage';
import electron, {
  detectKeystore,
  isElectron,
  readKeystore,
  removeKeystore,
  writeKeystore,
} from './electron';

export {
  addBN,
  bnToDecimals,
  changeInputWithSubmit,
  convertLocaleNumber,
  copyToClipboard,
  createDeepEqualSelector,
  createWeb3,
  decimalsToBN,
  decryptKeystore,
  detectKeystore,
  detectSubmit,
  divBN,
  downloadFile,
  electron,
  encryptKeystore,
  estimateCurrencyFee,
  estimateFee,
  estimateTRC20Fee,
  estimateTRC21Fee,
  getBalance,
  getLedger,
  getLocale,
  getPrivacy,
  getNetwork,
  getWalletInfo,
  getWeb3Info,
  history,
  injectReducer,
  injectSaga,
  isAddress,
  isElectron,
  isHDPath,
  isHex,
  isPrivateKey,
  isRecoveryPhrase,
  mergeErrors,
  mnemonicToPrivateKey,
  mulBN,
  readKeystore,
  removeKeystore,
  removeLedger,
  removeLocale,
  removePrivacy,
  removeNetwork,
  removeTrailingZero,
  removeWeb3Info,
  repeatGetTransaction,
  selectHDPath,
  sendMoney,
  sendSignedTransaction,
  sendToken,
  setLedger,
  setLocale,
  setPrivacy,
  setNetwork,
  setWeb3Info,
  shuffleArray,
  subBN,
  toBN,
  trimMnemonic,
  validations,
  weiToDecimals,
  withGlobal,
  writeKeystore,
  getPrivacyAddressInfo,
  depositPrivacyMoney,
  getPrivacyBalance,
  sendMoneyPrivacy,
  setPrivacyInfo,
  isPrivacyAddress,
  estimatePrivacyFee,
  withdrawPrivacy,
  getLastUTXO
};
