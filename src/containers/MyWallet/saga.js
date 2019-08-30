/**
 *
 * TomoWallet - My Wallet Page - Saga
 *
 */
// ===== IMPORTS =====
// Modules
import { call, put, takeLatest } from 'redux-saga/effects';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import _isEmpty from 'lodash.isempty';
// Utilities & Constants
import request from '../../utils/request';
import { bnToDecimals, getNetwork } from '../../utils';
import {
  LOAD_TOKEN_OPTIONS,
  LOAD_TRANSACTION_DATA,
  LOAD_COIN_DATA,
} from './constants';
import { API } from '../../constants';
import {
  loadTokenOptionsSuccess,
  loadTransactionDataSuccess,
  updateSendTokenErrors,
  loadCoinDataSuccess,
  loadCoinDataFailed,
} from './actions';
import { toggleLoading } from '../Global/actions';
// ===================

// ===== SAGA =====
export function* loadTokens(actionData) {
  try {
    yield put(toggleLoading(true));
    const { params } = actionData;
    const apiBase = _get(API, [getNetwork()], '');
    const response = yield call(
      request,
      `${apiBase.GET_TOKENS}?holder=${params.address}`,
    );

    if (response) {
      yield put(toggleLoading(false));
      yield put(loadTokenOptionsSuccess(response));
    }
  } catch {
    yield put(toggleLoading(false));
    yield put(
      updateSendTokenErrors({
        tokenTable: 'Cannot load token list!',
      }),
    );
  }
}

export function* loadTransaction(actionData) {
  try {
    yield put(toggleLoading(true));
    const { params } = actionData;
    const apiBase = _get(API, [getNetwork()], '');
    const walletTransactions = yield call(
      request,
      `${apiBase.WALLET_GET_TRANSACTIONS}?address=${params.address}&page=${params.page}&limit=5`,
    );

    if (!_isEmpty(walletTransactions)) {
      var updatedItems = walletTransactions.map(e => {
        return {
          tokenType: e.symbol,
          txHash: e.hash,
          createdTime: e.timestamp,
          type: e.type,
          from: e.from,
          to: e.to,
          amount: e.amount,
        };
      });

      yield put(toggleLoading(false));
      yield put(
        loadTransactionDataSuccess({
          items: updatedItems,
          currentPage: params.page,
          total: 500,
          pages: 10,
          address: params.address,
        }),
      );
    }
  } catch {
    yield put(toggleLoading(false));
    yield put(
      updateSendTokenErrors({
        transactionTable: 'Cannot load transaction list!',
      }),
    );
  }
}

export function* loadCoin() {
  try {
    const response = yield call(
      request,
      'https://widgets.coinmarketcap.com/v2/ticker/2570/?ref=widget&convert=USD',
    );
    if (response.data) {
      yield put(loadCoinDataSuccess(response.data));
    } else {
      yield put(loadCoinDataFailed('Cannot load TomoChain coin data.'));
    }
  } catch (error) {
    yield put(loadCoinDataFailed(error.message));
  }
}

function* rootSaga() {
  yield takeLatest(LOAD_TOKEN_OPTIONS, loadTokens);
  yield takeLatest(LOAD_TRANSACTION_DATA, loadTransaction);
  yield takeLatest(LOAD_COIN_DATA, loadCoin);
}
// ================

export default rootSaga;
