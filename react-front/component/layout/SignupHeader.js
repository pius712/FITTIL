import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
const Header = styled.header`
	padding: 8px 0;
	background-color: #3498db;
	height: 56px;
`;
const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 20px;
`;
const GridRow = styled(Row)`
	height: 100%;
	align-items: center;
`;
const Logo = styled.a`
	color: #2c3e50;
	font-size: 20px;
	padding: 10px;
`;
const FlexMenu = styled.div`
	margin-left: auto;
`;
const AppHeader = () => {
	const onLogin = useCallback(() => {
		Router.push('/login');
	});
	const onSignin = useCallback(() => {
		Router.push('/');
	});
	return (
		<Header>
			<GridRow>
				<Col
					xs={{ span: 24, offset: 0 }}
					sm={{ span: 20, offset: 2 }}
					md={{ span: 16, offset: 4 }}
					xl={{ span: 16, offset: 4 }}
				>
					<HeaderContainer>
						<Link href="main">
							<Logo>FITTIL</Logo>
						</Link>
						<FlexMenu>
							<Button type="text" onClick={onLogin}>
								로그인
							</Button>
							<Button type="text" onClick={onSignin}>
								회원가입
							</Button>
						</FlexMenu>
					</HeaderContainer>
				</Col>
			</GridRow>
		</Header>
	);
};

export default AppHeader;
