/**
 *
 * TomoWallet - Root Reducer Configuration
 *
 */
// ===== IMPORTS ======
// Modules
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import autoMerge2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { fromJS } from 'immutable';
// Utilities
import { history } from '../utils';
import globalReducer from '../containers/Global/reducer';
// ====================

// ===== CONFIGURATION =====

// Configure Redux persistor
const ImmutableTransform = createTransform(
  // Inbound transformation
  inboundState => {
    console.warn('inbound', inboundState);

    const objState = inboundState.toJS();
    return { ...objState, wallet: JSON.stringify(objState.wallet) };
  },
  // Outbound transformation
  outboundState => {
    console.warn('outbound', outboundState);

    return fromJS({
      ...outboundState,
      wallet: JSON.parse(outboundState.wallet),
    });
  },
  {
    whitelist: ['global'],
  },
);
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['global'],
  transforms: [ImmutableTransform],
  stateReconciler: hardSet,
};

export default (injectedReducers = {}) =>
  persistReducer(
    rootPersistConfig,
    combineReducers({
      global: globalReducer,
      router: connectRouter(history),
      ...injectedReducers,
    }),
  );
// =========================
