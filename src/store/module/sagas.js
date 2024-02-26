// sagas.js
import { takeEvery, put } from 'redux-saga/effects';

export function* watchToggleStatus() {
  yield takeEvery('TOGGLE_STATUS_ASYNC', toggleStatusAsync);
}

function* toggleStatusAsync() {
  yield put({ type: 'TOGGLE_STATUS' });
}
