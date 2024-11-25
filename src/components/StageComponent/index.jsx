import React from 'react';
import { Stage, Layer, Rect, Image } from 'react-konva';

const StageComponent = ({ containerDimensions, size, image }) => {
	const annotations = [
		{ x: 65, y: 380, width: 80, height: 85, color: 'red' },
		{ x: 170, y: 382, width: 170, height: 40, color: 'red' },
		{ x: 360, y: 360, width: 288, height: 110, color: 'red' },
	];
	const handleDragMove = (e) => {
		const { x, y } = e.target.position();
		console.log('x,y', x, y);
	};
	return (
		<Stage width={containerDimensions.width} height={containerDimensions.height}>
			<Layer>
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
	);
};

export default StageComponent;
