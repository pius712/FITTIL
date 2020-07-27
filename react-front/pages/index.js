import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import SignupLayout from '../component/layout/SignupLayout';
const Home = () => {
	const { me, registerDone } = useSelector(state => state.user);

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
