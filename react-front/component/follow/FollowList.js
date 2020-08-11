import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import SearchFollowButton from '../search/SearchFollowButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
const FollowList = ({ type }) => {
	const { followList, me } = useSelector(state => state.user);
	const router = useRouter();
	// console.log('router.query', router.query);
	return (
		<List
			// loading={initLoading}
			dataSource={followList}
			locale={
				type === 'followers'
					? {
							emptyText: (
								<>
									<FrownOutlined
										style={{ fontSize: '50px', marginBottom: '10px' }}
									/>
									<div>No Followers</div>
								</>
							),
					  }
					: {
							emptyText: (
								<>
									<FrownOutlined
										style={{ fontSize: '50px', marginBottom: '10px' }}
									/>
									<div>No Followings</div>
								</>
							),
					  }
				// ()} }
			}
			renderItem={user => (
				<List.Item
					actions={
						me.id === user.id
							? null
							: [
									<SearchFollowButton
										key="followUser"
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

export default FollowList;
