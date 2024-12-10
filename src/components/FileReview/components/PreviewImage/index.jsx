/* 图像预览组件 */
import React, { useImperativeHandle, useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Modal, Col, Row } from 'antd';
import ImagePagination from '../ImagePagination';
import './index.less';
const PreviewImage = React.forwardRef((prop, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageSrc, setRenderImageSrc] = useState('');
	const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
	const ImagePaginationRef = useRef(null);
	const ComponentRef = useRef(null);
	const initPreviewImageModalData = (val) => {
		setIsModalOpen(true);
		setTimeout(() => {
			setRenderImageSrc(val.pageInfo.url);
			ImagePaginationRef.current.initPaginationData(val);
		}, 200);
	};
	const changeCurrentImage = (val) => {
		ImagePaginationRef.current.changeCurrentImage(val);
	};
	/* 计算图片尺寸 */
	useEffect(() => {
		const img = new Image();
		img.src = imageSrc;
		if (!ComponentRef.current) return;
		const { offsetWidth, offsetHeight } = ComponentRef.current;
		const imageRatio = img.width / img.height;
		const containerRatio = offsetWidth / offsetHeight;
		let width, height;
		if (imageRatio > containerRatio) {
			width = (offsetWidth * 9) / 10;
			height = width / imageRatio;
		} else {
			height = (offsetHeight * 9) / 10;
			width = height * imageRatio;
		}
		setImgSize({ width, height });
	}, [imageSrc]);

	useEffect(() => {
		if (!isModalOpen) return;
		const handleKeyDown = (event) => {
			if (event.key === 'ArrowLeft') {
				changeCurrentImage('back');
			} else if (event.key === 'ArrowRight') {
				changeCurrentImage('next');
			}
		};
		// 添加事件监听
		window.addEventListener('keydown', handleKeyDown);
		// 清除事件监听器
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isModalOpen]);
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
			bodyStyle={{ height: 'calc(100vh - 50px)', padding: '0px' }}
		>
			<Row gutter={16} className="preview-image">
				<Col className="gutter-row-l" span={3}>
					<div className="pagination-image ceil-item">
						<ImagePagination
							ref={ImagePaginationRef}
							initRenderImage={(url) => {
								setRenderImageSrc(url);
							}}
						/>
					</div>
				</Col>
				<Col className="gutter-row-r" span={21} ref={ComponentRef}>
					<TransformWrapper panning={{ velocityDisabled: true }} limitToBounds={false} minScale={0.5} maxScale={2} initialScale={1}>
						<TransformComponent wrapperClass="preview ceil-item">
							<img src={imageSrc} alt="" height={imgSize.height} width={imgSize.width} />
						</TransformComponent>
					</TransformWrapper>
					<div onClick={() => changeCurrentImage('back')} className="change-current-btns btns-l">
						<CaretLeftOutlined style={{ fontSize: '24px', color: '#333' }} />
					</div>
					<div onClick={() => changeCurrentImage('next')} className="change-current-btns btns-r">
						<CaretRightOutlined style={{ fontSize: '24px', color: '#333' }} />
					</div>
				</Col>
			</Row>
		</Modal>
	);
});
export default PreviewImage;
