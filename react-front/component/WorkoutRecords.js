import React, { useState, useCallback } from 'react';
import { Timeline, Row, Col } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
moment.locale('ko');

const WorkoutRecordsWrapper = styled.div``;
const WorkoutRecordsTitle = styled.div`
	margin-bottom: 30px;
	font-size: 14px;
`;
const ChartWrapper = styled.div`
	margin-bottom: 30px;
`;
const WorkoutRecords = () => {
	const { mainNotes } = useSelector(state => state.note);
	const selectColor = useCallback(value => {
		if (value === '강') {
			return 'blue';
		} else if (value === '중') {
			return 'green';
		} else {
			return 'red';
		}
	}, []);

	// begin: 차트를 위한 데이터
	const partLabels = [];
	mainNotes.map(note => {
		note.MuscleAreas.map(area => {
			if (partLabels.indexOf(area.name) === -1) {
				partLabels.push(area.name);
			}
		});
	});

	const defaultColor = [
		'#9b59b6',
		'#3498db',
		'#2ecc71',
		'#e67e22',
		'#f1c40f',
		'#e74c3c',
		'#55E6C1',
		'#B33771',
	];
	const partData = new Array(partLabels.length).fill(0);
	partLabels.forEach((label, idx) => {
		mainNotes.map(note => {
			note.MuscleAreas.map(area => {
				if (area.name === label) {
					partData[idx] += 1;
				}
			});
		});
	});

	const partColor = new Array(partLabels.length).fill(0);
	for (let i = 0; i < partColor.length; i++) {
		partColor[i] = defaultColor[i];
	}
	const partChartData = {
		labels: partLabels,
		datasets: [
			{
				data: partData,
				backgroundColor: partColor,
				hoverBackgroundColor: partColor,
			},
		],
	};
	const levelLabels = ['강', '중', '약'];
	const levelColor = ['#686de0', '#badc58', '#eb4d4b'];

	const levelData = new Array(levelLabels.length).fill(0);
	levelLabels.forEach((label, idx) => {
		mainNotes.map(note => {
			if (note.level === label) {
				levelData[idx] += 1;
			}
		});
	});
	const levelChartData = {
		labels: levelLabels,
		datasets: [
			{
				data: levelData,
				backgroundColor: levelColor,
				hoverBackgroundColor: levelColor,
			},
		],
	};
	// end: 차트를 위한 데이터
	return (
		<WorkoutRecordsWrapper>
			<WorkoutRecordsTitle>최근 10번 돌아보기</WorkoutRecordsTitle>
			<Row
				gutter={[
					{ xs: 4, sm: 8, md: 12, lg: 16 },
					{ xs: 4, sm: 8, md: 12, lg: 16 },
				]}
			>
				{mainNotes.length === 0 ? (
					<>
						<Col span="12">
							<Timeline pending="몸 만드는중...">
								<Timeline.Item color="blue">
									<span>{moment().format('MM/D')}&nbsp;&nbsp;</span>
									<span>일지를 기록하면 타임라인과 그래프가 생성됩니다.</span>
								</Timeline.Item>
							</Timeline>
						</Col>
						<Col span="12">
							<ChartWrapper>
								<Doughnut
									data={{
										labels: ['운동부위'],
										datasets: [
											{
												data: ['100'],
												backgroundColor: ['#686de0'],
												hoverBackgroundColor: ['#686de0'],
											},
										],
									}}
								></Doughnut>
							</ChartWrapper>
							<ChartWrapper>
								<Doughnut
									data={{
										labels: ['운동강도'],
										datasets: [
											{
												data: ['100'],
												backgroundColor: ['#686de0'],
												hoverBackgroundColor: ['#686de0'],
											},
										],
									}}
								></Doughnut>
							</ChartWrapper>
						</Col>
					</>
				) : (
					<>
						<Col span="12">
							<Timeline pending="몸 만드는중..." reverse>
								{mainNotes.map((note, idx) => {
									const noteLen = note.MuscleAreas.length;
									return (
										<Timeline.Item
											key={note.id}
											color={selectColor(note.level)}
										>
											<span>
												{moment(note.createdAt).format('MM/D')}&nbsp;&nbsp;
											</span>
											{note.MuscleAreas.map((area, i) =>
												i + 1 !== noteLen ? `${area.name}, ` : `${area.name}`,
											)}
										</Timeline.Item>
									);
								})}
							</Timeline>
						</Col>
						<Col span="12">
							<ChartWrapper>
								<Doughnut data={partChartData}></Doughnut>
							</ChartWrapper>
							<ChartWrapper>
								<Doughnut data={levelChartData}></Doughnut>
							</ChartWrapper>
						</Col>
					</>
				)}
			</Row>
		</WorkoutRecordsWrapper>
	);
};
export default WorkoutRecords;
