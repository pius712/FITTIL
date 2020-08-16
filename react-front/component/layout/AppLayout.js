import React from 'react';
import { Button, Row, Col, Layout } from 'antd';
import AppHeader from './AppHeader';
const AppLayout = ({ left, menu, content, right, targetname }) => {
	return (
		<>
			<AppHeader targetname={targetname}></AppHeader>
			<main>
				<Row>
					{/* 좌측 */}
					<Col
						xs={{ span: 0, offset: 0 }}
						sm={{ span: 0, offset: 0 }}
						md={{ span: 6, offset: 0 }}
						xl={{ span: 5, offset: 2 }}
					>
						{left}
					</Col>
					{/* 중간 */}
					<Col
						xs={{ span: 24, offset: 0 }}
						sm={{ span: 24, offset: 0 }}
						md={{ span: 14, offset: 0 }}
						xl={{ span: 13, offset: 0 }}
					>
						{menu}
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
