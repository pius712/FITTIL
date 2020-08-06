import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from '../../component/layout/AppLayout';
import RepoNavigation from '../../component/repo/RepoNavigation';
import RepoContents from '../../component/repo/RepoContents';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	SELECT_MENU_REQUEST,
	FETCH_NOTE_LIST_REQUEST,
	FETCH_NOTE_LENGTH_REQUEST,
} from '../../actions';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Divider, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import useSWR from 'swr';

const Repository = () => {
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);
	const { mainNotes, noteLength } = useSelector(state => state.note);
	const router = useRouter();
	const { username } = router.query;

	const [page, setPage] = useState(1);
	// const lastId =
	// 	mainNotes[mainNotes.length - 1] && mainNotes[mainNotes.length - 1].id;
	const onChangePage = useCallback(
		value => {
			dispatch({
				type: FETCH_NOTE_LIST_REQUEST,
				data: {
					userId: me.id,
					targetname: username,
					lastId: value,
				},
			});
		},
		[username, mainNotes],
	);
	useEffect(() => {
		if (!me && !me.id) {
			Router.replace('/');
		}
	});
	useEffect(() => {
		dispatch({
			type: FETCH_NOTE_LIST_REQUEST,
			data: {
				userId: me.id,
				targetname: username,
			},
		});
	}, []);
	return (
		<AppLayout
			targetname={username}
			content={
				<>
					<RepoNavigation></RepoNavigation>
					<Divider style={{ marginTop: '10px' }}></Divider>
					<RepoContents></RepoContents>
					<Pagination
						style={{ textAlign: 'center' }}
						defaultCurrent={1}
						total={noteLength}
						onChange={onChangePage}
					></Pagination>
				</>
			}
		></AppLayout>
	);
};

export default Repository;

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
			data: 'repo',
		});
		store.dispatch({
			type: FETCH_NOTE_LENGTH_REQUEST,
			data: {
				targetname: query.username,
			},
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
