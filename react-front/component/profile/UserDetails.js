import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	IdcardOutlined,
	CompassOutlined,
	FacebookOutlined,
	InstagramOutlined,
	TeamOutlined,
	StarOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
const ProfileItemList = styled.ul`
	margin-top: 10px;
`;
const ProfileItemWrapper = styled.li`
	display: flex;
	align-items: center;
	/* justify-content: space-evenly; */
`;
const ProfileItem = styled.div`
	display: flex;
	/* justify-content: flex-start; */
	align-items: center;
	margin-left: 5px;
	/* padding: 3px */
	min-height: 28px;
	/* display: block; */
	width: 100%;
	font-size: 12px;
`;
const FollowInfoWrapper = styled.li``;
const FollowInfo = styled.span`
	font-size: 12px;
`;
const UserDetails = ({ targetname }) => {
	const dispatch = useDispatch();
	const { targetUserInfo, me } = useSelector(state => state.user);
	const job = targetname === me.nickname ? me.job : targetUserInfo.job;
	const location =
		targetname === me.nickname ? me.location : targetUserInfo.location;
	const facebook =
		targetname === me.nickname ? me.facebook : targetUserInfo.facebook;
	const instagram =
		targetname === me.nickname ? me.instagram : targetUserInfo.instagram;
	//
	return (
		<>
			<ProfileItemList>
				<FollowInfo>
					<TeamOutlined />
					<FollowInfo>
						<Link
							href="/[targetname]/followers"
							as={`/${targetname}/followers`}
						>
							<a>
								{targetname === me.nickname
									? ` ${me.Followers.length} followers · `
									: ` ${targetUserInfo.Followers.length} followers · `}
							</a>
						</Link>
					</FollowInfo>
					<FollowInfo>
						<Link
							href="/[targetname]/followings"
							as={`/${targetname}/followings`}
						>
							<a>
								{targetname === me.nickname
									? `${me.Followings.length} followings `
									: `${targetUserInfo.Followings.length} followings `}
							</a>
						</Link>
					</FollowInfo>
					{/* <StarWrapper> */}
					<StarOutlined />
					<FollowInfo>{` 0`}</FollowInfo>
					{/* </StarWrapper> */}
				</FollowInfo>
				{job ? (
					<ProfileItemWrapper>
						<IdcardOutlined />
						<ProfileItem>{job}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
				{location ? (
					<ProfileItemWrapper>
						<CompassOutlined />
						<ProfileItem>{location}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
				{facebook ? (
					<ProfileItemWrapper>
						<FacebookOutlined />
						<ProfileItem>{facebook}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
				{instagram ? (
					<ProfileItemWrapper>
						<InstagramOutlined />
						<ProfileItem>{instagram}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
			</ProfileItemList>
		</>
	);
};

export default UserDetails;
