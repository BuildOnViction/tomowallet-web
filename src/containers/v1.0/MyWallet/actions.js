/**
 *
 * TomoWallet - My Wallet Page - Actions
 *
 */
// ===== IMPORTS =====
// Constants
import { SET_TABLE_TYPE } from './constants';
// ===================

// ===== ACTIONS =====
export const setTableType = tableType => ({
  type: SET_TABLE_TYPE,
  tableType,
});
// ===================
