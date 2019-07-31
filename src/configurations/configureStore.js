import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import createReducer from './rootReducer';

export default (initialState = {}, history) => {
  const middlewares = [thunkMiddleware, logger, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers),
  );

  store.injectedReducers = {};

  return store;
};
