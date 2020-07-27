import {} from '../actions';
import produce from 'immer';
export const initialState = {
	descriptionTitle: 'Built for \n 헬린이',
	descriptionContent: `FITTIL은 헬린이의 운동능력 향상을 위한 플랫폼입니다. 초급자부터 상급자까지 아무나, 자신의 운동일지와 루틴을 올리고,
	관리할 수 있습니다.`,
};
const reducer = (state = initialState, action) => {
	return produce(state, draftState => {
		switch (action.type) {
			default:
				return state;
		}
	});
};

export default reducer;
