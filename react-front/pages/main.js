import React, { useEffect } from 'react';
import AppLayout from '../component/layout/AppLayout';
import { useSelector } from 'react-redux';
import Router from 'next/router';
const Main = () => {
	const { me } = useSelector(state => state.user);
	useEffect(() => {
		if (!me) {
			Router.replace('/');
		}
	});
	return <AppLayout>main</AppLayout>;
};
export default Main;
