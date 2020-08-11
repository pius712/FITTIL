import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Row,
	Col,
	Menu,
	Dropdown,
	Input,
	Drawer,
	Divider,
	Badge,
} from 'antd';
import {
	NotificationOutlined,
	DownOutlined,
	PlusOutlined,
	SketchOutlined,
	DropboxOutlined,
	MenuOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { SEARCH_USER_REQUEST } from '../../actions';
import Router from 'next/router';
import Link from 'next/link';
import AvatarMenu from './AvatarMenu';
import PlusMenu from './PlusMenu';

const { Search } = Input;
const LogoutButton = styled.button`
	background-color: Transparent;
	display: block;
	color: #fff;
	width: 100%;
	text-align: left;
	font-size: 16px;
`;
const Header = styled.header`
	background-color: #3498db;
	height: 45px;
	margin-bottom: 35px;
`;
const LinkWrapper = styled.div`
	color: #fff;
	padding: 10px 0 10px 10px;
	border-bottom: 1px solid #fff;
	font-size: 16px;
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
	width: 170px;
	border-radius: 5px;
	height: 25px;
	margin-left: 5px;
`;
const GridRow = styled(Row)`
	height: 100%;
	align-items: center;
`;
const Logo = styled.a`
	color: #2c3e50;
	font-size: 20px;
	padding: 10px 10px 10px 10px;
`;
const FlexMenu = styled.div`
	margin-left: auto;
`;
const HeaderItem = styled.div`
	display: inline-block;
	margin-right: 16px;
	height: 100%;
`;

const AppHeader = ({ targetname }) => {
	const dispatch = useDispatch();
	const [drawerVisible, setDrawerVisible] = useState(false);
	const { me } = useSelector(state => state.user);
	const handleDrawer = useCallback(() => {
		setDrawerVisible(prev => !prev);
	}, []);
	const onCloseDrawer = useCallback(() => {
		setDrawerVisible(false);
	});
	const handleSearch = useCallback(value => {
		Router.push(`/search/people/${value}`);
	});
	const onLogout = useCallback(() => {});
	return (
		<Header>
			<GridRow>
				{/* 모바일 좌 */}
				<Col
					xs={{ span: 1, offset: 1 }}
					sm={{ span: 1, offset: 1 }}
					md={{ span: 0, offset: 0 }}
					xl={{ span: 0, offset: 0 }}
				>
					<Button
						style={{ zIndex: '100' }}
						type="text"
						onClick={handleDrawer}
						icon={<MenuOutlined />}
					></Button>
					<Drawer
						title={<DropboxOutlined style={{ fontSize: '25px' }} />}
						placement="top"
						closable={true}
						onClose={onCloseDrawer}
						visible={drawerVisible}
						key="top"
						// maskStyle={{ backgroundColor: '#3498db' }}
						headerStyle={{ textAlign: 'center', backgroundColor: '#3498db' }}
						// drawerStyle={{ backgroundColor: '#3498db' }}
						bodyStyle={{ backgroundColor: '#3498db', padding: '0' }}
					>
						<Link href="/[targetname]" as={`/${targetname}`}>
							<a>
								<LinkWrapper>Overview</LinkWrapper>
							</a>
						</Link>
						<Link
							href="/[targetname]/repository"
							as={`/${targetname}/repository`}
						>
							<a>
								<LinkWrapper>Repository</LinkWrapper>
							</a>
						</Link>
						<Link
							href="/[targetname]/statistics"
							as={`/${targetname}/statistics`}
						>
							<a>
								<LinkWrapper>Statistics</LinkWrapper>
							</a>
						</Link>
						<div>
							<LinkWrapper style={{ borderBottom: 'none' }}>
								<LogoutButton onClick={onLogout}>
									<LogoutOutlined />
									&nbsp;Logout
								</LogoutButton>
							</LinkWrapper>
						</div>
					</Drawer>
				</Col>
				{/* 모바일 중앙 및 웹 좌측 로고부분*/}
				<Col
					xs={{ span: 20, offset: 0 }}
					sm={{ span: 20, offset: 0 }}
					md={{ span: 1, offset: 1 }}
					xl={{ span: 1, offset: 1 }}
				>
					<HeaderItems style={{ justifyContent: 'center' }}>
						{/* <HeaderItem style={{ alignContent: 'center' }}> */}
						<Link href="/[targetname]" as={`/${me.nickname}`}>
							<Logo>
								<DropboxOutlined style={{ fontSize: '25px' }} />
							</Logo>
						</Link>
						{/* </HeaderItem> */}
					</HeaderItems>
				</Col>
				{/* 모바일 우측 */}
				<Col
					xs={{ span: 1, offset: 0 }}
					sm={{ span: 1, offset: 0 }}
					md={{ span: 0, offset: 0 }}
					xl={{ span: 0, offset: 0 }}
				>
					<div style={{ zIndex: '100' }}>
						<Badge dot>
							<NotificationOutlined />
						</Badge>
					</div>
				</Col>
				<Col
					xs={{ span: 0, offset: 0 }}
					sm={{ span: 0, offset: 0 }}
					md={{ span: 19, offset: 0 }}
					xl={{ span: 19, offset: 0 }}
				>
					{/* 웹 중앙 */}
					<HeaderItems>
						<HeaderItem>
							<SearchBar
								placeholder="유저검색"
								onSearch={value => handleSearch(value)}
							/>
						</HeaderItem>
						<HeaderItem>
							<Link href="/[targetname]" as={`/${targetname}`}>
								<a>전체</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="/[targetname]" as={`/${targetname}`}>
								<a>운동일지</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="/[targetname]" as={`/${targetname}`}>
								<a>운동질문</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="/[targetname]" as={`/${targetname}`}>
								<a>운동팁</a>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<Link href="/[targetname]" as={`/${targetname}`}>
								<a>베스트 게시글</a>
							</Link>
						</HeaderItem>
					</HeaderItems>
				</Col>
				{/* 웹 우측 */}
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
							<Dropdown
								overlay={<PlusMenu targetname={targetname} />}
								placement="bottomRight"
							>
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
							<Dropdown
								overlay={<AvatarMenu targetname={targetname} />}
								placement="bottomRight"
							>
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
