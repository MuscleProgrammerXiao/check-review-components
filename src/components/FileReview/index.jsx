import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Stage, Layer, Rect, Image } from 'react-konva';
import useImage from 'use-image';
import { Button } from 'antd';
import DecimalStep from './components/DecimalStep';
import RotateBtns from './components/RotateBtns';
import inovice1 from '../../assets/invoice1.jpg';
import './index.less';

const defaultCurrentState = {
	previousScale: 1,
	scale: 1,
	positionX: 0,
	positionY: 0,
};
export default function FileReview() {
	const containerRef = useRef(null);
	const TransformWrapperRef = useRef(null);
	const DecimalStepRef = useRef(null);
	const [image] = useImage(inovice1); // 加载图片
	const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 }); // 父容器的尺寸
	const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 }); // 图片的尺寸和位置
	const [currentState, setCurrentState] = useState(defaultCurrentState);

	const annotations = useMemo(
		() => [
			// 管理注释框的位置
			{ x: 65, y: 380, width: 80, height: 85, color: 'red' },
			{ x: 170, y: 382, width: 170, height: 40, color: 'red' },
			{ x: 360, y: 360, width: 288, height: 110, color: 'red' },
		],
		[]
	);

	// 更新父容器的尺寸
	const updateSize = useCallback(() => {
		if (containerRef.current) {
			const { offsetWidth, offsetHeight } = containerRef.current;
			if (containerDimensions.width !== offsetWidth || containerDimensions.height !== offsetHeight) {
				setContainerDimensions({ width: offsetWidth, height: offsetHeight });
			}
		}
	}, [containerDimensions.width, containerDimensions.height]);

	// 还原图像原始尺寸
	const resetImage = () => {
		if (TransformWrapperRef.current) {
			// @ts-ignore 还原为原始尺寸
			TransformWrapperRef.current.resetTransform();
			DecimalStepRef.current.onChange(1);
			setCurrentState(defaultCurrentState);
		}
	};

	// 滚轮控制缩放变化时的回调函数
	const onWheelChange = (e) => {
		if (DecimalStepRef.current) {
			DecimalStepRef.current.onChange(e.state.scale);
			setCurrentState(e.state);
		}
	};

	const onPanningChange = (e) => {
		if (DecimalStepRef.current) {
			setCurrentState(e.state);
		}
	};

	const handleZoomChange = (val) => {
		if (TransformWrapperRef.current) {
			if (val.sign === 'in') {
				TransformWrapperRef.current.zoomIn(0.25);
			} else if (val.sign === 'sub') {
				TransformWrapperRef.current.zoomOut(0.25);
			} else {
				// setScale(val.val);
				// const positionX = Math.ceil((size.width + currentState.positionX) / 2);
				// const positionY = Math.ceil((size.height + currentState.positionY) / 2);
				// TransformWrapperRef.current.setTransform(0, 0, val.val, 0, 'easeOut');
				// TransformWrapperRef.current.zoomOut(0.25);
				console.log('handleZoomChange', currentState, size.width, size.height);
			}
		}
	};

	useEffect(() => {
		// 组件挂载时初始化尺寸
		updateSize();

		// 窗口尺寸变化时更新父容器尺寸
		window.addEventListener('resize', updateSize);

		// 组件卸载时清理事件监听
		return () => window.removeEventListener('resize', updateSize);
	}, [updateSize]);

	useEffect(() => {
		// 当图片和容器尺寸都准备好时，计算图片的尺寸
		if (image && containerDimensions.width > 0 && containerDimensions.height > 0) {
			const imageRatio = image.width / image.height;
			const containerRatio = containerDimensions.width / containerDimensions.height;
			let width, height;

			if (imageRatio > containerRatio) {
				// 如果图片宽度大于高度，宽度设为父容器的宽度
				width = containerDimensions.width;
				height = width / imageRatio;
			} else {
				height = containerDimensions.height;
				width = height * imageRatio;
			}

			// 计算居中的 X 和 Y 坐标
			const x = (containerDimensions.width - width) / 2;
			const y = (containerDimensions.height - height) / 2;

			// 更新图片的尺寸和位置
			setSize({ width, height, x, y });
		}
	}, [image, containerDimensions]);
	// 图层优化：只有在图片或者注释框变化时才重新渲染
	const shouldUpdateLayer = useCallback(() => {
		return !!image || annotations.length > 0;
	}, [image, annotations]);
	return (
		<div className="wrap">
			<main className="img-review" ref={containerRef}>
				<TransformWrapper
					onWheel={onWheelChange}
					onPanning={onPanningChange}
					ref={TransformWrapperRef}
					panning={{ velocityDisabled: true }}
					limitToBounds={false}
					minScale={0.5}
					maxScale={2}
					initialScale={1}
				>
					<TransformComponent wrapperStyle={{ backgroundColor: 'red' }} contentStyle={{ backgroundColor: 'yellow' }}>
						<Stage
							// width={containerDimensions.width}
							// height={containerDimensions.height}
							width={200}
							height={200}
						>
							<Layer shouldComponentUpdate={shouldUpdateLayer}>
								<Image
									x={size.x} // 图片的 X 坐标
									y={size.y} // 图片的 Y 坐标
									width={size.width} // 图片的宽度
									height={size.height} // 图片的高度
									image={image} // 渲染的图片
								/>
							</Layer>
							<Layer shouldComponentUpdate={shouldUpdateLayer}>
								{annotations.map((annotation, index) => (
									<Rect
										key={index}
										x={annotation.x}
										y={annotation.y}
										width={annotation.width}
										height={annotation.height}
										stroke={annotation.color}
										strokeWidth={3}
										dash={[10, 5]} // 虚线
									/>
								))}
							</Layer>
						</Stage>
					</TransformComponent>
				</TransformWrapper>
			</main>
			<footer className="tools-row">
				<DecimalStep ref={DecimalStepRef} handleZoomChange={handleZoomChange} />
				<RotateBtns resetImage={resetImage} />
				<Button onClick={resetImage}>还原测试</Button>
			</footer>
		</div>
	);
}
