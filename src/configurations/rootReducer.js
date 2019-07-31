import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../utils';
import globalReducer from '../containers/Global/reducer';

export default (injectedReducers = {}) =>
  combineReducers({
    global: globalReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
