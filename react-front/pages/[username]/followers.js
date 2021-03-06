import React, { useEffect, useState, useCallback } from 'react';
import AppLayout from '../../component/layout/AppLayout';
import AppMenu from '../../component/layout/AppMenu';
import Profile from '../../component/profile/Profile';
import LoadingSpinner from '../../component/layout/LoadingSpinner';
import FollowList from '../../component/follow/FollowList';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Pagination } from 'antd';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	SELECT_MENU_REQUEST,
	FETCH_FOLLOWERS_REQUEST,
	FETCH_USER_INFO_REQUEST,
} from '../../actions';
import { END } from 'redux-saga';
const Followers = () => {
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
				type: FETCH_FOLLOWERS_REQUEST,
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
			alert(loadMyInfoError);
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
					{targetUserInfo.Followers.length > 30 ? (
						<Pagination
							style={{ textAlign: 'center' }}
							defaultCurrent={1}
							total={targetUserInfo.Followers.length}
							onChange={onChangePage}
						></Pagination>
					) : null}
				</>
			}
		></AppLayout>
	);
};
export default Followers;
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
			data: 'followers',
		});
		store.dispatch({
			type: FETCH_FOLLOWERS_REQUEST,
			data: {
				username: query.username,
			},
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
