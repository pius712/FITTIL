import React, { useEffect, useCallback, useState } from 'react';
import AppLayout from '../../component/layout/AppLayout';
import AppMenu from '../../component/layout/AppMenu';
import LoadingSpinner from '../../component/layout/LoadingSpinner';
import Profile from '../../component/profile/Profile';
import FollowList from '../../component/follow/FollowList';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import Router, { useRouter } from 'next/router';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	SELECT_MENU_REQUEST,
	FETCH_FOLLOWINGS_REQUEST,
	FETCH_USER_INFO_REQUEST,
} from '../../actions';
import { END } from 'redux-saga';
const Followings = () => {
	const {
		me,
		targetUserInfo,
		followList,
		loadMyInfoError,
		logoutDone,
	} = useSelector(state => state.user);

	const router = useRouter();
	const { username } = router.query;
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const onChangePage = useCallback(
		value => {
			setPage(value);
			dispatch({
				type: FETCH_FOLLOWINGS_REQUEST,
				data: {
					username: username,
					page: value,
				},
			});
		},
		[username],
	);
	useEffect(() => {
		if (logoutDone) {
			Router.push('/');
		}
	}, [logoutDone]);
	useEffect(() => {
		if (loadMyInfoError) {
			alert('로그인이 필요합니다.');
		}
	});
	if (!me || !followList || !targetUserInfo) {
		return <LoadingSpinner></LoadingSpinner>;
	}
	return (
		<AppLayout
			targetname={username}
			left={<Profile targetname={username}></Profile>}
			menu={<AppMenu targetname={username}></AppMenu>}
			content={
				<>
					<FollowList type="followings" targetname={username} />
					{targetUserInfo.Followings.length > 30 ? (
						<Pagination
							style={{ textAlign: 'center' }}
							defaultCurrent={1}
							total={targetUserInfo.Followings.length}
							onChange={onChangePage}
						></Pagination>
					) : null}
				</>
			}
		></AppLayout>
	);
};
export default Followings;
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
			type: FETCH_USER_INFO_REQUEST,
			data: {
				targetname: query.username,
			},
		});
		store.dispatch({
			type: SELECT_MENU_REQUEST,
			data: 'followings',
		});
		store.dispatch({
			type: FETCH_FOLLOWINGS_REQUEST,
			data: {
				username: query.username,
			},
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
