import React, { useCallback } from 'react';
import { Result, Button } from 'antd';
import Router from 'next/router';
import { useSelector } from 'react-redux';
const StatisticsContent = ({ targetname }) => {
	const { me } = useSelector(state => state.user);
	const handleClick = useCallback(() => {
		Router.replace(`/${targetname}`);
	}, []);
	return (
		<Result
			status="warning"
			title="현재 서비스 준비중입니다."
			extra={
				<Button onClick={handleClick} type="primary" key="console">
					Go Overview
				</Button>
			}
		/>
	);
};

export default StatisticsContent;
