import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Menu, Dropdown, Input } from 'antd';
import {
	NotificationOutlined,
	DownOutlined,
	PlusOutlined,
	SketchOutlined,
	DropboxOutlined,
} from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';

const { Search } = Input;

const Header = styled.header`
	background-color: #3498db;
	height: 45px;
	margin-bottom: 35px;
`;

const HeaderItems = styled.div`
	display: flex;
	align-items: center;
`;
const HeaderMyItems = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;
const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 20px;
`;
const SearchBar = styled(Search)`
	width: 200px;
	border-radius: 5px;
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
const HeaderItem = styled.div`
	display: inline-block;
	margin-right: 16px;
	height: 100%;
`;

const AppHeader = () => {
	const onLogin = useCallback(() => {
		// Router.push('/login');
	});
	const onSignin = useCallback(() => {
		// Router.push('/');
	});
	const menu = (
		<Menu>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.alipay.com/"
				>
					1st menu item
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.taobao.com/"
				>
					2nd menu item
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.tmall.com/"
				>
					3rd menu item
				</a>
			</Menu.Item>
			<Menu.Item danger>a danger item</Menu.Item>
		</Menu>
	);
	return (
		<Header>
			<GridRow>
				<Col
					xs={{ span: 1, offset: 0 }}
					sm={{ span: 1, offset: 0 }}
					md={{ span: 0, offset: 0 }}
					xl={{ span: 0, offset: 0 }}
				>
					gg
					{/* 모바일 좌측 */}
				</Col>

				<Col
					xs={{ span: 22, offset: 0 }}
					sm={{ span: 22, offset: 0 }}
					md={{ span: 1, offset: 0 }}
					xl={{ span: 1, offset: 0 }}
				>
					<HeaderItems>
						<HeaderItem>
							<Link href="/main">
								<Logo>
									<DropboxOutlined />
								</Logo>
							</Link>
						</HeaderItem>
					</HeaderItems>
				</Col>
				<Col
					xs={{ span: 1, offset: 0 }}
					sm={{ span: 1, offset: 0 }}
					md={{ span: 0, offset: 0 }}
					xl={{ span: 0, offset: 0 }}
				>
					gg
					{/* 모바일 우측 */}
				</Col>
				<Col
					xs={{ span: 0, offset: 0 }}
					sm={{ span: 0, offset: 0 }}
					md={{ span: 20, offset: 0 }}
					xl={{ span: 20, offset: 0 }}
				>
					{/* 웹 중앙 */}
					<HeaderItems>
						<HeaderItem>
							<SearchBar
								placeholder="input search text"
								onSearch={value => console.log(value)}
							/>
						</HeaderItem>
						<HeaderItem>
							<Link href="main">
								<a>전체</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="main">
								<a>운동일지</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="main">
								<a>운동질문</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="main">
								<a>운동팁</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="main">
								<a>베스트 게시글</a>
							</Link>
						</HeaderItem>
					</HeaderItems>
				</Col>
				<Col
					xs={{ span: 0, offset: 0 }}
					sm={{ span: 0, offset: 0 }}
					md={{ span: 3, offset: 0 }}
					xl={{ span: 3, offset: 0 }}
				>
					{/* 웹 우측 */}
					<HeaderMyItems>
						<HeaderItem>
							<NotificationOutlined />
						</HeaderItem>
						<HeaderItem>
							<Dropdown overlay={menu} placement="bottomRight">
								<a
									className="ant-dropdown-link"
									onClick={e => e.preventDefault()}
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<PlusOutlined /> <DownOutlined />
								</a>
							</Dropdown>
						</HeaderItem>
						<HeaderItem>
							<Dropdown overlay={menu} placement="bottomRight">
								<a
									className="ant-dropdown-link"
									onClick={e => e.preventDefault()}
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<SketchOutlined />
									<DownOutlined />
								</a>
							</Dropdown>
						</HeaderItem>
					</HeaderMyItems>
				</Col>
				{/* <HeaderContainer>
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
				</HeaderContainer> */}
			</GridRow>
		</Header>
	);
};

export default AppHeader;
