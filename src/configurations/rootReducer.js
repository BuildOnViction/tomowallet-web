/**
 *
 * TomoWallet - Root Reducer Configuration
 *
 */
// ===== IMPORTS ======
// Modules
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// Utilities
import { history } from '../utils';
import globalReducer from '../containers/Global/reducer';
// ====================

// ===== CONFIGURATION =====
export default (injectedReducers = {}) =>
  combineReducers({
    global: globalReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
// =========================
