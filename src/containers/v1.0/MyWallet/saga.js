/**
 *
 * TomoWallet - My Wallet Page - Saga
 *
 */
// ===== IMPORTS =====
// Modules
import { call, put, takeLatest } from 'redux-saga/effects';
// Utilities & Constants
import request from '../../../utils/request';
import { LOAD_TOKEN_OPTIONS } from './constants';
import { API } from '../../../constants';
import { loadTokenOptionsSuccess, updateSendTokenErrors } from './actions';
// ===================

// ===== SAGA =====
export function* loadTokens(actionData) {
  try {
    const { address } = actionData;
    const response = yield call(request, `${API.GET_TOKENS}?holder=${address}`);

    if (response) {
      yield put(loadTokenOptionsSuccess(response));
    }
  } catch (error) {
    yield put(
      updateSendTokenErrors({
        tokenTable: 'Cannot load token list!',
      }),
    );
  }
}

export default function* rootSaga() {
  yield takeLatest(LOAD_TOKEN_OPTIONS, loadTokens);
}
// ================
