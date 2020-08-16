import React, { useCallback, useEffect } from 'react';
import useInput from '../../hooks/useInput';
import Router, { useRouter } from 'next/router';
import SignupHeader from '../../component/layout/SignupHeader';
import LoadingSpinner from '../../component/layout/LoadingSpinner';
import styled from 'styled-components';
import { Row, Col, Layout, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import {
	LOAD_MY_INFO_REQUEST,
	AUTH_USER_REQUEST,
	FETCH_PENDING_USER_REQUEST,
	AUTH_AGAIN_REQUEST,
} from '../../actions';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';

// 이메일 인증하는 페이지
const JoinWrapper = styled.main`
	margin: 50px 0px;
`;
const VerificationWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	background-color: #fff;
	border: 1px solid #bdc3c7;
	border-radius: 5px;
	padding: 20px 15px 15px 15px;
`;
const MailIconWrapper = styled.div`
	text-align: center;
	font-size: 30px;
	margin-bottom: 10px;
`;
const TitleWrapper = styled.div`
	margin-bottom: 30px;
`;
// const VeficationMemo = styled.div`
// 	font-size: 14px;
// 	margin-bottom: 16px;
// `;
const VerificationTitle = styled.div`
	font-size: 16px;
	font-weight: 300;
	text-align: center;
	margin-bottom: 5px;
`;
const SendAgain = styled.div`
	font-size: 14px;
`;
const ContentsWrapper = styled.div`
	padding: 5px;
`;
const InputWrapper = styled.div`
	margin-bottom: 15px;
	position: relative;
`;
const InputLabel = styled.label`
	display: none;
`;
const Input = styled.input`
	width: 100%;
	height: 25px;
	padding: 12px 5px;
	border-radius: 5px;
`;

const Join = () => {
	const dispatch = useDispatch();
	const [authCode, onChangeAuthCode] = useInput('');
	const { me, pendingUser, authUserDone, authUserError } = useSelector(
		state => state.user,
	);
	const router = useRouter();
	const { username } = router.query;

	const onSendMail = useCallback(() => {
		dispatch({
			type: AUTH_AGAIN_REQUEST,
			data: {
				nickname: username,
			},
		});
	}, [dispatch, username]);
	const onSubmitAuthCode = useCallback(
		e => {
			e.preventDefault();
			dispatch({
				type: AUTH_USER_REQUEST,
				data: {
					nickname: pendingUser.nickname,
					code: authCode,
				},
			});
		},
		[authCode, pendingUser],
	);
	useEffect(() => {
		if (me && me.id) {
			console.log('me && me.id');
			Router.replace('/login');
		}
	}, [me]);
	useEffect(() => {
		if (!pendingUser) {
			Router.replace('/');
		}
	}, [pendingUser]);
	useEffect(() => {
		if (authUserDone) {
			console.log('authUserDone');
			message.success('인증이 완료되었습니다.');
			Router.push('/login');
		}
	}, [authUserDone]);
	useEffect(() => {
		if (authUserError) {
			message.error(authUserError);
		}
	}, [authUserError]);
	if (!pendingUser) {
		return <LoadingSpinner></LoadingSpinner>;
	}

	return (
		<>
			<SignupHeader></SignupHeader>
			<JoinWrapper>
				<Row>
					<Col
						xs={{ span: 20, offset: 2 }}
						sm={{ span: 10, offset: 7 }}
						md={{ span: 8, offset: 8 }}
						xl={{ span: 6, offset: 9 }}
					>
						<VerificationWrapper>
							<TitleWrapper>
								<MailIconWrapper>
									<MailOutlined />
								</MailIconWrapper>

								<VerificationTitle>인증 코드 입력</VerificationTitle>
								<SendAgain>
									주소로 전송된 코드를 입력하세요. 메일 전송은 최대 5분까지 걸릴
									수 있습니다.
								</SendAgain>
								<Button block type="text" onClick={onSendMail}>
									코드 재전송
								</Button>
							</TitleWrapper>
							<ContentsWrapper>
								<form onSubmit={onSubmitAuthCode}>
									<InputWrapper>
										<InputLabel>인증코드</InputLabel>
										<Input
											value={authCode}
											onChange={onChangeAuthCode}
											placeholder="인증 코드"
										></Input>
									</InputWrapper>
									<Button type="primary" htmlType="submit" block>
										다음
									</Button>
								</form>
							</ContentsWrapper>
						</VerificationWrapper>
					</Col>
				</Row>
			</JoinWrapper>
			<Layout.Footer
				style={{
					position: 'absolute',
					bottom: '0px',
					width: '100%',
					textAlign: 'center',
				}}
			>
				FITTIL @2020 Created By Pius
			</Layout.Footer>
		</>
	);
};

export default Join;
export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req, query }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = req.headers.cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch({
			type: FETCH_PENDING_USER_REQUEST,
			data: {
				nickname: query.username,
			},
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
