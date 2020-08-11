import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import RepoCard from './RepoCard';

const MainPostsWrapper = styled.div`
	margin-bottom: 30px;
`;
const MainPostsTitle = styled.div`
	margin-bottom: 5px;
	font-size: 14px;
`;
const RepoContents = ({ page }) => {
	const { mainNotes } = useSelector(state => state.note);

	return (
		<MainPostsWrapper>
			<MainPostsTitle>노트북</MainPostsTitle>
			<Row
				gutter={[
					{ xs: 4, sm: 8, md: 12, lg: 16 },
					{ xs: 4, sm: 8, md: 12, lg: 16 },
				]}
			>
				{mainNotes.map((note, index) => (
					<Col span="12" key={note.id}>
						<RepoCard key={note.id} note={note} page={page}></RepoCard>
					</Col>
				))}
			</Row>
		</MainPostsWrapper>
	);
};

export default RepoContents;
