import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { Button, Row, Col, Modal, Alert } from 'antd';
import { REGISTER_USER_REQUEST } from '../../actions';
import {
	validateNickname,
	validatePassword,
	validateEmail,
} from '../../util/validation';
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
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isNicknameValid, setIsNicknameValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const { registerLoading } = useSelector(state => state.user);
	const onChangeNickname = useCallback(
		e => {
			const data = e.target.value;
			setNickname(data);
			if (
				validateNickname(data) === false ||
				data.length < 4 ||
				data.length > 12
			) {
				setIsNicknameValid(false);
			} else {
				setIsNicknameValid(true);
			}
		},
		[setNickname, setIsNicknameValid],
	);
	const onChangePassword = useCallback(
		e => {
			const data = e.target.value;
			setPassword(data);
			if (
				validatePassword(data) === false ||
				data.length < 4 ||
				data.length > 12
			) {
				setIsPasswordValid(false);
			} else {
				setIsPasswordValid(true);
			}
		},
		[setPassword, setIsPasswordValid],
	);
	const onChangeEmail = useCallback(
		e => {
			const data = e.target.value;
			setEmail(data);
			if (validateEmail(data) === false) {
				setIsEmailValid(false);
			} else {
				setIsEmailValid(true);
			}
		},
		[setEmail, setIsEmailValid],
	);
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			if (!nickname || !email || !password) {
				return Modal.warning({
					title: '항목을 입력해주세요',
					content: '모든 항목을 입력해주세요',
				});
			}
			if (
				validateNickname(nickname) === false ||
				nickname.length < 4 ||
				nickname.length > 12
			) {
				return Modal.warning({
					title: '닉네임을 확인해주세요',
					content: '닉네임은 길이 4~12의 영어, 숫자로 구성되어야 합니다.',
				});
			}
			if (
				validatePassword(password) === false ||
				password.length < 4 ||
				password.length > 12
			) {
				return Modal.warning({
					title: '비밀번호를 확인해주세요',
					content:
						'비밀번호는 길이 8~20의 영어 대소문자, 숫자로 구성되어야 합니다.',
				});
			}
			if (validateEmail(email) === false) {
				return Modal.warning({
					title: '이메일을 확인해주세요',
					content: '이메일의 형식이 올바르지 않습니다.',
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
		[nickname, email, password, dispatch],
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
					{isNicknameValid ? null : (
						<Alert
							style={{ fontSize: '10px' }}
							message="길이 4~12의 알파벳, 숫자로 구성되어야 합니다."
							type="error"
						/>
					)}
				</InputWrapper>

				<InputWrapper>
					<InputLabel>Email</InputLabel>
					<Input
						type="email"
						name="email"
						onChange={onChangeEmail}
						value={email}
					></Input>
					{isEmailValid ? null : (
						<Alert
							style={{ fontSize: '10px' }}
							message="email 형식이 올바르지 않습니다."
							type="error"
						/>
					)}
				</InputWrapper>
				<InputWrapper>
					<InputLabel>password</InputLabel>
					<Input
						type="password"
						name="password"
						onChange={onChangePassword}
						value={password}
					></Input>
					{isPasswordValid ? null : (
						<Alert
							style={{ fontSize: '10px' }}
							message="길이 8~20의 영어 알파벳, 숫자로 구성되어야 합니다."
							type="error"
						/>
					)}
				</InputWrapper>

				<ControlNote>
					비밀번호는 길이 8~20의 알파벳 대소문자, 숫자로 구성되어야 합니다.
					자세히 보기.
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
					By clicking “Sign up for FITTIL”, you agree to our Terms of Service
					and Privacy Statement. We’ll occasionally send you account related
					emails.
				</ControlNote>
			</form>
		</LoginFormWrapper>
	);
};
export default SignupForm;
