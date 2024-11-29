/* 缩放进度条 */
import React, { useState, useImperativeHandle } from 'react';
import { Row, Col, Button, Slider } from 'antd';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
const DecimalStep = React.forwardRef((props, ref) => {
	const [inputValue, setInputValue] = useState(1);
	const onChange = (value) => {
		if (isNaN(value)) {
			return;
		}
		setInputValue(value);
		props.handleZoomChange({ sign: '', val: value });
	};
	const handleChangeInputValue = (val) => {
		if (val === 'increase') {
			const newValue = inputValue + 0.25 > 2 ? 2 : inputValue + 0.25;
			setInputValue(newValue);
			props.handleZoomChange({ sign: 'in', val: newValue }); //放大
		} else {
			const newValue = inputValue - 0.25 < 0.5 ? 0.5 : inputValue - 0.25;
			setInputValue(newValue);
			props.handleZoomChange({ sign: 'sub', val: newValue }); //缩小
		}
	};
	useImperativeHandle(ref, () => ({
		onChange,
	}));
	return (
		<Row align="middle">
			<Button onClick={() => handleChangeInputValue('subtract')} type="link" icon={<ZoomOutOutlined />} />
			<Col span={12} flex="1" style={{ marginRight: '10px' }}>
				<Slider style={{ width: '100%' }} min={0.5} max={2} onChange={onChange} value={typeof inputValue === 'number' ? inputValue : 0} step={0.01} />
			</Col>
			<Button onClick={() => handleChangeInputValue('increase')} type="link" icon={<ZoomInOutlined />} />
			<span>{`${Math.floor(inputValue * 100)}%`}</span>
		</Row>
	);
});
export default DecimalStep;
