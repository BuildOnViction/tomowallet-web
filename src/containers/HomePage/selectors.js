import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
import { createDeepEqualSelector } from '../../utils';
import { DOMAIN_KEY } from './constants';

const selectLoginDomain = state => _get(state, [DOMAIN_KEY], fromJS({}));

const selectForm = createDeepEqualSelector(
  selectLoginDomain,
  obj => obj.toJS().form,
);

export { selectForm };
