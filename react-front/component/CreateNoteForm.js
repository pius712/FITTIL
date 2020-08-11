import React, { useState, useCallback } from 'react';
import { Select, Badge, Input, Divider, Button, Layout, Modal } from 'antd';
import { PlusOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UPLOAD_NOTE_REQUEST } from '../actions';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

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
const MakeNoteButton = styled(Button)`
	background-color: #3498db;
	color: white;
	margin-bottom: 15px;
`;

const CreateNoteForm = () => {
	const dispatch = useDispatch();
	const [title, onChangeTitle] = useInput(''); // 타이틀 값
	const [content, onChangeContent] = useInput(''); // 내용 값
	// 초기 값
	const [partItems, setPartItems] = useState([
		'가슴',
		'등',
		'어깨',
		'하체',
		'이두',
		'삼두',
	]);

	// 선택창에서 새로 만드는 부분 state
	const [partItem, setPartItem] = useState('');
	const onChangePartItem = useCallback(value => {
		setPartItem(value);
	}, []);
	// 선택된 운동 강도
	const [selectedLevel, setSelectedLevel] = useState('');
	const onChangeSelectedLevel = useCallback(value => {
		console.log('onChangeSelectedLevel', value);
		setSelectedLevel(value);
	});
	// 선택된 운동 부위
	const [selectedPartItem, setSelectedPartItem] = useState([]);
	const onChangeSelectedPartItem = useCallback(value => {
		console.log('onChangeSelectedPartItem', value);
		setSelectedPartItem(value);
	}, []);
	// 옵션
	const [selectedOption, setSelectedOption] = useState('public');
	const onChangeSelectedOption = useCallback(e => {
		setSelectedOption(e.target.value);
	}, []);

	const addItem = useCallback(() => {
		setPartItems(prev => [...prev, partItem]);
	}, [partItem]);
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			if (
				!title ||
				!content ||
				!selectedLevel ||
				!selectedPartItem ||
				!selectedOption
			) {
				return Modal.warning({
					title: '항목을 입력해주세요',
					content: '모든 항목을 입력해주세요',
				});
			}
			dispatch({
				type: UPLOAD_NOTE_REQUEST,
				data: {
					title,
					content,
					level: selectedLevel,
					part: selectedPartItem,
					public_availability: selectedOption,
				},
			});
		},
		[title, content, selectedLevel, selectedPartItem, selectedOption],
	);
	return (
		<FormWrapper>
			<form onSubmit={handleSubmit}>
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
						onChange={onChangeSelectedLevel}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						<Select.Option value="강">
							<Badge color="blue" text="강" />
						</Select.Option>
						<Select.Option value="중">
							<Badge color="green" text="중" />
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
						onChange={onChangeSelectedPartItem}
						dropdownRender={menu => (
							<div>
								{menu}
								{/* <Divider style={{ margin: '4px 0' }} />
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
									> */}
								{/* <PlusOutlined /> 부위 추가
									</a> */}
								{/* </div> */}
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
						&emsp;&emsp;&emsp;&nbsp;&nbsp;누구든 회원님의 일지를 볼 수 있습니다.
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
				<Divider></Divider>
				<MakeNoteButton htmlType="submit" block>
					일지 작성하기
				</MakeNoteButton>
			</form>
		</FormWrapper>
	);
};
export default CreateNoteForm;
