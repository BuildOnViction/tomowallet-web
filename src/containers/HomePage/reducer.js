import { fromJS } from 'immutable';
import { UPDATE_FORM_STATE } from './constants';

const initialState = fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_STATE:
      return state.setIn(['form', 'state'], action.newState);
    default:
      return state;
  }
};
