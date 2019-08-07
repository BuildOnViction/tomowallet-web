import { createDeepEqualSelector } from '../../utils';

const selectGlobalDomain = state => state.global;

const selectWallet = createDeepEqualSelector(
  selectGlobalDomain,
  obj => obj.toJS().wallet,
);
const selectLanguage = createDeepEqualSelector(
  selectGlobalDomain,
  obj => obj.toJS().language,
);

export { selectWallet, selectLanguage };
