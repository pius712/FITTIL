import {
	all,
	fork,
	call,
	put,
	takeLatest,
	delay,
	take,
} from 'redux-saga/effects';
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
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_FAILURE,
	LOAD_MY_INFO_SUCCESS,
	FETCH_USER_INFO_REQUEST,
	FETCH_USER_INFO_SUCCESS,
	FETCH_USER_INFO_FAILURE,
	EDIT_PROFILE_REQUEST,
	EDIT_PROFILE_SUCCESS,
	EDIT_PROFILE_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
	SEARCH_FOLLOW_REQUEST,
	SEARCH_FOLLOW_SUCCESS,
	SEARCH_FOLLOW_FAILURE,
	SEARCH_UNFOLLOW_REQUEST,
	SEARCH_UNFOLLOW_SUCCESS,
	SEARCH_UNFOLLOW_FAILURE,
	FETCH_FOLLOWERS_REQUEST,
	FETCH_FOLLOWERS_SUCCESS,
	FETCH_FOLLOWERS_FAILURE,
	FETCH_FOLLOWERS_LENGTH_REQUEST,
	FETCH_FOLLOWERS_LENGTH_SUCCESS,
	FETCH_FOLLOWERS_LENGTH_FAILURE,
	// 팔로잉 리스트 부르기
	FETCH_FOLLOWINGS_REQUEST,
	FETCH_FOLLOWINGS_SUCCESS,
	FETCH_FOLLOWINGS_FAILURE,
	FETCH_FOLLOWINGS_LENGTH_REQUEST,
	FETCH_FOLLOWINGS_LENGTH_SUCCESS,
	FETCH_FOLLOWINGS_LENGTH_FAILURE,
	SEARCH_USER_REQUEST,
	SEARCH_USER_SUCCESS,
	SEARCH_USER_FAILURE,
	SEARCH_USER_LENGTH_REQUEST,
	SEARCH_USER_LENGTH_SUCCESS,
	SEARCH_USER_LENGTH_FAILURE,
} from '../actions';
import {
	registerUserAPI,
	loginUserAPI,
	logoutUserAPI,
	loadMyInfoAPI,
	editProfileAPI,
	fetchUserInfoAPI,
	followUserAPI,
	unfollowUserAPI,
	searchUserAPI,
	searchUserLengthAPI,
	fetchFollowersAPI,
	fetchFollowingsAPI,
} from '../API';
//회원가입
function* registerUser(action) {
	try {
		console.log('resgister user');
		const result = yield call(registerUserAPI, action.data);
		yield delay(1000);
		yield put({
			type: REGISTER_USER_SUCCESS,
			data: result.data,
			// data: action.data,
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
		const result = yield call(loginUserAPI, action.data);
		yield put({
			type: LOGIN_USER_SUCCESS,
			data: result.data,
			// data: action.data,
		});
	} catch (err) {
		yield put({
			type: LOGIN_USER_FAILURE,
			error: err.response.data,
		});
	}
}
//로그아웃
function* logoutUser() {
	try {
		const result = yield call(logoutUserAPI);
		// yield call(Router.push, '/');
		yield put({
			type: LOGOUT_USER_SUCCESS,
			// data: result.data,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOGOUT_USER_FAILURE,
			error: err.response.data,
		});
	}
}
// 내 정보 서버로부터 불러오기
function* loadMyInfo() {
	try {
		const result = yield call(loadMyInfoAPI);
		yield put({
			type: LOAD_MY_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			error: err.response.data,
		});
	}
}
// 다른 사람 정보 서버로 부터 불러오기
function* fetchUserInfo(action) {
	try {
		const result = yield call(fetchUserInfoAPI, action.data);
		yield put({
			type: FETCH_USER_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: FETCH_USER_INFO_FAILURE,
			error: err.response.data,
		});
	}
}
// 프로필 데이터 수정
function* editProfile(action) {
	try {
		const result = yield call(editProfileAPI, action.data);
		yield put({
			type: EDIT_PROFILE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: EDIT_PROFILE_FAILURE,
			error: err.response.data,
		});
	}
}
// 유저 팔로우
function* followUser(action) {
	try {
		// console.log(action.data);
		const result = yield call(followUserAPI, action.data);
		yield put({
			type: FOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: FOLLOW_FAILURE,
			error: err.response.data,
		});
	}
}
// 유저 언팔로우
function* unfollowUser(action) {
	try {
		const result = yield call(unfollowUserAPI, action.data);
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UNFOLLOW_FAILURE,
			data: err.response.data,
		});
	}
}
// search 유저 팔로우
function* searchFollowUser(action) {
	try {
		// console.log(action.data);
		const result = yield call(followUserAPI, action.data);
		yield put({
			type: SEARCH_FOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: SEARCH_FOLLOW_FAILURE,
			error: err.response.data,
		});
	}
}
// search 유저 언팔로우
function* searchUnfollowUser(action) {
	try {
		const result = yield call(unfollowUserAPI, action.data);
		yield put({
			type: SEARCH_UNFOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: SEARCH_UNFOLLOW_FAILURE,
			data: err.response.data,
		});
	}
}
// 유저 검색
function* searchUser(action) {
	try {
		const result = yield call(searchUserAPI, action.data);
		yield put({
			type: SEARCH_USER_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: SEARCH_USER_FAILURE,
			error: err.response.data,
		});
	}
}
// 검색시 유저 총 수
function* searchUserLength(action) {
	try {
		const result = yield call(searchUserLengthAPI, action.data);
		yield put({
			type: SEARCH_USER_LENGTH_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: SEARCH_USER_LENGTH_FAILURE,
			error: err.response.data,
		});
	}
}
// 팔로워 리스트
function* fetchFollowers(action) {
	try {
		const result = yield call(fetchFollowersAPI, action.data);
		yield put({
			type: FETCH_FOLLOWERS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: FETCH_FOLLOWERS_FAILURE,
			error: err.response.data,
		});
	}
}
// 팔로잉 리스트
function* fetchFollowings(action) {
	try {
		const result = yield call(fetchFollowingsAPI, action.data);
		yield put({
			type: FETCH_FOLLOWINGS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: FETCH_FOLLOWINGS_FAILURE,
			error: err.response.data,
		});
	}
}
// 회원 가입
function* watchRegisterUser() {
	// console.log('watchRegister');
	yield takeLatest(REGISTER_USER_REQUEST, registerUser);
}

// 로그인
function* watchLoginUser() {
	// console.log('watchLgoinUser');
	yield takeLatest(LOGIN_USER_REQUEST, loginUser);
}
// 로그아웃
function* watchLogoutUser() {
	yield takeLatest(LOGOUT_USER_REQUEST, logoutUser);
}
// 내 정보 서버로부터 불러오기
function* watchLoadMyInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
// 다른 사람 정보 서버로부터 들고오기
function* watchFetchUserInfo() {
	yield takeLatest(FETCH_USER_INFO_REQUEST, fetchUserInfo);
}
// 프로필 데이터 수정
function* watchEditProfile() {
	yield takeLatest(EDIT_PROFILE_REQUEST, editProfile);
}
// 팔로우 하기
function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, followUser);
}
// 언팔로우 하기
function* watchUnfollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unfollowUser);
}
// search user 팔로우 하기
function* watchSearchFollow() {
	yield takeLatest(SEARCH_FOLLOW_REQUEST, searchFollowUser);
}
// search user 언팔로우 하기
function* watchSearchUnfollow() {
	yield takeLatest(SEARCH_UNFOLLOW_REQUEST, searchUnfollowUser);
}
// 유저 검색하기
function* watchSearchUser() {
	yield takeLatest(SEARCH_USER_REQUEST, searchUser);
}
// 총 유저 수 불러오기(검색하기)
function* watchSearchUserLength() {
	yield takeLatest(SEARCH_USER_LENGTH_REQUEST, searchUserLength);
}
// 팔로워 리스트 부르기
function* watchFetchFollowers() {
	yield takeLatest(FETCH_FOLLOWERS_REQUEST, fetchFollowers);
}
// 팔로워 총 숫자
// 팔로잉 리스트 부르기
function* watchFetchFollowings() {
	yield takeLatest(FETCH_FOLLOWINGS_REQUEST, fetchFollowings);
}
export default function* userSaga() {
	yield all([
		fork(watchRegisterUser),
		fork(watchLoginUser),
		fork(watchLogoutUser),
		fork(watchLoadMyInfo),
		fork(watchFetchUserInfo),
		fork(watchEditProfile),
		fork(watchFollow),
		fork(watchUnfollow),
		fork(watchSearchFollow),
		fork(watchSearchUnfollow),
		fork(watchSearchUser),
		fork(watchSearchUserLength),
		fork(watchFetchFollowers),
		fork(watchFetchFollowings),
	]);
}
