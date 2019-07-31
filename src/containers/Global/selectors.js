import { createDeepEqualSelector } from '../../utils';

const selectGlobalDomain = state => state.global;

const selectAccount = createDeepEqualSelector(
  selectGlobalDomain,
  obj => obj.toJS().account,
);
const selectLanguage = createDeepEqualSelector(
  selectGlobalDomain,
  obj => obj.toJS().language,
);

export { selectAccount, selectLanguage };
