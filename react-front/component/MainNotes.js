import React from 'react';
import NoteCard from './NoteCard';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const MainPostsWrapper = styled.div`
	margin-bottom: 30px;
`;
const MainPostsTitle = styled.div`
	margin-bottom: 5px;
	font-size: 14px;
`;
const MainPosts = () => {
	const { mainNotes } = useSelector(state => state.note);
	return (
		<MainPostsWrapper>
			<MainPostsTitle>운동 요약</MainPostsTitle>
			<Row
				gutter={[
					{ xs: 4, sm: 8, md: 12, lg: 16 },
					{ xs: 4, sm: 8, md: 12, lg: 16 },
				]}
			>
				{mainNotes.map((note, index) => (
					<Col span="12" key={note.id}>
						<NoteCard key={note.id} note={note}></NoteCard>
					</Col>
				))}
			</Row>
		</MainPostsWrapper>
	);
};

export default MainPosts;
