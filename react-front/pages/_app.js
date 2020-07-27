import React from 'react';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';
import '../css/reset.css';
import 'antd/dist/antd.css';
const App = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default wrapper.withRedux(withReduxSaga(App));
