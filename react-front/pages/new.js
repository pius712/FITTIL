import React, { useCallback, useEffect } from 'react';
import { Row, Col, Layout, Result, Button } from 'antd';
import AppHeader from '../component/layout/AppHeader';
import styled from 'styled-components';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../actions';
import { END } from 'redux-saga';
import CreateNoteForm from '../component/CreateNoteForm';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
const Subhead = styled.div`
	border-bottom: 1px solid gray;
	padding-bottom: 15px;
	margin-bottom: 20px;
`;
const SubheadHeading = styled.h1``;
const SubheadDescription = styled.div``;

const New = () => {
	const { uploadNoteDone } = useSelector(state => state.note);
	const { me } = useSelector(state => state.user);

	const handleGoHome = useCallback(() => {
		Router.replace(`/${me.nickname}`);
	});
	useEffect(() => {
		if (!(me && me.id)) {
			Router.replace('/');
		}
	}, [me]);
	return (
		<>
			{uploadNoteDone ? (
				<>
					<AppHeader targetname={me.nickname}></AppHeader>
					<Result
						title="업로드가 완료되었습니다."
						extra={
							<Button onClick={handleGoHome} type="primary" key="console">
								Go Overview
							</Button>
						}
					/>
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
			) : (
				<>
					<AppHeader targetname={me.nickname}></AppHeader>
					<main>
						<Row>
							<Col
								xs={{ span: 24, offset: 0 }}
								sm={{ span: 24, offset: 0 }}
								md={{ span: 12, offset: 6 }}
								xl={{ span: 12, offset: 6 }}
							>
								<Subhead>
									<SubheadHeading>Create a new Note</SubheadHeading>
									<SubheadDescription>
										노트에는 그날의 운동, 식단 등의 기록을 할 수 있습니다.
									</SubheadDescription>
								</Subhead>
								<CreateNoteForm></CreateNoteForm>
							</Col>
						</Row>
					</main>
					<Layout.Footer
						style={{
							// position: 'fixed',
							// bottom: 0,
							// width: '100%',
							textAlign: 'center',
						}}
					>
						FITTIL @2020 Created By Pius
					</Layout.Footer>
				</>
			)}
		</>
	);
};

export default New;
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
