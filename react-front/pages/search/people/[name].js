import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';
import SearchLayout from '../../../component/layout/SearchLayout';
import SearchNavigation from '../../../component/search/SearchNavigation';
import SearchUsers from '../../../component/search/SearchUsers';
import Router from 'next/router';
import wrapper from '../../../store/configureStore';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	SELECT_NAVIGATION_REQUEST,
	SEARCH_USER_REQUEST,
	SEARCH_USER_LENGTH_REQUEST,
} from '../../../actions';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';
const SearchPeople = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { name } = router.query;
	const {
		me,
		loadMyInfoError,
		searchUser,
		serachUserError,
		totalSearchUserLength,
	} = useSelector(state => state.user);
	const [page, setPage] = useState(1);
	// const lastId =
	// 	mainNotes[mainNotes.length - 1] && mainNotes[mainNotes.length - 1].id;
	const onChangePage = useCallback(
		value => {
			setPage(value);
			dispatch({
				type: SEARCH_USER_REQUEST,
				data: {
					username: name,
					page: value,
				},
			});
		},
		[name, dispatch],
	);
	// useEffect(() => {
	// 	if (!me) {
	// 		Router.push('/');
	// 	}
	// }, [me]);c
	useEffect(() => {
		if (loadMyInfoError) {
			alert('로그인이 필요합니다.');
		}
	});
	// if (!serachUserError) {
	// 	return '검색결과가 없습니다.';
	// }
	if (!me || !searchUser) {
		return '잠시만 기다려주세요...';
	}
	return (
		<SearchLayout
			targetname={name}
			left={<SearchNavigation></SearchNavigation>}
			content={
				<>
					<SearchUsers></SearchUsers>
					{totalSearchUserLength < 10 ? null : (
						<Pagination
							style={{ textAlign: 'center' }}
							defaultCurrent={1}
							total={totalSearchUserLength}
							onChange={onChangePage}
						></Pagination>
					)}
				</>
			}
		></SearchLayout>
	);
};

export default SearchPeople;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req, query }) => {
		const cookie = req ? req.headers.cookie : '';
		console.log('getserver');
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = req.headers.cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch({
			type: SELECT_NAVIGATION_REQUEST,
			data: 'people',
		});
		store.dispatch({
			type: SEARCH_USER_REQUEST,
			data: {
				username: query.name,
			},
		});
		store.dispatch({
			type: SEARCH_USER_LENGTH_REQUEST,
			data: {
				username: query.name,
			},
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
