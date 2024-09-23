import { all, fork } from 'redux-saga/effects';
import { watchCounter, watchStartTimer } from './counter/saga';

export default function* allSagas() {
  yield all([fork(watchCounter), fork(watchStartTimer)]);
}
