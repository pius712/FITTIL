import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchLayout from '../../../component/layout/SearchLayout';
import SearchNavigation from '../../../component/search/SearchNavigation';
import SearchContents from '../../../component/search/SearchUsers';
import Router from 'next/router';
import wrapper from '../../../store/configureStore';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	SELECT_NAVIGATION_REQUEST,
	SEARCH_PHOTOS_REQUEST,
} from '../../../actions';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
const SearchPhotos = () => {
	const router = useRouter();
	const { name } = router.query;
	const { me, loadMyInfoError, searchUser, serachUserError } = useSelector(
		state => state.user,
	);
	useEffect(() => {
		if (!me) {
			Router.push('/');
		}
	}, [me]);
	useEffect(() => {
		if (loadMyInfoError) {
			alert('로그인이 필요합니다.');
		}
	});
	// if (!serachUserError) {
	// 	return '검색결과가 없습니다.';
	// }
	// if (!me || !searchUser) {
	// 	return '잠시만 기다려주세요...';
	// }
	return (
		// <div>준비중</div>
		<SearchLayout
			targetname={name}
			left={<SearchNavigation></SearchNavigation>}
			content={<div>준비중</div>}
		></SearchLayout>
	);
};

export default SearchPhotos;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req, query }) => {
		const cookie = req ? req.headers.cookie : '';
		// console.log(query);
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = req.headers.cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch({
			type: SELECT_NAVIGATION_REQUEST,
			data: 'photos',
		});
		store.dispatch({
			type: SEARCH_PHOTOS_REQUEST,
			data: {
				username: query.name,
			},
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
