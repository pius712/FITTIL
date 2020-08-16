import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Layout } from 'antd';
import Router from 'next/router';
import AppHeader from './SignupHeader';
import SignupForm from './SignupForm';

const MainWrapper = styled.div`
	background-image: url(https://github.githubassets.com/images/modules/site/heroes/simple-codelines.svg);
	background-color: #74b9ff;
`;

const MainContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 64px 0;
	flex-wrap: wrap;
`;
const DescriptionWrapper = styled.div`
	padding: 0 24px;
`;
const DescriptionTitle = styled.div`
	line-height: 1;
	font-size: 64px;
	margin-bottom: 16px;
`;
const DescriptionContent = styled.div`
	line-height: 1.5;
	font-size: 20px;
	margin-bottom: 16px;
`;

const SigninLayout = () => {
	const { descriptionTitle, descriptionContent } = useSelector(
		state => state.note,
	);

	return (
		<>
			<AppHeader></AppHeader>
			<main>
				<MainWrapper>
					<Row>
						<MainContainer>
							<Col
								xs={{ span: 24, offset: 0 }}
								sm={{ span: 9, offset: 3 }}
								md={{ span: 9, offset: 3 }}
								xl={{ span: 7, offset: 5 }}
							>
								<DescriptionWrapper>
									<DescriptionTitle>{descriptionTitle}</DescriptionTitle>
									<DescriptionContent>{descriptionContent}</DescriptionContent>
								</DescriptionWrapper>
							</Col>
							<Col
								xs={{ span: 16, offset: 4 }}
								sm={{ span: 9, offset: 0 }}
								md={{ span: 9, offset: 0 }}
								xl={{ span: 6, offset: 1 }}
							>
								<SignupForm></SignupForm>
							</Col>
						</MainContainer>
					</Row>
				</MainWrapper>
			</main>
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

export default SigninLayout;
