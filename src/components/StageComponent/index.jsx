import React from 'react';
import { Stage, Layer, Rect, Image } from 'react-konva';

const StageComponent = ({ containerDimensions, size, image }) => {
	const annotations = [
		{ x: 50, y: 50, width: 100, height: 80, color: 'red' },
		{ x: 200, y: 150, width: 120, height: 100, color: 'green' },
		{ x: 400, y: 300, width: 150, height: 120, color: 'blue' },
	];
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
