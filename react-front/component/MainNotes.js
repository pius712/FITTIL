import React, { useCallback } from 'react';
import NoteCard from './NoteCard';
import { useSelector } from 'react-redux';
import { Row, Col, Empty, Button } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Router from 'next/router';
const MainPostsWrapper = styled.div`
	margin-bottom: 30px;
`;
const MainPostsTitle = styled.div`
	margin-bottom: 5px;
	font-size: 14px;
`;
const MainPosts = ({ targetname }) => {
	const { me } = useSelector(state => state.user);
	const { mainNotes } = useSelector(state => state.note);
	const onCreateNote = useCallback(() => {
		Router.push('/new');
	}, []);
	return (
		<MainPostsWrapper>
			<MainPostsTitle>운동 요약</MainPostsTitle>
			<Row
				gutter={[
					{ xs: 4, sm: 8, md: 12, lg: 16 },
					{ xs: 4, sm: 8, md: 12, lg: 16 },
				]}
			>
				{mainNotes.length === 0 ? (
					me.nickname === targetname ? (
						<Col span="24">
							<Empty
								image={
									<EditOutlined
										style={{ width: '100%', height: '100%', fontSize: '30px' }}
									/>
								}
								imageStyle={{
									height: 60,
								}}
								description={<span>운동일지가 아직 없으시네요?</span>}
							>
								<Button type="primary" onClick={onCreateNote}>
									일지쓰기
								</Button>
							</Empty>
						</Col>
					) : (
						<Col span="24">
							<Empty
								image={
									<CloseCircleOutlined
										style={{ width: '100%', height: '100%', fontSize: '30px' }}
									/>
								}
								imageStyle={{
									height: 60,
								}}
								description={<span>운동일지가 아직 없습니다.</span>}
							></Empty>
						</Col>
					)
				) : (
					mainNotes.map((note, index) =>
						index < 6 ? (
							<Col span="12" key={note.id}>
								<NoteCard
									key={note.id}
									note={note}
									public_availability={note.public_availability}
								></NoteCard>
							</Col>
						) : null,
					)
				)}
				{/* 
				{mainNotes.length === 0 ? (
					
				) : } */}
			</Row>
		</MainPostsWrapper>
	);
};

export default MainPosts;
