import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import SignupLayout from '../component/layout/SignupLayout';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../actions';
import { END } from 'redux-saga';
const Home = () => {
	const { me, registerDone, registerError } = useSelector(state => state.user);

	useEffect(() => {
		if (me && me.id) {
			Router.push('/main');
		}
	});
	useEffect(() => {
		if (registerDone && me && me.id) {
			Router.push('/main');
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
