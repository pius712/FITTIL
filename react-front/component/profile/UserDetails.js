import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	IdcardOutlined,
	CompassOutlined,
	FacebookOutlined,
	InstagramOutlined,
} from '@ant-design/icons';
const ProfileItemWrapper = styled.li`
	display: flex;
	align-items: center;
`;
const ProfileItem = styled.div`
	display: flex;
	/* justify-content: center; */
	align-items: center;
	margin-left: 5px;
	/* padding: 3px */
	min-height: 28px;
	/* display: block; */
	width: 100%;
	font-size: 12px;
`;
const UserDetails = () => {
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);
	// console.log(me);
	// const note = me.note ? me.note : '';
	const job = me.job ? me.job : '';
	const location = me.location ? me.location : '';
	const facebook = me.facebook ? me.facebook : '';
	const instagram = me.instagram ? me.instagram : '';

	return (
		<>
			<ul>
				{me.job ? (
					<ProfileItemWrapper>
						<IdcardOutlined />
						<ProfileItem>{me.job}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
				{me.location ? (
					<ProfileItemWrapper>
						<CompassOutlined />
						<ProfileItem>{me.location}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
				{me.facebook ? (
					<ProfileItemWrapper>
						<FacebookOutlined />
						<ProfileItem>{me.facebook}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
				{me.instagram ? (
					<ProfileItemWrapper>
						<InstagramOutlined />
						<ProfileItem>{me.instagram}</ProfileItem>
					</ProfileItemWrapper>
				) : null}
			</ul>
		</>
	);
};

export default UserDetails;
