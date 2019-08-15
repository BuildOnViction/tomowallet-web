/**
 *
 * TomoWallet - Global Selectors
 *
 */
// ===== IMPORTS =====
// Utilities
import { createDeepEqualSelector } from '../../utils';
// ===================

// ===== SELECTORS =====
const selectGlobalDomain = state => state.global;

const selectWallet = createDeepEqualSelector(
  selectGlobalDomain,
  obj => obj.toJS().wallet,
);
const selectLanguage = createDeepEqualSelector(
  selectGlobalDomain,
  obj => obj.toJS().language,
);
const selectWalletPopup = createDeepEqualSelector(
  selectGlobalDomain,
  obj => obj.toJS().walletPopup,
);
// =====================

export { selectWallet, selectLanguage, selectWalletPopup };
