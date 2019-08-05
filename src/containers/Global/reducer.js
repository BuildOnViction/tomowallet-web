import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
import {
  STORE_ACCOUNT_INFO,
  RELEASE_ACCOUNT_INFO,
  SET_LANGUAGE,
  RESET_GLOBAL_STATE,
} from './constants';
import { LIST } from '../../constants';

const initialState = fromJS({
  account: null,
  language: _get(LIST, ['LANGUAGES', 0, 'value'], ''),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_ACCOUNT_INFO:
      return state.set('account', action.data);
    case RELEASE_ACCOUNT_INFO:
      return state.set('account', null);
    case SET_LANGUAGE:
      return state.set(
        'language',
        (LIST.LANGUAGES.find(opt => opt.value === action.language) || {})
          .value || '',
      );
    case RESET_GLOBAL_STATE:
      return initialState;
    default:
      return state;
  }
};
