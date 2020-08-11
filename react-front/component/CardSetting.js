import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Modal, Select, Badge, Divider, Input } from 'antd';
import {
	EllipsisOutlined,
	PlusOutlined,
	LockOutlined,
	UnlockOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
	DELETE_NOTE_REQUEST,
	REPORT_NOTE_REQUEST,
	EDIT_NOTE_REQUEST,
	FETCH_NOTE_LIST_REQUEST,
} from '../actions';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
const FormWrapper = styled.div`
	/* border: 1px solid gray; */
	border-radius: 5px;
	padding: 0 5%;
	margin-bottom: 20px;
`;
const InputWrapper = styled.div`
	margin-bottom: 15px;
	width: 100%;
	/* text-align: center; */
`;
const InputLabel = styled.label`
	display: block;
	text-align: left;
	/* margin-bottom: 5px; */
`;
const InputTitle = styled.input`
	border-radius: 5px;
	width: 100%;
	padding: 10px;
`;
const InputDescription = styled.textarea`
	border-radius: 5px;
	width: 100%;
	padding: 10px;
`;
const FormCheckBox = styled.div`
	position: relative;
	margin-top: 10px;
`;

const CardSetting = ({ note, page }) => {
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);
	const { mainNotes, deleteNoteDone } = useSelector(state => state.note);
	const router = useRouter();
	const { username } = router.query;

	// 삭제 모달
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	// 수정 모달
	const [editModalVisible, setEditModalVisible] = useState(false);
	// public 전환 모달
	const [makePublicModalVisible, setMakePublicModalVisible] = useState(false);
	// private 전환 모달
	const [makePrivateModalVisible, setMakePrivateModalVisible] = useState(false);
	// 신고 모달
	const [reportModalVisible, setReportModalVisible] = useState(false);

	// 수정 모달 내부 데이터
	const [title, onChangeTitle] = useInput(note.title); // 타이틀 값
	const [content, onChangeContent] = useInput(note.content); // 내용 값
	// 초기 목록 데이터
	const [partItems, setPartItems] = useState(['가슴', '등', '어깨', '하체']);

	// 선택 ipnut 창에서 새로 만드는 부분 state
	const [partItem, setPartItem] = useState('');
	const onChangePartItem = useCallback(value => {
		setPartItem(value);
	}, []);
	// 선택된 운동 강도
	const [selectedLevel, setSelectedLevel] = useState(note.level);
	const onChangeSelectedLevel = useCallback(value => {
		console.log('onChangeSelectedLevel', value);
		setSelectedLevel(value);
	}, []);
	// 선택된 운동 부위
	// console.log('note.muscleArea', note.MuscleArea);
	const [selectedPartItem, setSelectedPartItem] = useState(
		note.MuscleAreas.map(area => area.name),
	);
	const onChangeSelectedPartItem = useCallback(value => {
		console.log('onChangeSelectedPartItem', value);
		setSelectedPartItem(value);
	}, []);
	// 선택된 공개 여부 옵션
	const [selectedOption, setSelectedOption] = useState(
		note.public_availability,
	);
	const onChangeSelectedOption = useCallback(e => {
		setSelectedOption(e.target.value);
	}, []);

	const addItem = useCallback(() => {
		setPartItems(prev => [...prev, partItem]);
	}, [partItem]);

	// Ellipsis 클릭시 수행되는 콜백
	// 수정
	const onEditNote = useCallback(() => {
		setEditModalVisible(true);
	}, []);
	// 삭제
	const onDeleteNote = useCallback(() => {
		setDeleteModalVisible(true);
	}, []);
	// 신고
	const onReportNote = useCallback(() => {
		setReportModalVisible(true);
	}, []);
	// private
	const onMakePrivate = useCallback(() => {
		setMakePrivateModalVisible(true);
	}, []);
	// public
	const onMakePublic = useCallback(() => {
		setMakePublicModalVisible(true);
	}, []);

	// 모달 창 버튼 콜백
	// 수정
	const handleEditCancel = useCallback(() => {
		setEditModalVisible(false);
	}, []);
	const handleEditOk = useCallback(() => {
		setEditModalVisible(false);
		// console.log(
		// 	title,
		// 	content,
		// 	selectedLevel,
		// 	selectedPartItem,
		// 	selectedOption,
		// );
		dispatch({
			type: EDIT_NOTE_REQUEST,
			data: {
				noteId: note.id,
				title,
				content,
				level: selectedLevel,
				part: selectedPartItem,
				public_availability: selectedOption,
			},
		});
	}, [title, content, selectedLevel, selectedPartItem, selectedOption]);
	// 삭제
	const handleDeleteCancel = useCallback(() => {
		setDeleteModalVisible(false);
	}, []);
	const handleDeleteOk = useCallback(() => {
		setDeleteModalVisible(false);
		dispatch({
			type: DELETE_NOTE_REQUEST,
			data: {
				noteId: note.id,
				userId: me.id,
				targetname: username,
				lastId: page,
			},
		});
	}, []);
	// 신고
	const handleReportCancel = useCallback(() => {
		setReportModalVisible(false);
	}, []);
	const handleReportOk = useCallback(() => {
		setReportModalVisible(false);
		dispatch({
			type: REPORT_NOTE_REQUEST,
			data: {
				noteId: note.id,
			},
		});
	}, []);
	// public
	const handlePublicCancel = useCallback(() => {
		setMakePublicModalVisible(false);
	}, []);
	const handlePublicOk = useCallback(() => {
		setMakePublicModalVisible(false);
	}, []);
	// private
	const handlePrivateCancel = useCallback(() => {
		setMakePrivateModalVisible(false);
	}, []);
	const handlePrivateOk = useCallback(() => {
		setMakePrivateModalVisible(false);
	}, []);

	const myNoteMenu = (
		<Menu>
			<Menu.Item>
				<span onClick={onEditNote}>수정</span>
			</Menu.Item>
			<Menu.Item>
				<span onClick={onDeleteNote}>삭제</span>
			</Menu.Item>
			{note.public_availability === 'public' ? (
				<Menu.Item>
					<span onClick={onMakePrivate}>Private 전환</span>
				</Menu.Item>
			) : (
				<Menu.Item>
					<span onClick={onMakePublic}>Public 전환</span>
				</Menu.Item>
			)}
		</Menu>
	);
	const othersNoteMenu = (
		<Menu>
			<Menu.Item>
				<span onClick={onReportNote}>신고</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			{me && me.id === note.UserId ? (
				<>
					<Dropdown overlay={myNoteMenu}>
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
							<EllipsisOutlined />
						</a>
					</Dropdown>
					{/* 삭제모달 */}
					<Modal
						title="게시물을 삭제하시겠어요?"
						visible={deleteModalVisible}
						onOk={handleDeleteOk}
						onCancel={handleDeleteCancel}
					>
						<p>이 게시물을 삭제하시겠어요?</p>
					</Modal>
					{/* 수정 모달 */}
					<Modal
						title="게시글 수정"
						visible={editModalVisible}
						onOk={handleEditOk}
						// confirmLoading={confirmLoading}
						onCancel={handleEditCancel}
					>
						{/* <p>{ModalText}</p> */}
						<FormWrapper>
							<form>
								<InputWrapper>
									<InputLabel>Title</InputLabel>
									<InputTitle
										value={title}
										onChange={onChangeTitle}
										// placeholder="간단한 제목을 적어주세요"
									></InputTitle>
								</InputWrapper>
								<InputWrapper>
									<InputLabel>Content</InputLabel>
									<InputDescription
										value={content}
										onChange={onChangeContent}
										rows="10"
										// placeholder="오늘 어떤 운동하셨나요?"
									></InputDescription>
								</InputWrapper>
								{/* 운동 강도 선택 */}
								<InputWrapper>
									<Select
										showSearch
										style={{ width: '100%' }}
										placeholder="운동 강도"
										optionFilterProp="children"
										// onChange={onChange}
										// onFocus={onFocus}
										// onBlur={onBlur}
										// onSearch={onSearch}
										value={selectedLevel}
										onChange={onChangeSelectedLevel}
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										<Select.Option value="강">
											<Badge color="blue" text="강" />
										</Select.Option>
										<Select.Option value="중">
											<Badge color="yellow" text="중" />
										</Select.Option>
										<Select.Option value="약">
											<Badge color="red" text="약" />
										</Select.Option>
									</Select>
								</InputWrapper>
								{/* 운동 부위 선택 */}
								<InputWrapper>
									<Select
										style={{ width: '100%' }}
										placeholder="운동부위를 입력해주세요"
										mode="multiple"
										value={selectedPartItem}
										onChange={onChangeSelectedPartItem}
										dropdownRender={menu => (
											<div>
												{menu}
												<Divider style={{ margin: '4px 0' }} />
												<div
													style={{
														display: 'flex',
														flexWrap: 'nowrap',
														padding: 8,
													}}
												>
													<Input
														style={{ flex: 'auto' }}
														value={partItem}
														onChange={onChangePartItem}
													/>
													<a
														style={{
															flex: 'none',
															padding: '8px',
															display: 'block',
															cursor: 'pointer',
														}}
														onClick={addItem}
													>
														<PlusOutlined /> 부위 추가
													</a>
												</div>
											</div>
										)}
									>
										{partItems.map(partItem => (
											<Select.Option key={partItem}>{partItem}</Select.Option>
										))}
									</Select>
								</InputWrapper>
								<Divider />
								<FormCheckBox>
									<InputLabel htmlFor="public">
										<input
											type="radio"
											name="public"
											checked={selectedOption === 'public'}
											value="public"
											onChange={onChangeSelectedOption}
										/>
										&emsp;&emsp; Public
									</InputLabel>
									<UnlockOutlined
										style={{
											fontSize: '25px',
											position: 'absolute',
											top: 0,
											left: '15px',
										}}
									/>
									<span style={{ fontSize: '14px' }}>
										&emsp;&emsp;&emsp;&nbsp;&nbsp;누구든 회원님의 일지를 볼 수
										있습니다.
									</span>
								</FormCheckBox>
								<FormCheckBox>
									<InputLabel htmlFor="private">
										<input
											type="radio"
											name="privacy"
											value="private"
											checked={selectedOption === 'private'}
											onChange={onChangeSelectedOption}
										/>
										&emsp;&emsp; Private
									</InputLabel>
									<LockOutlined
										style={{
											fontSize: '25px',
											position: 'absolute',
											top: 0,
											left: '15px',
										}}
									/>
									<span style={{ fontSize: '14px' }}>
										&emsp;&emsp;&emsp;&nbsp;&nbsp;회원님의 일지를 비공개합니다.
									</span>
								</FormCheckBox>
							</form>
						</FormWrapper>
					</Modal>
					<Modal
						title="게시물 공개여부"
						visible={makePublicModalVisible}
						onOk={handlePublicOk}
						onCancel={handlePublicCancel}
					>
						<p>이 게시물을 전체공개하시겠어요?</p>
					</Modal>
					<Modal
						title="게시물 공개여부"
						visible={makePrivateModalVisible}
						onOk={handlePrivateOk}
						onCancel={handlePrivateCancel}
					>
						<p>이 게시물을 비공개하시겠어요?</p>
					</Modal>
				</>
			) : (
				<>
					<Dropdown overlay={othersNoteMenu}>
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
							<EllipsisOutlined />
						</a>
					</Dropdown>
					<Modal
						title="게시물을 신고하시겠어요?"
						visible={reportModalVisible}
						onOk={handleReportOk}
						onCancel={handleReportCancel}
					>
						<p>이 게시물을 신고하시겠어요?</p>
					</Modal>
				</>
			)}
		</>
	);
};

export default CardSetting;
