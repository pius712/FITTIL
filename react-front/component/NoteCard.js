import React from 'react';
import { Card, Badge } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import moment from 'moment';
const PostCard = ({ note }) => {
	moment.locale('ko');
	const noteLen = note.MuscleAreas.length;
	return (
		<>
			<Card
				style={{ minHeight: '150px' }}
				size="small"
				title={moment(note.createdAt).format('YYYY-MM-D')}
			>
				<Card.Meta
					avatar={<FileDoneOutlined />}
					title={`Title: ${note.title}`}
					description={
						<>
							<p>
								{note.content.length > 20 ? (
									<>
										<span>{note.content.slice(0, 20)}...</span>
									</>
								) : (
									note.content
								)}
							</p>
							<div>
								<span>강도: &nbsp;</span>
								{note.level === '강' && <Badge color="blue" text="강" />}
								{note.level === '중' && <Badge color="green" text="중" />}
								{note.level === '약' && <Badge color="red" text="약" />}
								{
									<p>
										부위: &nbsp;{' '}
										{note.MuscleAreas.map((area, i) =>
											i + 1 !== noteLen ? `${area.name}, ` : `${area.name}`,
										)}
									</p>
								}
							</div>
						</>
					}
				/>
			</Card>
		</>
	);
};

export default PostCard;
