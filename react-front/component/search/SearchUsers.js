import React, { useCallback } from 'react';
import SearchUserList from './SearchUserList';
import { useSelector } from 'react-redux';
import { Result, Button } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import Router from 'next/router';
const SearchUsers = () => {
	const { searchUser, me } = useSelector(state => state.user);
	const onGoHome = useCallback(() => {
		Router.push(`/${me.nickname}`);
	}, []);
	return (
		<>
			{searchUser.length === 0 ? (
				<Result
					icon={<FrownOutlined />}
					title="찾는 유저가 없어요 ㅠㅠ"
					extra={
						<Button onClick={onGoHome} type="primary">
							Go Home
						</Button>
					}
				/>
			) : (
				<SearchUserList></SearchUserList>
			)}
		</>
	);
};

export default SearchUsers;
