import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { Button, Row, Col, Modal } from 'antd';
import { REGISTER_USER_REQUEST } from '../../actions';

const LoginFormWrapper = styled.div`
	background-color: #fff;
	border-radius: 5px;
	padding: 15px;
`;
const InputWrapper = styled.div`
	margin-bottom: 15px;
`;
const InputLabel = styled.label`
	display: block;
`;
const Input = styled.input`
	width: 100%;
	height: 36px;
	padding: 10px;
	border-radius: 5px;
`;
const SignupButton = styled(Button)`
	background-color: #34495e;
	color: white;
	margin-bottom: 15px;
`;
const ControlNote = styled.p`
	font-size: 12px;
`;
const SignupForm = () => {
	const dispatch = useDispatch();
	const [nickname, onChangeNickname] = useInput('');
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');
	const { registerLoading } = useSelector(state => state.user);
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			if (!nickname || !email || !password) {
				return Modal.warning({
					title: '항목을 입력해주세요',
					content: '모든 항목을 입력해주세요',
				});
			}
			dispatch({
				type: REGISTER_USER_REQUEST,
				data: {
					nickname,
					email,
					password,
				},
			});
		},
		[nickname, email, password],
	);

	return (
		<LoginFormWrapper>
			<form onSubmit={handleSubmit}>
				<InputWrapper>
					<InputLabel>Username</InputLabel>
					<Input
						name="nickname"
						onChange={onChangeNickname}
						value={nickname}
					></Input>
				</InputWrapper>
				<InputWrapper>
					<InputLabel>Email</InputLabel>
					<Input
						type="email"
						name="email"
						onChange={onChangeEmail}
						value={email}
					></Input>
				</InputWrapper>
				<InputWrapper>
					<InputLabel>password</InputLabel>
					<Input
						type="password"
						name="password"
						onChange={onChangePassword}
						value={password}
					></Input>
				</InputWrapper>
				<ControlNote>
					Make sure it's at least 15 characters OR at least 8 characters
					including a number and a lowercase letter. Learn more.
				</ControlNote>
				<SignupButton
					size="large"
					shape="round"
					block
					htmlType="submit"
					loading={registerLoading}
				>
					Signup For FITTIL
				</SignupButton>
				<ControlNote>
					By clicking “Sign up for GitHub”, you agree to our Terms of Service
					and Privacy Statement. We’ll occasionally send you account related
					emails.
				</ControlNote>
			</form>
		</LoginFormWrapper>
	);
};
export default SignupForm;
