import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Stage, Layer, Rect, Image } from 'react-konva';
import useImage from 'use-image';
import inovice1 from '../../assets/invoice1.jpg';
import './index.less';

export default function FileReview() {
	const containerRef = useRef(null);
	const [image] = useImage(inovice1); // 加载图片
	const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 }); // 父容器的尺寸
	const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 }); // 图片的尺寸和位置
	const [annotations, setAnnotations] = useState([
		// 管理注释框的位置
		{ x: 65, y: 380, width: 80, height: 85, color: 'red' },
		{ x: 170, y: 382, width: 170, height: 40, color: 'red' },
		{ x: 360, y: 360, width: 288, height: 110, color: 'red' },
	]);
	const handleDragMove = (e) => {
		const { x, y } = e.target.position();
		const deltaX = x - size.x; // 计算偏移量
		const deltaY = y - size.y;

		// 更新图片的位置
		setSize((prevSize) => ({
			...prevSize,
			x,
			y,
		}));

		// 更新矩形框的位置
		setAnnotations((prevAnnotations) =>
			prevAnnotations.map((annotation) => ({
				...annotation,
				x: annotation.x + deltaX,
				y: annotation.y + deltaY,
			}))
		);
	};
	// 更新父容器的尺寸
	const updateSize = useCallback(() => {
		if (containerRef.current) {
			const { offsetWidth, offsetHeight } = containerRef.current;
			if (containerDimensions.width !== offsetWidth || containerDimensions.height !== offsetHeight) {
				setContainerDimensions({ width: offsetWidth, height: offsetHeight });
			}
		}
	}, [containerDimensions.width, containerDimensions.height]);

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
		<main ref={containerRef} className="wrap">
			<Stage width={containerDimensions.width} height={containerDimensions.height}>
				<Layer shouldComponentUpdate={shouldUpdateLayer}>
					<Image
						x={size.x} // 图片的 X 坐标
						y={size.y} // 图片的 Y 坐标
						width={size.width} // 图片的宽度
						height={size.height} // 图片的高度
						image={image} // 渲染的图片
						draggable
						onDragMove={handleDragMove} // 监听图片的拖动事件
					/>
					{/* 渲染矩形框 */}
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
		</main>
	);
}
