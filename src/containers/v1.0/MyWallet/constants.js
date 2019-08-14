/**
 *
 * TomoWallet - My Wallet Page - Constants
 *
 */
// Actions
export const ADD_NATIVE_CURRENCY = 'TOMOWALLET/MY_WALLET/ADD_NATIVE_CURRENCY';
export const LOAD_TOKEN_OPTIONS = 'TOMOWALLET/MY_WALLET/LOAD_TOKEN_OPTIONS';
export const LOAD_TOKEN_OPTIONS_SUCCESS =
  'TOMOWALLET/MY_WALLET/LOAD_TOKEN_OPTIONS_SUCCESS';
export const SET_TABLE_TYPE = 'TOMOWALLET/MY_WALLET/SET_TABLE_TYPE';
export const SUBMIT_SEND_TOKEN = 'TOMOWALLET/MY_WALLET/SUBMIT_SEND_TOKEN';
export const TOGGLE_SEND_TOKEN_POPUP =
  'TOMOWALLET/MY_WALLET/TOGGLE_SEND_TOKEN_POPUP';
export const TOGGLE_SUCCESS_POPUP = 'TOMOWALLET/MY_WALLET/TOGGLE_SUCCESS_POPUP';
export const UPDATE_SEND_TOKEN_ERRORS =
  'TOMOWALLET/MY_WALLET/UPDATE_SEND_TOKEN_ERRORS';
export const UPDATE_SEND_TOKEN_INPUT =
  'TOMOWALLET/MY_WALLET/UPDATE_SEND_TOKEN_INPUT';

// Domain Key
export const DOMAIN_KEY = 'myWallet';

// Tables' Column Names
export const PORFOLIO_COLUMNS = {
  ACTIONS: 'actions',
  BALANCE: 'balance',
  ICON: 'icon',
  PRICE: 'price',
  PUBLISHER: 'publisher',
  SYMBOL: 'symbol',
  TOKEN_NAME: 'tokenName',
  TRANSACTION_FEE: 'txFee',
  VALUE: 'value',
  DECIMALS: 'decimals',
  TOKEN_ADDRESS: 'tokenAddress',
  TYPE: 'type',
};
export const TRANSACTION_COLUMNS = {
  TOKEN_TYPE: 'tokenType',
  TX_HASH: 'txHash',
  CREATE_TIME: 'createTime',
  FROM: 'from',
  TO: 'to',
  QUANTITY: 'quantity',
};

// Popup Forms' Fields
export const SEND_TOKEN_FIELDS = {
  TOKEN: 'token',
  RECIPIENT: 'recipient',
  TRANSFER_AMOUNT: 'amount',
  MESSAGE: 'message',
};
