/* 图像预览组件 */
import React, { useImperativeHandle, useState, useRef } from 'react';
import { Modal, Col, Row } from 'antd';
import ImagePagination from '../ImagePagination';
import './index.less';
const PreviewImage = React.forwardRef((prop, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [renderImage, setRenderImage] = useState('');
	const ImagePaginationRef = useRef(null);

	const initRenderImage = (url) => {
		// const { currentPaginationViewData, currentPaginationPageInfo } = useStore();
		// ImagePaginationRef.current.initPaginationData({ viewData: currentPaginationViewData, pageInfo: currentPaginationPageInfo });
		console.log('url', url);
		setRenderImage(url);
	};

	const initPreviewImageModalData = (val) => {
		setIsModalOpen(true);
		setTimeout(() => {
			ImagePaginationRef.current.initPaginationData(val);
			initRenderImage(val.pageInfo.url);
		}, 500);
	};

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
					<div className="preview ceil-item">
						<img src={renderImage} alt="" />
					</div>
				</Col>
				{/* <Col className="gutter-row" span={6}>
					<div className="ocrResult ceil-item">识别内容</div>
				</Col> */}
			</Row>
		</Modal>
	);
});
export default PreviewImage;
