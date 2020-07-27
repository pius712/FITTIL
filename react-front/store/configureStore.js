import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import reducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas';
const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [sagaMiddleware];

	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middleware))
			: composeWithDevTools(applyMiddleware(...middleware));

	const store = createStore(reducer, enhancer);
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

const wrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
