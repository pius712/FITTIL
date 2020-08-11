import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Layout } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import Profile from '../profile/Profile';
const SearchLayout = ({ left, menu, content, right, targetname }) => {
	return (
		<>
			<AppHeader targetname={targetname}></AppHeader>
			<main>
				<Row>
					{/* 좌측 */}
					<Col
						xs={{ span: 0, offset: 0 }}
						sm={{ span: 6, offset: 1 }}
						md={{ span: 5, offset: 2 }}
						xl={{ span: 3, offset: 4 }}
					>
						{left}
						{/* <Profile targetname={targetname}></Profile> */}
					</Col>
					{/* 중간 */}
					<Col
						xs={{ span: 24, offset: 0 }}
						sm={{ span: 15, offset: 1 }}
						md={{ span: 14, offset: 1 }}
						xl={{ span: 12, offset: 1 }}
					>
						{menu}
						{/* <AppMenu targetname={targetname}></AppMenu> */}
						{content}
					</Col>
					{/* 우측 */}
					<Col
						xs={{ span: 0, offset: 0 }}
						sm={{ span: 1, offset: 0 }}
						md={{ span: 2, offset: 0 }}
						xl={{ span: 4, offset: 0 }}
					>
						{right}
					</Col>
				</Row>
			</main>
			<Layout.Footer
				style={{
					position: 'absolute',
					bottom: '-100px',
					width: '100%',
					textAlign: 'center',
				}}
			>
				FITTIL @2020 Created By Pius
			</Layout.Footer>
		</>
	);
};

export default SearchLayout;
