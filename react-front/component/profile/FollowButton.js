import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../actions';

const FollowButton = ({ targetname }) => {
	const dispatch = useDispatch();
	const { me, targetUserInfo } = useSelector(state => state.user);
	const isFollowing = me.Followings.find(
		following => following.id === targetUserInfo.id,
	);
	const onFollow = useCallback(() => {
		console.log('isFollowing', isFollowing);
		if (isFollowing) {
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: {
					nickname: targetname,
				},
			});
		} else {
			dispatch({
				type: FOLLOW_REQUEST,
				data: {
					nickname: targetname,
				},
			});
		}
	}, [isFollowing]);
	return (
		<Button block onClick={onFollow}>
			{isFollowing ? '팔로우 끊기' : '팔로우'}
		</Button>
	);
};

export default FollowButton;
