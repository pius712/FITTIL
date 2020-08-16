import React, { useState, useCallback } from 'react';
import CardSetting from '../CardSetting';
import { Card, Badge, Modal } from 'antd';
import {
	FileDoneOutlined,
	TeamOutlined,
	LockOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import styled from 'styled-components';

const ExtraDescription = styled.div`
	display: block;
	position: absolute;
	bottom: 5px;
`;
const RepoCard = ({ note, page, public_availability }) => {
	moment.locale('ko');
	const noteLen = note.MuscleAreas.length;
	const [zoomNoteVisible, setZoomNoteVisible] = useState(false);
	const onZoomNote = useCallback(() => {
		setZoomNoteVisible(true);
	}, []);
	const handleOk = useCallback(() => {
		setZoomNoteVisible(false);
	}, []);
	const handleCancel = useCallback(() => {
		setZoomNoteVisible(false);
	});
	return (
		<>
			<Card
				size="small"
				style={{ minHeight: '200px', maxHeight: '250px' }}
				title={
					<>
						<span>
							{moment(note.createdAt).format('YYYY-MM-D')}
							&nbsp;&nbsp;&nbsp;
						</span>
						<span>
							{public_availability === 'public' ? (
								<TeamOutlined />
							) : (
								<LockOutlined />
							)}
						</span>
					</>
				}
				extra={<CardSetting page={page} note={note} />}
			>
				<Card.Meta
					title={`Title: ${note.title}`}
					description={
						<>
							<p>
								{note.content.length > 70 ? (
									<>
										<span>{note.content.slice(0, 70)}...</span>
										<span onClick={onZoomNote}>&nbsp; 더보기</span>
										<Modal
											title="노트"
											visible={zoomNoteVisible}
											onOk={handleOk}
											onCancel={handleCancel}
											okText="확인"
											cancelText="돌아가기"
										>
											<Card
												title={moment(note.createdAt).format('YYYY-MM-D')}
												// extra={<CardSetting page={page} note={note} />}
											>
												<Card.Meta
													// style={{ position: 'relative' }}
													title={`Title: ${note.title}`}
													description={
														<>
															<p>{note.content}</p>
															<div>
																<span>강도: &nbsp;</span>
																{note.level === '강' && (
																	<Badge color="blue" text="강" />
																)}
																{note.level === '중' && (
																	<Badge color="yellow" text="중" />
																)}
																{note.level === '약' && (
																	<Badge color="red" text="약" />
																)}
																{
																	<p>
																		부위: &nbsp;{' '}
																		{note.MuscleAreas.map(
																			area => `${area.name} `,
																		)}
																	</p>
																}
															</div>
														</>
													}
												></Card.Meta>
											</Card>
										</Modal>
									</>
								) : (
									note.content
								)}
							</p>
							<ExtraDescription>
								<span>강도: &nbsp;</span>
								{note.level === '강' && <Badge color="blue" text="강" />}
								{note.level === '중' && <Badge color="yellow" text="중" />}
								{note.level === '약' && <Badge color="red" text="약" />}
								{
									<p>
										부위: &nbsp;
										{note.MuscleAreas.map((area, i) =>
											i + 1 !== noteLen ? `${area.name}, ` : `${area.name}`,
										)}
									</p>
								}
							</ExtraDescription>
						</>
					}
				/>
			</Card>
		</>
	);
};

export default RepoCard;
