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
import { bnToDecimals } from '../../utils';
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
    const apiBase = _get(API, [params.serverKey], '');
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
    const apiBase = _get(API, [params.serverKey], '');
    const response = yield call(
      request,
      `${apiBase.GET_TRANSACTIONS}/${params.address}?page=${params.page}&limit=5`,
      { headers: { withCredentials: true } },
    );
    const additionalRequest = yield call(
      request,
      `${apiBase.WALLET_GET_TRANSACTIONS}?address=${params.address}`,
    );

    if (response) {
      const { items, currentPage, total, pages } = response;
      let updatedItems = items.map(trans => ({
        tokenType: 'TOMO',
        txHash: trans.hash,
        createdTime: trans.createdAt,
        txType: _isEqual(trans.from, params.address) ? 'OUT' : 'IN',
        from: trans.from,
        to: trans.to,
        amount: bnToDecimals(trans.value, 18),
      }));
      if (!_isEmpty(additionalRequest)) {
        updatedItems = items.map(trans1 => {
          const foundTrans =
            additionalRequest.find(trans2 => trans2.id.includes(trans1.hash)) ||
            trans1;
          console.warn('foundTrans', foundTrans);

          return {
            tokenType: foundTrans.symbol,
            txHash: foundTrans.title,
            createdTime: foundTrans.timestamp,
            type: foundTrans.type,
            from: foundTrans.from,
            to: foundTrans.to,
            amount: foundTrans.amount,
          };
        });
      }

      yield put(toggleLoading(false));
      yield put(
        loadTransactionDataSuccess({
          items: updatedItems,
          currentPage,
          total,
          pages,
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
