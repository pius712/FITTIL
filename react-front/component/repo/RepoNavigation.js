import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Tooltip } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
const NavWrapper = styled.div`
	display: flex;
`;
const CreateButton = styled(Button)`
	color: #fff;
	background-color: #3498db;
	margin-left: auto;
	border-radius: 8px;
`;
const RepoNavigation = () => {
	const [shownAsCard, setShownAsCard] = useState(true);
	const handleButton = useCallback(() => {
		console.log('button clicked');
		Router.push('/new');
	}, []);
	const handleShownWay = useCallback(() => {
		setShownAsCard(prev => !prev);
	}, []);
	return (
		<NavWrapper>
			{shownAsCard ? (
				<Tooltip title="리스트 보기">
					<Button
						type="text"
						size="large"
						onClick={handleShownWay}
						icon={<UnorderedListOutlined />}
					/>
				</Tooltip>
			) : (
				<Tooltip title="카드 보기">
					<Button
						type="text"
						size="large"
						onClick={handleShownWay}
						icon={<AppstoreOutlined />}
					/>
				</Tooltip>
			)}
			<CreateButton onClick={handleButton}>일지 쓰기</CreateButton>
		</NavWrapper>
	);
};

export default RepoNavigation;
