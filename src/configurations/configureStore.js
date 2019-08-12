/**
 *
 * TomoWallet - Redux store configuration
 *
 */
// ===== IMPORTS ====
// Modules
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
// Utilities
import createReducer from './rootReducer';
// ==================

// ===== CONFIGURATION =====
export default history => {
  const middlewares = [thunkMiddleware, logger, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(createReducer(), undefined, compose(...enhancers));

  store.injectedReducers = {};

  return store;
};
// =========================
