import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	// 이메일 인증
	AUTH_USER_REQUEST,
	AUTH_USER_SUCCESS,
	AUTH_USER_FAILURE,
	// 이메일 재전송
	AUTH_AGAIN_REQUEST,
	AUTH_AGAIN_SUCCESS,
	AUTH_AGAIN_FAILURE,
	// 대기 중인 유저 정보 가져오기
	FETCH_PENDING_USER_REQUEST,
	FETCH_PENDING_USER_SUCCESS,
	FETCH_PENDING_USER_FAILURE,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAILURE,
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
	LOAD_MY_INFO_FAILURE,
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
	SEARCH_USER_REQUEST,
	SEARCH_USER_SUCCESS,
	SEARCH_USER_FAILURE,
	SEARCH_USER_LENGTH_REQUEST,
	SEARCH_USER_LENGTH_SUCCESS,
	SEARCH_USER_LENGTH_FAILURE,
	FETCH_FOLLOWINGS_REQUEST,
	FETCH_FOLLOWINGS_SUCCESS,
	FETCH_FOLLOWINGS_FAILURE,
	FETCH_FOLLOWERS_REQUEST,
	FETCH_FOLLOWERS_SUCCESS,
	FETCH_FOLLOWERS_FAILURE,
} from '../actions';
import produce from 'immer';
const initialState = {
	me: null,
	pendingUser: null,
	targetUserInfo: null,
	searchUser: null,
	followList: null,
	totalFollowLength: 1,
	totalSearchUserLength: 1,
	registerLoading: false,
	registerDone: false,
	registerError: null,
	loginLoading: false,
	loginDone: false,
	loginError: null,
	logoutLoading: false,
	logoutDone: false,
	logoutError: null,
	loadMyInfoLoading: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,
	fetchUserInfoLoading: false,
	fetchUserInfoDone: false,
	fetchUserInfoError: null,
	editProfileLoading: false,
	editProfileDone: false,
	editProfileError: null,
	followLoading: false,
	followDone: false,
	followError: null,
	unfollowLoading: false,
	unfollowDone: false,
	unfollowError: null,
	fetchFollowLoading: false,
	fetchFollowDone: false,
	fetchFollowError: null,

	searchFollowLoading: false,
	searchFollowDone: false,
	searchFollowError: null,
	searchUnfollowLoading: false,
	searchUnfollowDone: false,
	searchUnfollowError: null,
	searchUserLoading: false,
	searchUserDone: false,
	searchUserError: null,
	searchUserLengthLoading: false,
	searchUserLengthDone: false,
	searchUserLengthError: null,
	authUserLoading: false,
	authUserDone: false,
	authUserError: null,
	authAgainLoading: false,
	authAgainDone: false,
	authAgainError: null,
	fetchPendingUserLoading: false,
	fetchPendingUserDone: false,
	fetchPendingUserError: null,
};
const dummyUser = data => ({
	...data, // nickname, email, password
	nickname: 'pius712', // 로그인 용
	id: 1,
	Posts: [],
	Followings: [],
	Followers: [],
});
const reducer = (state = initialState, action) => {
	return produce(state, draftState => {
		switch (action.type) {
			// case REGISTER_USER_REQUEST:
			// 	draftState.registerLoading = true;
			// 	draftState.registerDone = false;
			// 	draftState.registerError = null;
			// 	break;
			// case REGISTER_USER_SUCCESS:
			// 	draftState.registerLoading = false;
			// 	draftState.registerDone = true;
			// draftState.registerError = null;
			// 	break;
			// case REGISTER_USER_FAILURE:
			// 	draftState.registerLoading = false;
			// draftState.registerDone = false;
			// 	draftState.registerError = action.error;
			// 	break;
			//회원가입
			case REGISTER_USER_REQUEST:
				draftState.registerLoading = true;
				draftState.registerDone = false;
				draftState.registerError = null;
				break;
			case REGISTER_USER_SUCCESS:
				draftState.registerLoading = false;
				draftState.registerDone = true;
				draftState.pendingUser = action.data;
				break;
			case REGISTER_USER_FAILURE:
				draftState.registerLoading = false;
				draftState.registerError = action.error;
				break;
			//로그인
			case LOGIN_USER_REQUEST:
				draftState.loginLoading = true;
				draftState.loginDone = false;
				draftState.loginError = null;
				break;
			case LOGIN_USER_SUCCESS:
				draftState.loginLoading = false;
				draftState.loginDone = true;
				draftState.me = action.data;
				break;
			case LOGIN_USER_FAILURE:
				draftState.loginLoading = false;
				draftState.loginError = action.error;
				break;
			// 인증 코드 입력
			case AUTH_USER_REQUEST:
				draftState.authUserLoading = true;
				draftState.authUserDone = false;
				draftState.authUserError = null;
				break;
			case AUTH_USER_SUCCESS:
				draftState.authUserLoading = false;
				draftState.authUserDone = true;
				break;
			case AUTH_USER_FAILURE:
				draftState.authUserLoading = false;
				draftState.authUserError = action.error;
				break;
			// 인증 이메일 재전송
			case AUTH_AGAIN_REQUEST:
				draftState.authAgainLoading = true;
				draftState.authAgainDone = false;
				draftState.authAgainError = null;
				break;
			case AUTH_AGAIN_SUCCESS:
				draftState.authAgainLoading = false;
				draftState.authAgainDone = true;
				break;
			case AUTH_AGAIN_FAILURE:
				draftState.authAgainLoading = false;
				draftState.authAgainError = action.error;
				break;
			// pending user 가져오기
			case FETCH_PENDING_USER_REQUEST:
				draftState.fetchPendingUserLoading = true;
				draftState.fetchPendingUserDone = false;
				draftState.fetchPendingUserError = null;
				break;
			case FETCH_PENDING_USER_SUCCESS:
				draftState.fetchPendingUserLoading = false;
				draftState.fetchPendingUserDone = true;
				draftState.pendingUser = action.data;
				break;
			case FETCH_PENDING_USER_FAILURE:
				draftState.fetchPendingUserLoading = false;
				draftState.fetchPendingUserError = action.error;
				break;
			// 로그아웃
			case LOGOUT_USER_REQUEST:
				draftState.logoutLoading = true;
				draftState.logoutDone = false;
				draftState.logoutError = null;
				break;
			case LOGOUT_USER_SUCCESS:
				draftState.logoutLoading = false;
				draftState.logoutDone = true;
				draftState.me = null;
				break;
			case LOGOUT_USER_FAILURE:
				draftState.logoutLoading = false;
				draftState.logoutError = action.error;
				break;
			case LOAD_MY_INFO_REQUEST:
				draftState.loadMyInfoLoading = true;
				draftState.loadMyInfoDone = false;
				draftState.loadMyInfoError = null;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draftState.loadMyInfoLoading = false;
				draftState.loadMyInfoDone = true;
				console.log('loadmyinfosuccess', action.data);
				draftState.me = action.data;
				break;
			case LOAD_MY_INFO_FAILURE:
				draftState.loadMyInfoLoading = false;
				draftState.loadMyInfoError = action.error;
				break;
			// 타인 정보 불러오기
			case FETCH_USER_INFO_REQUEST:
				draftState.fetchUserInfoLoading = true;
				draftState.fetchUserInfoDone = false;
				draftState.fetchUserInfoError = null;
				break;
			case FETCH_USER_INFO_SUCCESS:
				draftState.fetchUserInfoLoading = false;
				draftState.fetchUserInfoDone = true;
				draftState.targetUserInfo = action.data;
				break;
			case FETCH_USER_INFO_FAILURE:
				draftState.fetchUserInfoLoading = false;
				draftState.fetchUserInfoError = action.error;
				break;
			case EDIT_PROFILE_REQUEST:
				draftState.editProfileLoading = true;
				draftState.editProfileDone = false;
				draftState.editProfileError = null;
				break;
			case EDIT_PROFILE_SUCCESS:
				draftState.editProfileLoading = false;
				draftState.editProfileDone = true;
				console.log(action.data);
				draftState.me = action.data;
				break;
			case EDIT_PROFILE_FAILURE:
				draftState.editProfileLoading = false;
				draftState.editProfileError = action.error;
				break;
			// 팔로우
			case FOLLOW_REQUEST:
				draftState.followLoading = true;
				draftState.followDone = false;
				draftState.followError = null;
				break;
			case FOLLOW_SUCCESS:
				draftState.followLoading = false;
				draftState.followDone = true;
				draftState.me.Followings.push({ id: action.data.followingId });
				draftState.targetUserInfo.Followers.push({ id: draftState.me.id });
				break;
			case FOLLOW_FAILURE:
				draftState.followLoading = false;
				draftState.followError = action.error;
				break;
			// 언팔로우
			case UNFOLLOW_REQUEST:
				draftState.unfollowLoading = true;
				draftState.unfollowDone = false;
				draftState.unfollowError = null;
				break;
			case UNFOLLOW_SUCCESS: {
				draftState.unfollowLoading = false;
				draftState.unfollowDone = true;

				const followingIdx = draftState.me.Followings.findIndex(
					following => following.id === action.data.followingId,
				);
				const followerIdx = draftState.targetUserInfo.Followers.findIndex(
					follower => follower.id === draftState.me.id,
				);
				draftState.me.Followings.splice(followingIdx, 1);
				draftState.targetUserInfo.Followers.splice(followerIdx, 1);
				break;
			}
			case UNFOLLOW_FAILURE:
				draftState.unfollowLoading = false;
				draftState.unfollowError = action.error;
				break;
			// 서치 유저에서 팔로우
			case SEARCH_FOLLOW_REQUEST:
				draftState.searchFollowLoading = true;
				draftState.searchFollowDone = false;
				draftState.searchFollowError = null;
				break;
			case SEARCH_FOLLOW_SUCCESS:
				draftState.searchFollowLoading = false;
				draftState.searchFollowDone = true;
				draftState.me.Followings.push({ id: action.data.followingId });
				break;
			case SEARCH_FOLLOW_FAILURE:
				draftState.searchFollowLoading = false;
				draftState.searchFollowError = action.error;
				break;
			// 언팔로우
			case SEARCH_UNFOLLOW_REQUEST:
				draftState.searchUnfollowLoading = true;
				draftState.searchUnfollowDone = false;
				draftState.searchUnfollowError = null;
				break;
			case SEARCH_UNFOLLOW_SUCCESS: {
				draftState.searchUnfollowLoading = false;
				draftState.searchUnfollowDone = true;
				const followingIdx = draftState.me.Followings.findIndex(
					following => following.id === action.data.followingId,
				);
				draftState.me.Followings.splice(followingIdx, 1);
				break;
			}
			case SEARCH_UNFOLLOW_FAILURE:
				draftState.searchUnfollowLoading = false;
				draftState.searchUnfollowError = action.error;
				break;
			// 유저 검색 리스트 불러오기 10명
			case SEARCH_USER_REQUEST:
				draftState.searchUserLoading = true;
				draftState.searchUserDone = false;
				draftState.searchUserError = null;
				break;
			case SEARCH_USER_SUCCESS:
				draftState.searchUserLoading = false;
				draftState.searchUserDone = true;
				draftState.searchUser = action.data;
				break;
			case SEARCH_USER_FAILURE:
				draftState.searchUserLoading = false;
				draftState.searchUserError = action.error;
				break;
			// 유저 검색 총 숫자
			case SEARCH_USER_LENGTH_REQUEST:
				draftState.searchUserLengthLoading = true;
				draftState.searchUserLengthDone = false;
				draftState.searchUserLengthError = null;
				break;
			case SEARCH_USER_LENGTH_SUCCESS:
				draftState.searchUserLengthLoading = false;
				draftState.searchUserLengthDone = true;
				draftState.totalSearchUserLength = action.data.count;
				break;
			case SEARCH_USER_LENGTH_FAILURE:
				draftState.searchUserLengthLoading = false;
				draftState.searchUserLengthError = action.error;
				break;
			// 팔로우 팔로잉 리스트
			case FETCH_FOLLOWINGS_REQUEST:
				draftState.fetchFollowLoading = true;
				draftState.fetchFollowDone = false;
				draftState.fetchFollowError = null;
				break;
			case FETCH_FOLLOWINGS_SUCCESS:
				draftState.fetchFollowLoading = false;
				draftState.fetchFollowDone = true;
				draftState.followList = action.data;
				break;
			case FETCH_FOLLOWINGS_FAILURE:
				draftState.fetchFollowLoading = false;
				draftState.fetchFollowError = action.error;
				break;
			case FETCH_FOLLOWERS_REQUEST:
				draftState.fetchFollowLoading = true;
				draftState.fetchFollowDone = false;
				draftState.fetchFollowError = null;
				break;
			case FETCH_FOLLOWERS_SUCCESS:
				draftState.fetchFollowLoading = false;
				draftState.fetchFollowDone = true;
				draftState.followList = action.data;
				break;
			case FETCH_FOLLOWERS_FAILURE:
				draftState.fetchFollowLoading = false;
				draftState.fetchFollowError = action.error;
				break;
			default:
				break;
		}
	});
};

export default reducer;
