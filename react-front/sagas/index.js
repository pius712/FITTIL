import { fork, call, put, delay, all } from 'redux-saga/effects';
import userSaga from './user';
import noteSaga from './note';
export default function* rootSaga() {
	yield all([fork(userSaga), fork(noteSaga)]);
}
