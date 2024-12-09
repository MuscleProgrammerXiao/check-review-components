/* 图像预览组件 */
import React, { useImperativeHandle, useState, useRef } from 'react';
import { Modal, Col, Row } from 'antd';
import ImagePagination from '../ImagePagination';
import './index.less';
const PreviewImage = React.forwardRef((prop, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageSrc, setRenderImageSrc] = useState('');
	const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
	const ImagePaginationRef = useRef(null);
	const containerRef = useRef(null);
	const initRenderImage = (url) => {
		setRenderImageSrc(url);
	};
	const initPreviewImageModalData = (val) => {
		setIsModalOpen(true);
		setTimeout(() => {
			ImagePaginationRef.current.initPaginationData(val);
			console.log('containerRef', containerRef.current);
			const { offsetWidth, offsetHeight } = containerRef.current;
			const img = new window.Image();
			img.src = val.pageInfo.url; // 替换成你的图片路径

			const imageRatio = img.width / img.height;
			const containerRatio = (offsetWidth - 50) / (offsetHeight - 50);
			let width, height;
			if (imageRatio > containerRatio) {
				width = offsetWidth - 50;
				height = width / imageRatio;
			} else {
				height = offsetHeight - 50;
				width = height * imageRatio;
			}
			setImgSize({ width, height });
			initRenderImage(val.pageInfo.url);
		}, 500);
	};
	/* 计算图片尺寸 */
	useImperativeHandle(ref, () => ({
		initPreviewImageModalData,
	}));
	return (
		<Modal
			centered
			footer={null}
			open={isModalOpen}
			onCancel={() => setIsModalOpen(false)}
			width="100vw"
			bodyStyle={{ height: 'calc(100vh - 20px)', padding: '0px', backgroundColor: '#888' }}
		>
			<Row gutter={16} className="preview-image">
				<Col className="gutter-row" span={3}>
					<div className="pagination-image ceil-item">
						<ImagePagination ref={ImagePaginationRef} initRenderImage={initRenderImage} />
					</div>
				</Col>
				<Col className="gutter-row" span={21}>
					<div className="preview ceil-item" ref={containerRef}>
						<img src={imageSrc} alt="" height={imgSize.height} width={imgSize.width} />
					</div>
				</Col>
			</Row>
		</Modal>
	);
});
export default PreviewImage;
