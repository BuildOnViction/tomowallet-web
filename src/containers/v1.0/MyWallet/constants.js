/**
 *
 * TomoWallet - My Wallet Page - Constants
 *
 */
// Actions
export const LOAD_TOKEN_OPTIONS = 'TOMOWALLET/MY_WALLET/LOAD_TOKEN_OPTIONS';
export const LOAD_TOKEN_OPTIONS_SUCCESS =
  'TOMOWALLET/MY_WALLET/LOAD_TOKEN_OPTIONS_SUCCESS';
export const PREPEND_TOKEN_OPTION = 'TOMOWALLET/MY_WALLET/PREPEND_TOKEN_OPTION';
export const RESET_SEND_TOKEN_FORM =
  'TOMOWALLET/MY_WALLET/RESET_SEND_TOKEN_FORM';
export const SET_TABLE_TYPE = 'TOMOWALLET/MY_WALLET/SET_TABLE_TYPE';
export const SUBMIT_SEND_TOKEN = 'TOMOWALLET/MY_WALLET/SUBMIT_SEND_TOKEN';
export const TOGGLE_SEND_TOKEN_POPUP =
  'TOMOWALLET/MY_WALLET/TOGGLE_SEND_TOKEN_POPUP';
export const TOGGLE_SUCCESS_POPUP = 'TOMOWALLET/MY_WALLET/TOGGLE_SUCCESS_POPUP';
export const UPDATE_SEND_TOKEN_ERRORS =
  'TOMOWALLET/MY_WALLET/UPDATE_SEND_TOKEN_ERRORS';
export const UPDATE_SEND_TOKEN_INPUT =
  'TOMOWALLET/MY_WALLET/UPDATE_SEND_TOKEN_INPUT';
export const UPDATE_SEND_TOKEN_POPUP_STAGE =
  'TOMOWALLET/MY_WALLET/UPDATE_SEND_TOKEN_POPUP_STAGE';

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

// Send Token Popup' Stages
export const SEND_TOKEN_STAGES = {
  FORM: 1,
  CONFIRMATION: 2,
};
