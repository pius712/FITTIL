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
import produce from 'immer';
const initialState = {
	me: null,
	registerLoading: false,
	registerDone: false,
	registerError: null,
	loginLoading: false,
	loginDone: false,
	loginError: null,
	logoutLoading: false,
	logoutDone: false,
	logoutError: null,
};
const dummyUser = data => ({
	...data, // nickname, email, password
	nickname: 'pius712', // 로그인 용
	id: 1,
	Posts: [],
	StaringUser: [],
	StareedUser: [],
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
			case REGISTER_USER_REQUEST:
				draftState.registerLoading = true;
				draftState.registerDone = false;
				draftState.registerError = null;
				break;
			case REGISTER_USER_SUCCESS:
				draftState.registerLoading = false;
				draftState.registerDone = true;
				draftState.me = dummyUser(action.data);
				break;
			case REGISTER_USER_FAILURE:
				draftState.registerLoading = false;
				draftState.registerError = action.error;
				break;
			case LOGIN_USER_REQUEST:
				draftState.loginLoading = true;
				draftState.loginDone = false;
				draftState.loginError = null;
				break;
			case LOGIN_USER_SUCCESS:
				draftState.loginLoading = false;
				draftState.loginDone = true;
				draftState.me = dummyUser(action.data);
				break;
			case LOGIN_USER_FAILURE:
				draftState.loginLoading = false;
				draftState.loginError = action.error;
				break;
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
			default:
				break;
		}
	});
};

export default reducer;
