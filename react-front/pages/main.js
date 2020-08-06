import React, { useEffect } from 'react';
import AppLayout from '../component/layout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import wrapper from '../store/configureStore';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	SELECT_MENU_REQUEST,
	FETCH_NOTE_LIST_REQUEST,
} from '../actions';
import { END } from 'redux-saga';

import MainContents from '../component/MainContents';
const Main = () => {
	const { me } = useSelector(state => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!me) {
			Router.replace('/');
		}
	});
	useEffect(() => {
		dispatch({
			type: FETCH_NOTE_LIST_REQUEST,
			data: {
				userId: me.id,
				limit: 6,
			},
		});
	});
	return <AppLayout content={<MainContents />}></AppLayout>;
};
export default Main;
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
		store.dispatch({
			type: SELECT_MENU_REQUEST,
			data: 'overview',
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
