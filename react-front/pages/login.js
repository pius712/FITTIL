import React, { useCallback, useEffect } from 'react';
import AppHeader from '../component/layout/SignupHeader';
import { Row, Col, Button, Modal } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER_REQUEST, LOAD_MY_INFO_REQUEST } from '../actions';
import Router from 'next/router';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const LoginWrapper = styled.main`
	margin: 50px 0px;
`;
const LoginTitle = styled.h1`
	font-size: 24px;
	font-weight: 300;
	text-align: center;
`;
const LoginFormWrapper = styled.div`
	background-color: #fff;
	border: 1px solid #bdc3c7;
	border-radius: 5px;
	padding: 15px;
`;
const InputWrapper = styled.div`
	margin-bottom: 15px;
	position: relative;
`;
const InputLabel = styled.label`
	display: block;
`;
const Input = styled.input`
	width: 100%;
	height: 25px;
	padding: 12px 5px;
	border-radius: 5px;
`;
const SigninButton = styled(Button)`
	background-color: #34495e;
	color: white;
	margin-bottom: 15px;
`;
const CreateAccount = styled.p`
	border: 1px solid #bdc3c7;
	border-radius: 5px;
	text-align: center;
	padding: 10px 15px;
	margin-top: 16px;
`;
const PasswordReset = styled.p`
	position: absolute;
	right: 0;
	top: 0;
`;
const WarningMessage = styled.p`
	text-align: center;
	color: red;
	font-size: 12px;
`;
const Login = () => {
	const dispatch = useDispatch();
	const [id, onChangeId] = useInput('');
	const [password, onChangePassword] = useInput('');
	const { loginDone, loginLoading, loginError, me } = useSelector(
		state => state.user,
	);
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			if (!id || !password) {
				return Modal.warning({
					title: '항목을 입력해주세요',
					content: '모든 항목을 입력해주세요',
				});
			}
			dispatch({
				type: LOGIN_USER_REQUEST,
				data: {
					id,
					password,
				},
			});
		},
		[id, password],
	);
	useEffect(() => {
		if (me) {
			Router.replace(`/${me.nickname}`);
		}
	});
	useEffect(() => {
		if (loginError) {
			alert(loginError);
		}
	}, [loginError]);
	return (
		<>
			<AppHeader></AppHeader>
			<LoginWrapper>
				<Row>
					<Col
						xs={{ span: 20, offset: 2 }}
						sm={{ span: 10, offset: 7 }}
						md={{ span: 8, offset: 8 }}
						xl={{ span: 6, offset: 9 }}
					>
						<LoginTitle>Sign in to FITTIL</LoginTitle>
						<LoginFormWrapper>
							<form onSubmit={handleSubmit}>
								<InputWrapper>
									<InputLabel>Username</InputLabel>
									<Input name={id} onChange={onChangeId} value={id}></Input>
								</InputWrapper>
								<InputWrapper>
									<InputLabel>password</InputLabel>
									<Input
										type="password"
										name={password}
										onChange={onChangePassword}
										value={password}
									></Input>
									<PasswordReset>
										<Link href="">
											<a>forgot password?</a>
										</Link>
									</PasswordReset>
								</InputWrapper>
								<SigninButton
									size="large"
									shape="round"
									block
									htmlType="submit"
									loading={loginLoading}
								>
									Signin
								</SigninButton>
								{loginError ? (
									<WarningMessage>{loginError}</WarningMessage>
								) : null}
							</form>
						</LoginFormWrapper>
						<CreateAccount>
							New to FITTIL?
							<Link href="/">
								<a> Create an account</a>
							</Link>
						</CreateAccount>
					</Col>
				</Row>
			</LoginWrapper>
		</>
	);
};
export default Login;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = req.headers.cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
