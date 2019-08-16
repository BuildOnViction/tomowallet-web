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
import { toggleLoading } from '../../Global/actions';
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
  } catch (error) {
    yield put(toggleLoading(false));
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
