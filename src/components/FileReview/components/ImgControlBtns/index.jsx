import React from 'react';
import { ZoomInOutlined, ZoomOutOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import './index.less';

const iconPrve = {
	height: '16px',
	fontSize: '20px',
	fontWeight: 500,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};
export default function ImgControlBtns(props) {
	const controlBtn = (aim, icons, msg) => {
		return (
			<Tooltip placement="top" title={msg} arrowPointAtCenter>
				<Button onClick={() => props.handleChangeInputValue(aim)} type="link" icon={icons} />
			</Tooltip>
		);
	};
	return (
		<div className="img-control">
			{controlBtn('increase', <ZoomInOutlined />, '放大图像')}
			{controlBtn('subtract', <ZoomOutOutlined />, '缩小图像')}
			{controlBtn('reset', <SyncOutlined />, '原始大小')}
			{controlBtn('preview', <span style={iconPrve} className="iconfont icon-tupianyulan" />, '图片详情')}
		</div>
	);
}
