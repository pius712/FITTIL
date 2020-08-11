import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import DetailEditForm from './DetailEditForm';
import UserDetails from './UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_PROFILE_REQUEST, FETCH_USER_INFO_REQUEST } from '../../actions';
import FollowButton from './FollowButton';

const ProfileWrapper = styled.div`
	/* margin-top: 30px; */
	padding: 0px 25px;
`;
const AvatarWrapper = styled.div`
	width: 100%;
	padding-top: 100%; /* 1:1 Aspect Ratio */
	position: relative;
	/* height: 0;
	width: 20%;
	padding-bottom: 20%; */
`;
const CustomAvatar = styled(Avatar)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
`;

const UserProfile = styled.div``;
const UserName = styled.div`
	padding: 20px 0 10px 0;
	color: #7f8c8d;
	font-size: 17px;
`;
const UserNote = styled.div``;
const EditButton = styled(Button)`
	margin: 10px 0;
	border-radius: 5px;
`;
const EditButtonWrapper = styled.div`
	display: flex;
`;
const EditSaveButton = styled(Button)`
	border-radius: 5px;
	background-color: #3498db;
	color: white;
`;
const EditCancelButton = styled(Button)`
	border-radius: 5px;
`;

// const EditForm = styled.form``;
// const UserDetail = styled.div``;
const Profile = ({ targetname }) => {
	const dispatch = useDispatch();
	const { targetUserInfo, me } = useSelector(state => state.user);

	const isMyProfile = targetname === me.nickname;
	const note = isMyProfile ? me.note : targetUserInfo.note;
	// targetUserInfo && targetUserInfo.note;
	const job = isMyProfile ? me.job : targetUserInfo.job;
	// targetUserInfo && targetUserInfo.job;
	const location = isMyProfile ? me.location : targetUserInfo.location;
	// targetUserInfo && targetUserInfo.location;
	const facebook = isMyProfile ? me.facebook : targetUserInfo.facebook;
	// targetUserInfo && targetUserInfo.facebook;
	const instagram = isMyProfile ? me.instagram : targetUserInfo.instagram;
	// targetUserInfo && targetUserInfo.instagram;
	const [isEditOpened, setIsEditOpend] = useState(false);
	const [userNote, onChangeUserNote] = useInput(note || '');
	const [jobInfo, onChangeJobInfo] = useInput(job || '');
	const [locationInfo, onChangeLocationInfo] = useInput(location || '');
	const [facebookInfo, onChangeFacebookInfo] = useInput(facebook || '');
	const [instagramInfo, onChangeInstagramInfo] = useInput(instagram || '');
	// console.log('information', userNote, jobInfo, locationInfo);
	const onEditProfile = useCallback(e => {
		e.preventDefault();
		// console.log('clicked');

		setIsEditOpend(!isEditOpened);
	}, []);
	const onSave = useCallback(
		e => {
			e.preventDefault();
			// console.log(userNote, jobInfo, locationInfo, facebookInfo, instagramInfo);

			dispatch({
				type: EDIT_PROFILE_REQUEST,
				data: {
					userNote,
					jobInfo,
					locationInfo,
					facebookInfo,
					instagramInfo,
				},
			});
			setIsEditOpend(false);
		},
		[
			userNote,
			jobInfo,
			locationInfo,
			facebookInfo,
			instagramInfo,
			setIsEditOpend,
		],
	);
	const onCancel = useCallback(e => {
		e.preventDefault();
		setIsEditOpend(false);
	}, []);
	// if (!targetUserInfo || !me) {
	// 	return '정보로딩중';
	// }
	return (
		<ProfileWrapper>
			<UserProfile>
				<AvatarWrapper>
					<CustomAvatar></CustomAvatar>
				</AvatarWrapper>

				<UserName>{targetname}</UserName>
			</UserProfile>
			{userNote ? <UserNote>{userNote}</UserNote> : null}

			{
				isEditOpened ? (
					<>
						<DetailEditForm
							userNote={userNote}
							onChangeUserNote={onChangeUserNote}
							jobInfo={jobInfo}
							onChangeJobInfo={onChangeJobInfo}
							locationInfo={locationInfo}
							onChangeLocationInfo={onChangeLocationInfo}
							facebookInfo={facebookInfo}
							onChangeFacebookInfo={onChangeFacebookInfo}
							instagramInfo={instagramInfo}
							onChangeInstagramInfo={onChangeInstagramInfo}
						></DetailEditForm>
						<EditButtonWrapper>
							<EditSaveButton size="small" block onClick={onSave}>
								Save
							</EditSaveButton>
							<EditCancelButton size="small" block onClick={onCancel}>
								Cancel
							</EditCancelButton>
						</EditButtonWrapper>
					</>
				) : (
					<>
						{targetUserInfo.id === me.id ? (
							<EditButton size="small" block onClick={onEditProfile}>
								Edit Profile
							</EditButton>
						) : (
							<FollowButton targetname={targetname}>follow</FollowButton>
						)}
					</>
				)
				// (
				// 	<>
				// 		<EditButton size="small" block onClick={onEditProfile}>
				// 			Edit Profile
				// 		</EditButton>
				// 		<UserDetails></UserDetails>
				// 	</>
				// )
			}
			<UserDetails targetname={targetname}></UserDetails>
			<Divider style={{ margin: '20px 0', borderTop: '1px solid #636e72' }} />
		</ProfileWrapper>
	);
};

export default Profile;
