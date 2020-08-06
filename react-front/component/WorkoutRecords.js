import React, { useState, useCallback } from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
moment.locale('ko');

const CalenderWrapper = styled.div`
	position: relative;
`;
const CalenderTitle = styled.span`
	position: absolute;
	top: 10px;
	left: 10px;
	font-size: 14px;
`;
const WorkoutRecords = () => {
	const [today, setToday] = useState(moment());
	// const [selectedValue, setSelectedValue] = useState(
	// 	moment().format('YYYY-MM-DD'),
	// );
	const getListData = useCallback(value => {
		let listData;
		switch (value.date()) {
			case 8:
				listData = [
					{ type: 'warning', content: 'This is warning event.' },
					{ type: 'success', content: 'This is usual event.' },
				];
				break;
			case 10:
				listData = [
					{ type: 'warning', content: 'This is warning event.' },
					{ type: 'success', content: 'This is usual event.' },
					{ type: 'error', content: 'This is error event.' },
				];
				break;
			case 15:
				listData = [
					{ type: 'warning', content: 'This is warning event' },
					{ type: 'success', content: 'This is very long usual event。。....' },
					{ type: 'error', content: 'This is error event 1.' },
					{ type: 'error', content: 'This is error event 2.' },
					{ type: 'error', content: 'This is error event 3.' },
					{ type: 'error', content: 'This is error event 4.' },
				];
				break;
			default:
		}
		return listData || [];
	}, []);

	const dateCellRender = useCallback(value => {
		// console.log(moment(value).format('MMM Do YY'));
		const listData = getListData(value);
		return (
			<ul className="events">
				{listData.map(item => (
					<li key={item.content}>
						<Badge type={item.type} text={item.content} />
					</li>
				))}
			</ul>
		);
	}, []);
	// value == 선택된 날짜
	const getMonthData = useCallback(value => {
		// console.log('getMonthData',value);
		if (value.month() === 8) {
			return 1394;
		}
	}, []);
	// value = 선택된 날짜
	const monthCellRender = useCallback(value => {
		// console.log('monthCellRender', value, typeof value);
		const num = getMonthData(value);
		return num ? (
			<div className="notes-month">
				<section>{num}</section>
				<span>Backlog number</span>
			</div>
		) : null;
	}, []);

	return (
		<CalenderWrapper>
			<CalenderTitle>운동 달력</CalenderTitle>
			<Calendar
				// value={value}
				dateCellRender={dateCellRender}
				monthCellRender={monthCellRender}
			/>
		</CalenderWrapper>
	);
};

export default WorkoutRecords;
