import React, { useEffect } from 'react';
import StatisticsContent from '../../component/statistics/StatisticsContent';
import Spinner from '../../component/layout/Spinner';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST, SELECT_MENU_REQUEST } from '../../actions';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { useSelector } from 'react-redux';
const Statistics = () => {
	const router = useRouter();
	const { username } = router.query;
	const { me, loadMyInfoError } = useSelector(state => state.user);

	useEffect(() => {
		if (!me || !me.id) {
			Router.replace('/');
		}
	});
	useEffect(() => {
		if (loadMyInfoError) {
			alert('로그인이 필요합니다.');
			Router.replace('/');
		}
	});
	if (!me) {
		return <Spinner></Spinner>;
	}
	return <StatisticsContent targetname={username}></StatisticsContent>;
};

export default Statistics;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req, query }) => {
		const cookie = req ? req.headers.cookie : '';
		console.log(query);
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = req.headers.cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch({
			type: SELECT_MENU_REQUEST,
			data: 'statistics',
		});
		// store.dispatch({
		// 	type: FETCH_NOTE_LENGTH_REQUEST,
		// 	data: {
		// 		targetname: query.username,
		// 	},
		// });
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
