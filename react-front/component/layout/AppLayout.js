import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Layout } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import Profile from '../profile/Profile';
const AppLayout = ({ content, right, targetname }) => {
	return (
		<>
			<AppHeader></AppHeader>
			<main>
				<Row>
					{/* 좌측 */}
					<Col
						xs={{ span: 0, offset: 0 }}
						sm={{ span: 0, offset: 0 }}
						md={{ span: 6, offset: 0 }}
						xl={{ span: 5, offset: 2 }}
					>
						<Profile></Profile>
					</Col>
					{/* 중간 */}
					<Col
						xs={{ span: 0, offset: 0 }}
						sm={{ span: 0, offset: 0 }}
						md={{ span: 14, offset: 0 }}
						xl={{ span: 13, offset: 0 }}
					>
						<AppMenu targetname={targetname}></AppMenu>
						{content}
					</Col>
					{/* 우측 */}
					<Col>{right}</Col>
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

export default AppLayout;
