import React, { useState, useCallback } from 'react';
import { Menu } from 'antd';
import {
	AppstoreAddOutlined,
	SaveOutlined,
	LineChartOutlined,
} from '@ant-design/icons';
// const { SubMenu } = Menu;
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const AppMenu = ({ targetname }) => {
	// const dispatch = useDispatch();
	const { selectedMenu } = useSelector(state => state.note);
	// const handleClick = useCallback(e => {
	// e.preventDefault();
	// console.log(seleectedMenu);
	// dispatch({
	// 	type: SELECT_MENU_REQUEST,
	// 	data: e.key,
	// });
	// }, []);
	return (
		<Menu
			/*onClick={handleClick}*/ selectedKeys={[selectedMenu]}
			mode="horizontal"
			style={{ marginBottom: '20px' }}
			// inlineIndent="30"
		>
			<Menu.Item
				className={selectedMenu === 'overview' ? null : 'color-custom'}
				key="overview"
				icon={<AppstoreAddOutlined />}
			>
				<Link href="/[targetname]" as={`/${targetname}`}>
					<a>Overview</a>
				</Link>
			</Menu.Item>
			<Menu.Item
				className={selectedMenu === 'repo' ? null : 'color-custom'}
				key="repo"
				icon={<SaveOutlined />}
			>
				<Link href="/[targetname]/repository" as={`/${targetname}/repository`}>
					<a>Repositories</a>
				</Link>
			</Menu.Item>
			<Menu.Item
				className={selectedMenu === 'statistics' ? null : 'color-custom'}
				key="statistics"
				icon={<LineChartOutlined />}
			>
				<Link href="/[targetname]/statistics" as={`/${targetname}/statistics`}>
					<a>Statistics</a>
				</Link>
			</Menu.Item>
			{/* <Menu.Item key="alipay">
				<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
					Navigation Four - Link
				</a>
			</Menu.Item> */}
		</Menu>
	);
};

export default AppMenu;
