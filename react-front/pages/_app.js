import React from 'react';
import wrapper from '../store/configureStore';
import 'antd/dist/antd.css';
import '../css/reset.css';
const App = ({ Component }) => {
	return <Component />;
};

export default wrapper.withRedux(App);
