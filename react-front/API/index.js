import axios from 'axios';
import { backUrl } from '../config/config.js';
axios.defaults.baseURL = backUrl;
// 'http://localhost:8080';
axios.defaults.withCredentials = true;

// 회원가입
const registerUserAPI = data => {
	return axios.post('user/signup', data);
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
const loadMyInfoAPI = () => {
	return axios.get('user');
};

// 닉내임 수정
const editNicknameAPI = data => {
	return axios.patch('user/edit/nickname', data);
};
// 프로필 내용 수정
const editProfileAPI = data => {
	// console.log('보내냐???');
	return axios.patch('user/edit/profile', data);
};

// 노트 작성
const uploadNoteAPI = data => {
	return axios.post('note', data);
};

// 일지 목록 불러오기
const fetchNoteListAPI = data => {
	return axios.get(
		`note/list?targetname=${data.targetname}&lastId=${data.lastId || 0}&limit=${
			data.limit || 10
		}`,
	);
};
// 일지 하나 불러오기
const fetchNoteAPI = data => {
	return axios.get(`note/${data.postId}`);
};
// 일지 길이 불러오기
const fetchNoteLengthAPI = data => {
	return axios.get(`note/length/${data.targetname}`);
};
// 게시글 불러오기
const fetchPostAPI = () => {
	return axios.get('post');
};
// 노트 수정
const editNoteAPI = data => {
	return axios.patch('note/edit', data);
};
// 노트 삭제
const deleteNoteAPI = data => {
	return axios.delete(`note/${data.noteId}`);
};
// 다른 사람 프로필 가져오기
const fetchUserInfoAPI = data => {
	return axios.get(`user/${data.targetname}`);
};
// 노트 public 전환
const makeNotePublicAPI = () => {};
// 노트 private 전환
const makeNotePrivateAPI = () => {};
// 노트 신고하기
const reportNoteAPI = () => {};
// 팔로우
const followUserAPI = data => {
	// console.log(data);
	return axios.patch(`user/${data.nickname}/follow`);
};
// 팔로우 취소
const unfollowUserAPI = data => {
	return axios.patch(`user/${data.nickname}/unfollow`);
};
// 유저 검색 10명
const searchUserAPI = data => {
	return axios.get(`user/search?username=${data.username}&page=${data.page}`);
};
const searchUserLengthAPI = data => {
	return axios.get(`user/length/serach/${data.username}`);
};
// username의 팔로워 가져오기 (limit: 30)
const fetchFollowersAPI = data => {
	return axios.get(
		`user/followers/list?username=${data.username}&page=${data.page || 0}`,
	);
};
// userame의 팔로잉 가져오기 (limit: 30)
const fetchFollowingsAPI = data => {
	return axios.get(
		`user/followings/list?username=${data.username}&page=${data.page || 0}`,
	);
};
export {
	registerUserAPI,
	loginUserAPI,
	logoutUserAPI,
	loadMyInfoAPI,
	editNicknameAPI,
	editProfileAPI,
	fetchPostAPI,
	fetchNoteListAPI,
	fetchNoteAPI,
	uploadNoteAPI,
	fetchNoteLengthAPI,
	editNoteAPI,
	deleteNoteAPI,
	fetchUserInfoAPI,
	makeNotePublicAPI,
	makeNotePrivateAPI,
	reportNoteAPI,
	followUserAPI,
	unfollowUserAPI,
	searchUserAPI,
	searchUserLengthAPI,
	fetchFollowersAPI,
	fetchFollowingsAPI,
};
