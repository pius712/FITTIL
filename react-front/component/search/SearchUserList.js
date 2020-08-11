import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import SearchFollowButton from './SearchFollowButton';
import Link from 'next/link';
const SearchUserList = () => {
	const { searchUser, me } = useSelector(state => state.user);
	return (
		<List
			// loading={initLoading}
			dataSource={searchUser}
			renderItem={user => (
				<List.Item
					actions={
						me.id === user.id
							? null
							: [
									<SearchFollowButton
										key="list-follow"
										id={user.id}
										targetname={user.nickname}
									></SearchFollowButton>,
							  ]
					}
				>
					<List.Item.Meta
						avatar={
							<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
						}
						title={
							<Link href="/[username]" as={`/${user.nickname}`}>
								<a>{user.nickname}</a>
							</Link>
						}
						description={user.note}
					/>
				</List.Item>
			)}
		></List>
	);
};

export default SearchUserList;
