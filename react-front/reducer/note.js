import {
	FETCH_NOTE_LIST_REQUEST,
	FETCH_NOTE_LIST_SUCCESS,
	FETCH_NOTE_LIST_FAILURE,
	FETCH_NOTE_REQUEST,
	FETCH_NOTE_SUCCESS,
	FETCH_NOTE_FAILURE,
	UPLOAD_NOTE_REQUEST,
	UPLOAD_NOTE_SUCCESS,
	UPLOAD_NOTE_FAILURE,
	FETCH_NOTE_LENGTH_REQUEST,
	FETCH_NOTE_LENGTH_SUCCESS,
	FETCH_NOTE_LENGTH_FAILURE,
	EDIT_NOTE_REQUEST,
	EDIT_NOTE_SUCCESS,
	EDIT_NOTE_FAILURE,
	DELETE_NOTE_REQUEST,
	DELETE_NOTE_SUCCESS,
	DELETE_NOTE_FAILURE,
	SELECT_MENU_REQUEST,
	SELECT_NAVIGATION_REQUEST,
} from '../actions';
import produce from 'immer';
export const initialState = {
	mainNotes: [
		// {
		// 	id: 1,
		// 	User: {
		// 		id: 1,
		// 		nickname: 'pius',
		// 	},
		// 	title: '아아아아',
		// 	content: '오오오오',
		// 	level: '강',
		// 	part: ['어깨', '하체'],
		// 	public_availability: 'public',
		// },
		// {
		// 	id: 2,
		// 	User: {
		// 		id: 1,
		// 		nickname: 'pius',
		// 	},
		// 	title: 'aaaaaa',
		// 	content: 'bbbb',
		// 	level: '강',
		// 	part: ['가슴'],
		// 	public_availability: 'public',
		// },
		// {
		// 	id: 3,
		// 	User: {
		// 		id: 1,
		// 		nickname: 'pius',
		// 	},
		// 	title: 'ccccc',
		// 	content: 'dddd',
		// 	level: '강',
		// 	part: ['등'],
		// 	public_availability: 'public',
		// },
		// {
		// 	id: 6,
		// 	User: {
		// 		id: 1,
		// 		nickname: 'pius',
		// 	},
		// 	title: 'ccccc',
		// 	content: 'dddd',
		// 	level: '강',
		// 	part: ['삼두'],
		// 	public_availability: 'public',
		// },
		// {
		// 	id: 4,
		// 	User: {
		// 		id: 1,
		// 		nickname: 'pius',
		// 	},
		// 	title: 'ccccc',
		// 	content: 'dddd',
		// 	level: '강',
		// 	part: ['이두'],
		// 	public_availability: 'public',
		// },
		// {
		// 	id: 5,
		// 	User: {
		// 		id: 1,
		// 		nickname: 'pius',
		// 	},
		// 	title: 'ccccc',
		// 	content: 'dddd',
		// 	level: '강',
		// 	part: ['어깨', '하체'],
		// 	public_availability: 'public',
		// },
	],
	singleNote: {},
	imagePaths: [],
	noteLength: 1,
	descriptionTitle: 'Built for \n 헬린이',
	descriptionContent: `FITTIL은 헬린이의 운동능력 향상을 위한 플랫폼입니다. 초급자부터 상급자까지 아무나, 자신의 운동일지와 루틴을 올리고,
	관리할 수 있습니다.`,
	fetchNoteListLoading: false,
	fetchNoteListDone: false,
	fetchNoteListError: null,
	fetchNoteLoading: false,
	fetchNoteDone: false,
	fetchNoteError: null,
	fetchNoteLengthLoading: false,
	fetchNoteLengthDone: false,
	fetchNoteLengthError: null,
	uploadNoteLoading: false,
	uploadNoteDone: false,
	uploadNoteError: null,
	editNoteLoading: false,
	editNoteDone: false,
	editNoteError: null,
	deleteNoteLoading: false,
	deleteNoteDone: false,
	deleteNoteError: null,
	selectedMenu: '',
	selectedNavigation: '',
	// nameLoading: false,
	// nameDone: false,
	// nameError: null,
};
const reducer = (state = initialState, action) => {
	return produce(state, draftState => {
		switch (action.type) {
			// 게시글 리스트 로드
			case FETCH_NOTE_LIST_REQUEST:
				draftState.fetchNoteListLoading = true;
				draftState.fetchNoteListDone = false;
				draftState.fetchNoteError = null;
				break;
			case FETCH_NOTE_LIST_SUCCESS:
				draftState.fetchNoteListLoading = false;
				draftState.fetchNoteListDone = true;
				draftState.fetchNoteError = null;
				draftState.mainNotes = action.data;
				break;
			case FETCH_NOTE_LIST_FAILURE:
				draftState.fetchNoteListLoading = false;
				draftState.fetchNoteListDone = false;
				draftState.fetchNoteError = action.error;
				break;
			// 게시글 하나 로드
			case FETCH_NOTE_REQUEST:
				draftState.fetchNoteListLoading = true;
				draftState.fetchNoteListDone = false;
				draftState.fetchNoteListError = null;
				break;
			case FETCH_NOTE_SUCCESS:
				draftState.fetchNoteListLoading = false;
				draftState.fetchNoteListDone = true;
				draftState.fetchNoteListError = null;
				draftState.singlePost = action.data;
				break;
			case FETCH_NOTE_FAILURE:
				draftState.fetchNoteListLoading = false;
				draftState.fetchNoteListDone = false;
				draftState.fetchNoteListError = action.error;
				break;
			// 일지 업로드
			case UPLOAD_NOTE_REQUEST:
				draftState.uploadNoteLoading = true;
				draftState.uploadNoteDone = false;
				draftState.uploadNoteError = null;
				break;
			case UPLOAD_NOTE_SUCCESS:
				draftState.uploadNoteLoading = false;
				draftState.uploadNoteDone = true;
				draftState.mainNotes = draftState.mainNotes.concat(action.data);
				draftState.uploadNoteError = null;
				break;
			case UPLOAD_NOTE_FAILURE:
				draftState.uploadNoteLoading = false;
				draftState.uploadNoteDone = false;
				draftState.uploadNoteError = action.error;
				break;
			// 노트 총 길이
			case FETCH_NOTE_LENGTH_REQUEST:
				draftState.fetchNoteLengthLoading = true;
				draftState.fetchNoteLengthDone = false;
				draftState.fetchNoteLengthError = null;
				break;
			case FETCH_NOTE_LENGTH_SUCCESS:
				draftState.fetchNoteLengthLoading = false;
				draftState.fetchNoteLengthDone = true;
				draftState.fetchNoteLengthError = null;
				draftState.noteLength = action.data.count;
				break;
			case FETCH_NOTE_LENGTH_FAILURE:
				console.log(action.error);
				draftState.fetchNoteLengthLoading = false;
				draftState.fetchNoteLengthDone = false;
				draftState.fetchNoteLengthError = action.error;
				break;
			// 노트 수정
			case EDIT_NOTE_REQUEST:
				draftState.editNoteLoading = true;
				draftState.editNoteDone = false;
				draftState.editNoteError = null;
				break;
			case EDIT_NOTE_SUCCESS: {
				draftState.editNoteLoading = false;
				draftState.editNoteDone = true;
				draftState.editNoteError = null;
				const idx = draftState.mainNotes.findIndex(
					note => note.id === action.data.id,
				);
				draftState.mainNotes[idx] = action.data;
				break;
			}
			case EDIT_NOTE_FAILURE:
				draftState.editNoteLoading = false;
				draftState.editNoteDone = false;
				draftState.editNoteError = action.error;
				break;
			// 노트 삭제
			case DELETE_NOTE_REQUEST:
				draftState.deleteNoteLoading = true;
				draftState.deleteNoteDone = false;
				draftState.deleteNoteError = null;
				break;
			case DELETE_NOTE_SUCCESS: {
				draftState.deleteNoteLoading = false;
				draftState.deleteNoteDone = true;
				draftState.deleteNoteError = null;
				const idx = draftState.mainNotes.findIndex(
					note => note.id === action.data.noteId,
				);
				console.log(idx);
				draftState.mainNotes.splice(idx, 1);
				break;
			}
			case DELETE_NOTE_FAILURE:
				draftState.deleteNoteLoading = false;
				draftState.deleteNoteDone = false;
				draftState.deleteNoteError = action.error;
				break;
			// main 화면네비게이션 선택
			case SELECT_MENU_REQUEST:
				draftState.selectedMenu = action.data;
				break;
			case SELECT_NAVIGATION_REQUEST:
				draftState.selectedNavigation = action.data;
				break;
			// case FETCH_NOTE_LIST_REQUEST:
			// 	break;
			// case FETCH_NOTE_LIST_SUCCESS:
			// 	break;
			// case FETCH_NOTE_LIST_FAILURE:
			// 	break;
			default:
				break;
		}
	});
};

export default reducer;
