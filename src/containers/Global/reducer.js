import { fromJS } from 'immutable';
import { get as _get } from 'lodash';
import {
  STORE_WALLET_INFO,
  RELEASE_WALLET_INFO,
  SET_LANGUAGE,
} from './constants';
import { LIST } from '../../constants';

const initialState = fromJS({
  wallet: null,
  language: _get(LIST, ['LANGUAGES', 0, 'value'], ''),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_WALLET_INFO:
      return state.set('wallet', action.data);
    case RELEASE_WALLET_INFO:
      return state.set('wallet', null);
    case SET_LANGUAGE:
      return state.set(
        'language',
        (LIST.LANGUAGES.find(opt => opt.value === action.language) || {})
          .value || '',
      );
    default:
      return state;
  }
};
