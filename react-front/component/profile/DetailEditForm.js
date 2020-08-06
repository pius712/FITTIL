import React from 'react';
import styled from 'styled-components';
import {
	IdcardOutlined,
	CompassOutlined,
	FacebookOutlined,
	InstagramOutlined,
} from '@ant-design/icons';
const EditFormWrapper = styled.div``;
const Form = styled.form``;
const InputWrapper = styled.div`
	margin: 5px 0;
	display: flex;
	align-items: center;
`;
const InputLabel = styled.label`
	display: none;
`;
const InputUserNote = styled.textarea`
	padding: 3px 10px;
	width: 100%;
	border-radius: 5px;
	font-size: 15px;
`;
const Input = styled.input`
	margin-left: 5px;
	padding: 3px 10px;
	min-height: 28px;
	border-radius: 5px;
	/* display: block; */
	width: 100%;
	font-size: 10px;
`;
const DetailEditForm = ({
	userNote,
	onChangeUserNote,
	jobInfo,
	onChangeJobInfo,
	locationInfo,
	onChangeLocationInfo,
	facebookInfo,
	onChangeFacebookInfo,
	instagramInfo,
	onChangeInstagramInfo,
}) => {
	return (
		<EditFormWrapper>
			<Form>
				<InputWrapper>
					<InputLabel>직업</InputLabel>
					<InputUserNote
						rows="3"
						type="textarea"
						placeholder=""
						value={userNote}
						onChange={onChangeUserNote}
					></InputUserNote>
				</InputWrapper>
				<InputWrapper>
					<InputLabel>직업</InputLabel>
					<IdcardOutlined />
					<Input
						value={jobInfo}
						onChange={onChangeJobInfo}
						placeholder="직업"
					></Input>
				</InputWrapper>
				<InputWrapper>
					<InputLabel>지역</InputLabel>
					<CompassOutlined />
					<Input
						value={locationInfo}
						onChange={onChangeLocationInfo}
						placeholder="지역"
					></Input>
				</InputWrapper>
				<InputWrapper>
					<InputLabel>페이스북 주소</InputLabel>
					<FacebookOutlined />
					<Input
						value={facebookInfo}
						onChange={onChangeFacebookInfo}
						placeholder="페이스북 주소"
					></Input>
				</InputWrapper>
				<InputWrapper>
					<InputLabel>인스타그램 주소</InputLabel>
					<InstagramOutlined />
					<Input
						value={instagramInfo}
						onChange={onChangeInstagramInfo}
						placeholder="인스타그램 주소"
					></Input>
				</InputWrapper>
			</Form>
		</EditFormWrapper>
	);
};

export default DetailEditForm;
