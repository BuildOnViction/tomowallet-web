/**
 *
 * TomoWallet - My Wallet Page - Constants
 *
 */
// Actions
export const SET_TABLE_TYPE = 'TOMOWALLET/MY_WALLET/SET_TABLE_TYPE';

// Domain Key
export const DOMAIN_KEY = 'myWallet';

// Tables' Column Names
export const PORFOLIO_COLUMNS = {
  TOKEN_NAME: 'tokenName',
  BALANCE: 'balance',
  VALUE: 'value',
  PRICE: 'price',
  ACTIONS: 'actions',
  SEND: 'send',
  RECEIVE: 'receive',
};
export const TRANSACTION_COLUMNS = {
  TOKEN_TYPE: 'tokenType',
  TX_HASH: 'txHash',
  CREATE_TIME: 'createTime',
  FROM: 'from',
  TO: 'to',
  QUANTITY: 'quantity',
};
