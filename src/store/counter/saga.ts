import FetchService, { ApiResponse } from '@/utils/FetchService';
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { decrement, decrementAsync, getCurrentTime, increment, incrementAsync, startTimer } from './action';
import { DECREMENT, GET_TIME, INCREMENT, START_TIMER } from './action-types';

function* incrementAsyncSaga({ payload: count }: ReturnType<typeof increment>) {
  yield put(incrementAsync(count)); // Simula lógica asincrónica despachando la acción increment
}

function* decrementAsyncSaga({ payload: count }: ReturnType<typeof decrement>) {
  yield put(decrementAsync(count)); // Simula lógica asincrónica despachando la acción increment
}

function* startTimerAsyncSaga({ payload: { delayMs, callback } }: ReturnType<typeof startTimer>) {
  yield delay(delayMs);
  callback({
    ok: true,
    data: 'data to be returned to the callback goes here, if used with the promisifiedCallback function its accessible to the promise as well',
    message: 'this is an optional message',
  });
}

function* getCurrentTimeSaga({ payload: { callback } }: ReturnType<typeof getCurrentTime>) {
  const worldclockApiUrl = 'json/est/now';
  const response: ApiResponse<{ [key: string]: unknown }> = yield call(FetchService, worldclockApiUrl);
  callback(response);
}

export function* watchCounter() {
  yield takeLatest(INCREMENT, incrementAsyncSaga); // Escucha la acción `increment`
}

export function* watchDecrement() {
  yield takeLatest(DECREMENT, decrementAsyncSaga);
}

export function* watchStartTimer() {
  yield takeEvery(START_TIMER, startTimerAsyncSaga);
}

export function* watchGetTime() {
  yield takeLatest(GET_TIME, getCurrentTimeSaga);
}
