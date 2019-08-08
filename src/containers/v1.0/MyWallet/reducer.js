/**
 *
 * TomoWallet - My Wallet Page - Reducer
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
// Constants
import { SET_TABLE_TYPE, TABLE_TYPE } from './constants';
// ===================

// ===== PRE-INITIATION VARIABLES =====
const initialState = fromJS({
  tableType: TABLE_TYPE.PORFOLIO,
});
// ====================================

// ===== REDUCER =====
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_TYPE:
      return state.set('tableType', action.tableType);
    default:
      return state;
  }
};
// ===================
