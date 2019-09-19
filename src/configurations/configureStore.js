/**
 *
 * TomoWallet - Redux store configuration
 *
 */
// ===== IMPORTS ====
// Modules
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleWare from 'redux-saga';
// Utilities
import createReducer from './rootReducer';
// ==================

// ===== CONFIGURATION =====
export default history => {
  const sagaMiddleware = createSagaMiddleWare({});
  const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
    thunkMiddleware,
  ];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(createReducer(), undefined, compose(...enhancers));

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  return store;
};
// =========================
