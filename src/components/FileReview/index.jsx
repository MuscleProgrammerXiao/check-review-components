import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import StageComponent from '../StageComponent'; // 引入子组件
import useImage from 'use-image';
import inovice1 from '../../assets/invoice1.jpg';

export default function FileReview() {
	const containerRef = useRef(null);
	const [image] = useImage(inovice1); // 加载图片
	const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 }); // 父容器的尺寸
	const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 }); // 图片的尺寸和位置

	// 更新父容器的尺寸
	const updateSize = () => {
		if (containerRef.current) {
			const { offsetWidth, offsetHeight } = containerRef.current;
			setContainerDimensions({ width: offsetWidth, height: offsetHeight });
		}
	};

	useEffect(() => {
		// 组件挂载时初始化尺寸
		updateSize();

		// 窗口尺寸变化时更新父容器尺寸
		window.addEventListener('resize', updateSize);

		// 组件卸载时清理事件监听
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	useEffect(() => {
		// 当图片和容器尺寸都准备好时，计算图片的尺寸
		if (image && containerDimensions.width > 0 && containerDimensions.height > 0) {
			const aspectRatio = image.width / image.height; // 计算图片的宽高比
			let width, height;

			if (image.width > image.height) {
				// 如果图片宽度大于高度，宽度设为父容器的宽度
				width = containerDimensions.width;
				height = containerDimensions.width / aspectRatio; // 根据宽高比计算高度
			} else {
				// 如果图片高度大于宽度，宽度设为父容器宽度的 75%
				width = containerDimensions.width * 0.75;
				height = width / aspectRatio; // 根据宽高比计算高度
			}

			// 计算居中的 X 和 Y 坐标
			const x = (containerDimensions.width - width) / 2;
			const y = (containerDimensions.height - height) / 2;

			// 更新图片的尺寸和位置
			setSize({ width, height, x, y });
		}
	}, [image, containerDimensions]);

	return (
		<main ref={containerRef} className="wrap">
			<StageComponent containerDimensions={containerDimensions} size={size} image={image} />
		</main>
	);
}
