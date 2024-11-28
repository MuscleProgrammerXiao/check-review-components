/* 缩放进度条 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Slider } from 'antd';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
export default function DecimalStep() {
	const [inputValue, setInputValue] = useState(1);
	const onChange = (value) => {
		if (isNaN(value)) {
			return;
		}
		setInputValue(value);
	};
	const handleChangeInputValue = (val) => {
		if (val === 'increase') {
			setInputValue(inputValue + 0.25 > 2 ? 2 : inputValue + 0.25);
		} else {
			setInputValue(inputValue - 0.25 < 0.5 ? 0.5 : inputValue - 0.25);
		}
	};
	useEffect(() => {
		console.log('inputValue', inputValue);
	}, [inputValue]);
	return (
		<Row align="middle">
			<Button onClick={() => handleChangeInputValue('subtract')} type="link" icon={<ZoomOutOutlined />} />
			<Col span={6} flex="1" style={{ marginRight: '10px' }}>
				<Slider style={{ width: '100%' }} min={0.5} max={2} onChange={onChange} value={typeof inputValue === 'number' ? inputValue : 0} step={0.01} />
			</Col>
			<Button onClick={() => handleChangeInputValue('increase')} type="link" icon={<ZoomInOutlined />} />
			<span>{`${Math.floor(inputValue * 100)}%`}</span>
		</Row>
	);
}
