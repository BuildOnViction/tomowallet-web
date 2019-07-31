import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
import { createDeepEqualSelector } from '../../utils';
import { DOMAIN_KEY } from './constants';

const selectRecoveryPhraseDomain = state =>
  _get(state, [DOMAIN_KEY], fromJS({}));

const selectMnemonicState = createDeepEqualSelector(
  selectRecoveryPhraseDomain,
  obj => obj.toJS().mnemonic,
);
const selectPopupState = createDeepEqualSelector(
  selectRecoveryPhraseDomain,
  obj => obj.toJS().popupFlag,
);
const selectFormState = createDeepEqualSelector(
  selectRecoveryPhraseDomain,
  obj => obj.toJS().formState,
);

export { selectMnemonicState, selectPopupState, selectFormState };
