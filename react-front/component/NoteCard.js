import React from 'react';
import { Card } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
const PostCard = ({ note }) => {
	return (
		<>
			<Card size="small">
				<Card.Meta
					avatar={<FileDoneOutlined />}
					title={note.title}
					description={note.content}
				/>
			</Card>
		</>
	);
};

export default PostCard;
