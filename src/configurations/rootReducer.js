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
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { fromJS } from 'immutable';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
// Utilities
import { history } from '../utils';
import globalReducer from '../containers/Global/reducer';
// ====================

// ===== CONFIGURATION =====

// Configure Redux persistor
const GlobalTransform = createTransform(
  // Inbound transformation
  inboundState => {
    const objState = inboundState.toJS();
    console.warn('inbound', objState);
    const rawWallet = _get(objState, 'wallet.toJS', () => null)();

    return {
      ...objState,
      wallet: !_isEmpty(rawWallet)
        ? JSON.stringify(objState.wallet.toJS())
        : {},
    };
  },
  // Outbound transformation
  outboundState => {
    console.warn('outbound', outboundState);

    return fromJS({
      ...outboundState,
      wallet: fromJS(JSON.parse(outboundState.wallet)),
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
  transforms: [GlobalTransform],
  stateReconciler: autoMergeLevel2,
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
