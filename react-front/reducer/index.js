import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user.js';
import note from './note.js';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE', HYDRATE);
			return { ...state, ...action.payload };

		default: {
			// 리듀서는 결국 state, action을 받는 함수이다. 그리고 state를 반환한다.
			// combineReducer를 호출하면 이 함수가 나온다.
			const combinedReducer = combineReducers({ user, note });
			return combinedReducer(state, action);
		}
	}
};

export default rootReducer;
