import React, { useEffect } from 'react';
import AppLayout from '../../component/layout/AppLayout';
import AppMenu from '../../component/layout/AppMenu';
import Spinner from '../../component/layout/Spinner';
import Profile from '../../component/profile/Profile';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	SELECT_MENU_REQUEST,
	FETCH_NOTE_LIST_REQUEST,
	FETCH_USER_INFO_REQUEST,
} from '../../actions';
import { END } from 'redux-saga';
import MainContents from '../../component/MainContents';
const Main = () => {
	const { me, targetUserInfo, loadMyInfoError } = useSelector(
		state => state.user,
	);

	const router = useRouter();
	const { username } = router.query;
	const dispatch = useDispatch();
	useEffect(() => {
		if (!me || !targetUserInfo) {
			Router.push('/');
		}
	}, [me]);
	useEffect(() => {
		if (loadMyInfoError) {
			alert('로그인이 필요합니다.');
			Router.replace('/');
		}
	});
	if (!me || !targetUserInfo) {
		return <Spinner></Spinner>;
	}
	return (
		<AppLayout
			targetname={username}
			left={<Profile targetname={username}></Profile>}
			menu={<AppMenu targetname={username}></AppMenu>}
			content={<MainContents targetname={username} />}
		></AppLayout>
	);
};
export default Main;
export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req, query }) => {
		// console.log(query);
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = req.headers.cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch({
			type: SELECT_MENU_REQUEST,
			data: 'overview',
		});
		store.dispatch({
			type: FETCH_NOTE_LIST_REQUEST,
			data: {
				targetname: query.username,
				limit: 10,
			},
		});
		store.dispatch({
			type: FETCH_USER_INFO_REQUEST,
			data: {
				targetname: query.username,
			},
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
