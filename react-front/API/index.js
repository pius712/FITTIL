import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

// 회원가입
const registerUserAPI = data => {
	return axios.post('user/signin', data);
};
// 로그인
const loginUserAPI = data => {
	return axios.post('user/login', data);
};
// 로그아웃
const logoutUserAPI = () => {
	return axios.post('user/logout');
};

// 내 정보 불러오기
const fetchMyInfoAPI = () => {
	return axios.get('user');
};

// 닉내임 수정
const editNicknameAPI = data => {
	return axios.patch('user/edit/nickname', data);
};

// 게시글 불러오기
const fetchPostAPI = () => {
	return axios.get('post');
};

export {
	registerUserAPI,
	loginUserAPI,
	logoutUserAPI,
	fetchMyInfoAPI,
	editNicknameAPI,
	fetchPostAPI,
};
