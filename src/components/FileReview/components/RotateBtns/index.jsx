/* 旋转按钮 */
import React from 'react';
import { Button, Space } from 'antd';
export default function RotateBtns() {
	return (
		<div style={{ display: 'flex' }}>
			<Space>
				<Button type="primary">还原</Button>
				<Button type="primary">左旋转</Button>
				<Button type="primary">右旋转</Button>
			</Space>
		</div>
	);
}
