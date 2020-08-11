import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import {} from 'redux-saga/effects';
import {
	FETCH_NOTE_LIST_REQUEST,
	FETCH_NOTE_REQUEST,
	FETCH_NOTE_LIST_SUCCESS,
	FETCH_NOTE_FAILURE,
	FETCH_NOTE_SUCCESS,
	FETCH_NOTE_LIST_FAILURE,
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
	MAKE_NOTE_PUBLIC_REQUEST,
	MAKE_NOTE_PUBLIC_SUCCESS,
	MAKE_NOTE_PUBLIC_FAILURE,
	MAKE_NOTE_PRIVATE_REQUEST,
	MAKE_NOTE_PRIVATE_SUCCESS,
	MAKE_NOTE_PRIVATE_FAILURE,
	REPORT_NOTE_REQUEST,
	REPORT_NOTE_FAILURE,
	REPORT_NOTE_SUCCESS,
} from '../actions';
import {
	fetchNoteAPI,
	fetchNoteListAPI,
	uploadNoteAPI,
	fetchNoteLengthAPI,
	editNoteAPI,
	deleteNoteAPI,
	makeNotePublicAPI,
	makeNotePrivateAPI,
	reportNoteAPI,
} from '../API';

// function* name() {
// 	try {
// 		yield call();
// 		yield put({
// 			type: '',
// 			data: '',
// 		});
// 	} catch (err) {
// 		console.error(err);
// yield put({
// 	type:'',
// 	error:''
// })(err);
// 	}
// }
function* fetchNote(action) {
	try {
		const result = yield call(fetchNoteAPI, action.data);
		yield put({
			type: FETCH_NOTE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: FETCH_NOTE_FAILURE,
			error: err.response.data,
		});
	}
}
function* fetchNoteList(action) {
	try {
		const result = yield call(fetchNoteListAPI, action.data);
		yield put({
			type: FETCH_NOTE_LIST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: FETCH_NOTE_LIST_FAILURE,
			error: err.response.data,
		});
	}
}
function* uploadNote(action) {
	try {
		const result = yield call(uploadNoteAPI, action.data);
		yield put({
			type: UPLOAD_NOTE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UPLOAD_NOTE_FAILURE,
			error: err.response.data,
		});
	}
}
function* fetchNoteLength(action) {
	try {
		const result = yield call(fetchNoteLengthAPI, action.data);
		yield put({
			type: FETCH_NOTE_LENGTH_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: FETCH_NOTE_LENGTH_FAILURE,
			error: err.response.data,
		});
	}
}
function* editNote(action) {
	try {
		const result = yield call(editNoteAPI, action.data);
		yield put({
			type: EDIT_NOTE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: EDIT_NOTE_FAILURE,
			error: err.response.data,
		});
	}
}
function* deleteNote(action) {
	try {
		console.log('delete', action.data);
		const result = yield call(deleteNoteAPI, action.data);
		const result2 = yield call(fetchNoteLengthAPI, action.data);
		const result3 = yield call(fetchNoteListAPI, action.data);
		yield put({
			type: DELETE_NOTE_SUCCESS,
			data: result.data,
		});
		yield put({
			type: FETCH_NOTE_LENGTH_SUCCESS,
			data: result2.data,
		});
		yield put({
			type: FETCH_NOTE_LIST_SUCCESS,
			data: result3.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: DELETE_NOTE_FAILURE,
			error: err.response.data,
		});
	}
}
function* makeNotePublic(action) {
	try {
		const result = yield call(makeNotePublicAPI, action.data);
		yield put({
			type: MAKE_NOTE_PUBLIC_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: MAKE_NOTE_PUBLIC_FAILURE,
			error: err.response.data,
		});
	}
}
function* makeNotePrivate(action) {
	try {
		const result = yield call(makeNotePrivateAPI, action.data);
		yield put({
			type: MAKE_NOTE_PRIVATE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: MAKE_NOTE_PRIVATE_FAILURE,
			error: err.response.data,
		});
	}
}
function* reportNote(action) {
	try {
		const result = yield call(reportNoteAPI, action.data);
		yield put({
			type: REPORT_NOTE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: REPORT_NOTE_FAILURE,
			error: err.response.data,
		});
	}
}
function* watchFetchNote() {
	yield takeLatest(FETCH_NOTE_REQUEST, fetchNote);
}
function* watchFetchNoteList() {
	yield takeLatest(FETCH_NOTE_LIST_REQUEST, fetchNoteList);
}
function* watchUploadNote() {
	yield takeLatest(UPLOAD_NOTE_REQUEST, uploadNote);
}
function* watchFecthNoteLength() {
	yield takeLatest(FETCH_NOTE_LENGTH_REQUEST, fetchNoteLength);
}
// 노트 수정
function* watchEditNote() {
	yield takeLatest(EDIT_NOTE_REQUEST, editNote);
}
// 노트 삭제
function* watchDeleteNote() {
	yield takeLatest(DELETE_NOTE_REQUEST, deleteNote);
}
// 노트 public 전환
function* watchMakeNotePublic() {
	yield takeLatest(MAKE_NOTE_PUBLIC_REQUEST, makeNotePublic);
}
// 노트 private 전환
function* watchMakeNotePrivate() {
	yield takeLatest(MAKE_NOTE_PRIVATE_REQUEST, makeNotePrivate);
}
// 노트 신고하기
function* watchReportNote() {
	yield takeLatest(REPORT_NOTE_REQUEST, reportNote);
}
export default function* postSaga() {
	yield all([
		fork(watchFetchNote),
		fork(watchFetchNoteList),
		fork(watchUploadNote),
		fork(watchFecthNoteLength),
		fork(watchEditNote),
		fork(watchDeleteNote),
		fork(watchMakeNotePublic),
		fork(watchMakeNotePrivate),
		fork(watchReportNote),
	]);
}
