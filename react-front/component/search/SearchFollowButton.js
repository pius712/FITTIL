import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { SEARCH_FOLLOW_REQUEST, SEARCH_UNFOLLOW_REQUEST } from '../../actions';

const SearchFollowButton = ({ id, targetname }) => {
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);
	const isFollowing = me.Followings.find(following => following.id === id);
	const onFollow = useCallback(() => {
		if (isFollowing) {
			dispatch({
				type: SEARCH_UNFOLLOW_REQUEST,
				data: {
					nickname: targetname,
				},
			});
		} else {
			dispatch({
				type: SEARCH_FOLLOW_REQUEST,
				data: {
					nickname: targetname,
				},
			});
		}
	}, [isFollowing, targetname]);
	return (
		<Button onClick={onFollow}>{isFollowing ? '팔로우 끊기' : '팔로우'}</Button>
	);
};

export default SearchFollowButton;
