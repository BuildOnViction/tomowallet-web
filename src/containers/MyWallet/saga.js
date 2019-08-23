/**
 *
 * TomoWallet - My Wallet Page - Saga
 *
 */
// ===== IMPORTS =====
// Modules
import { call, put, takeLatest } from 'redux-saga/effects';
// Utilities & Constants
import request from '../../utils/request';
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
    const { address } = actionData;
    const response = yield call(request, `${API.GET_TOKENS}?holder=${address}`);

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
    const { page, address } = actionData;
    const response = yield call(
      request,
      `${API.GET_TRANSACTIONS}/${address}?page=${page}&limit=5`,
      { headers: { withCredentials: true } },
    );

    if (response) {
      const { items, currentPage, total, pages } = response;

      yield put(toggleLoading(false));
      yield put(
        loadTransactionDataSuccess({
          items,
          currentPage,
          total,
          pages,
          address,
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
