import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
const PlusMenu = ({ targetname }) => {
	return (
		<Menu style={{ borderRadius: '5px' }}>
			<Menu.Item>
				<Link href="/new">
					<a>일지 쓰기</a>
				</Link>
			</Menu.Item>
			{/* <Menu.Item>
				
			</Menu.Item>
			<Menu.Item>
				
			</Menu.Item> */}
		</Menu>
	);
};

export default PlusMenu;
