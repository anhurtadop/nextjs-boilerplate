import { all, fork } from 'redux-saga/effects';
import { watchCounter, watchGetTime, watchStartTimer } from './counter/saga';

export default function* allSagas() {
  yield all([fork(watchCounter), fork(watchStartTimer), fork(watchGetTime)]);
}
