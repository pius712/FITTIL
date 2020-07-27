import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user.js';
import post from './post.js';

const rootReducer = combineReducers({
	index: (state = {}, action) => {
		switch (action.type) {
			case HYDRATE:
				return { ...state, ...action.payload };
			default:
				return state;
		}
	},
	user,
	post,
});

export default rootReducer;
