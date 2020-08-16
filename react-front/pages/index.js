import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import SignupLayout from '../component/layout/SignupLayout';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../actions';
import { END } from 'redux-saga';
const Home = () => {
	const {
		me,
		pendingUser,
		registerDone,
		registerError,
		logoutLoading,
	} = useSelector(state => state.user);

	// 이메일 인증 보낸것 완료.
	useEffect(() => {
		if (registerDone) {
			Router.replace(`/${pendingUser.nickname}/join`);
		}
	});
	// 이메일 인증 실패.
	useEffect(() => {
		if (registerError) {
			alert(registerError);
		}
	});
	// 이미 로그인 되어있을때,
	useEffect(() => {
		if (me && me.id) {
			Router.replace(`/${me.nickname}`);
		}
	});

	return <SignupLayout></SignupLayout>;
};

export default Home;
export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = req.headers.cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
