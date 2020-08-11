import React, { useCallback } from 'react';
import { Menu } from 'antd';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
const SearchNavigation = () => {
	const router = useRouter();
	const { name } = router.query;
	const { selectedNavigation } = useSelector(state => state.note);
	const handleClick = useCallback(({ key }) => {
		if (key === 'people') {
			Router.push(`/search/people/${name}`);
		} else if (key === 'posts') {
			Router.push(`/search/posts/${name}`);
		} else if (key === 'questions') {
			Router.push(`/search/questions/${name}`);
		} else if (key === 'photos') {
			Router.push(`/search/photos/${name}`);
		}
	}, []);
	// console.log(router.query);
	return (
		<Menu
			onClick={handleClick}
			style={{ width: '100%' }}
			defaultSelectedKeys={['1']}
			selectedKeys={[selectedNavigation]}
			defaultOpenKeys={['sub1']}
			mode="inline"
			fontSize="12px"
		>
			<Menu.Item
				key="people"
				// onClick={onFetchPeople}
			>
				사람
			</Menu.Item>
			<Menu.Item
				key="posts"
				// onClick={onFetchPosts}
			>
				게시글
			</Menu.Item>
			<Menu.Item
				key="questions"
				// onClick={onFetchQuestions}
			>
				질문
			</Menu.Item>
			<Menu.Item
				key="photos"
				// onClick={onFetchPhots}
			>
				사진
			</Menu.Item>
		</Menu>
	);
};

export default SearchNavigation;
