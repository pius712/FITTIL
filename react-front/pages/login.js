import React, { useCallback, useEffect } from 'react';
import AppHeader from '../component/layout/AppHeader';
import { Row, Col, Button } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER_REQUEST } from '../actions';
import Router from 'next/router';
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
const Login = () => {
	const dispatch = useDispatch();
	const [id, onChangeId] = useInput('');
	const [password, onChangePassword] = useInput('');
	const { loginDone, me } = useSelector(state => state.user);
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
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
		if (loginDone && me) {
			Router.push('/main');
		}
	});
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
								>
									Signin
								</SigninButton>
							</form>
						</LoginFormWrapper>
						<CreateAccount>
							New to FITTIL?
							<Link href="">
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
