import { all, fork, call, put, takeLatest, delay } from 'redux-saga/effects';
import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAILURE,
} from '../actions';
import { registerUserAPI, loginUserAPI, logoutUserAPI } from '../API';
//회원가입
function* registerUser(action) {
	try {
		console.log('resgister user');
		// const result = yield call(registerUserAPI, action.data);
		yield delay(1000);
		yield put({
			type: REGISTER_USER_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: REGISTER_USER_FAILURE,
			error: err.response.data,
		});
	}
}
// 로그인
function* loginUser(action) {
	try {
		// const result = yield call(loginUserAPI, action.data);
		yield put({
			type: LOGIN_USER_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: LOGIN_USER_FAILURE,
			error: err.response.data,
		});
	}
}
//로그아웃
function* logoutUser(action) {
	try {
		// const result = yield call(logoutUserAPI, action.data);
		yield put({
			type: LOGOUT_USER_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: LOGOUT_USER_FAILURE,
			error: err.response.data,
		});
	}
}
// 회원 가입
function* watchRegisterUser() {
	console.log('watchRegister');
	yield takeLatest(REGISTER_USER_REQUEST, registerUser);
}

// 로그인
function* watchLoginUser() {
	console.log('watchLgoinUser');
	yield takeLatest(LOGIN_USER_REQUEST, loginUser);
}
// 로그아웃

function* watchLogoutUser() {
	yield takeLatest(LOGOUT_USER_REQUEST, logoutUser);
}
export default function* userSaga() {
	yield all([
		fork(watchRegisterUser),
		fork(watchLoginUser),
		fork(watchLogoutUser),
	]);
}
