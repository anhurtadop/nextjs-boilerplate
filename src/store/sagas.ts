import { all, fork } from 'redux-saga/effects';
import { watchCounter, watchDecrement, watchGetTime, watchStartTimer } from './counter/saga';

export default function* allSagas() {
  yield all([fork(watchCounter), fork(watchStartTimer), fork(watchGetTime), fork(watchDecrement)]);
}
