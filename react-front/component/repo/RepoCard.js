import React from 'react';
import CardSetting from '../CardSetting';
import { Card } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
const RepoCard = ({ note }) => {
	return (
		<>
			<Card size="small" extra={<CardSetting note={note} />}>
				<Card.Meta
					avatar={<FileDoneOutlined />}
					title={note.title}
					description={note.content}
				/>
			</Card>
		</>
	);
};

export default RepoCard;
