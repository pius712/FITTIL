import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { LOGOUT_USER_REQUEST } from '../../actions';
const AvatarMenu = ({ targetname }) => {
	const dispatch = useDispatch();
	const handleLogout = useCallback(() => {
		// Router.push('/');
		dispatch({
			type: LOGOUT_USER_REQUEST,
		});
	});
	return (
		<Menu style={{ borderRadius: '5px' }}>
			<Menu.Item>
				<Link href="/[targetname]" as={`/${targetname}`}>
					<a>Overview</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link href="/[targetname]/repository" as={`/${targetname}/repository`}>
					<a>Repository</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link href="/[targetname]/statistics" as={`/${targetname}/statistics`}>
					<a>Statistics</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<a onClick={handleLogout}>Logout</a>
			</Menu.Item>
		</Menu>
	);
};

export default AvatarMenu;
