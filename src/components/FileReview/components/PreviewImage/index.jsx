/* 图像预览组件 */
import React, { useImperativeHandle, useState, useRef } from 'react';
import { Modal, Col, Row } from 'antd';
import ImagePagination from '../ImagePagination';
import './index.less';
const PreviewImage = React.forwardRef((prop, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const ImagePaginationRef = useRef(null);
	useImperativeHandle(ref, () => ({
		initPreviewImageModalData: (val) => {
			setIsModalOpen(true);
			ImagePaginationRef.current.initPaginationData(val);
		},
	}));
	return (
		<Modal
			centered
			footer={null}
			open={isModalOpen}
			onCancel={() => setIsModalOpen(false)}
			width="100vw"
			bodyStyle={{ height: 'calc(100vh - 20px)', padding: '0px' }}
		>
			<Row gutter={16} className="preview-image">
				<Col className="gutter-row" span={3}>
					<div className="pagination-image ceil-item">
						<ImagePagination ref={ImagePaginationRef} />
					</div>
				</Col>
				<Col className="gutter-row" span={15}>
					<div className="preview ceil-item">图像</div>
				</Col>
				<Col className="gutter-row" span={6}>
					<div className="ocrResult ceil-item">识别内容</div>
				</Col>
			</Row>
		</Modal>
	);
});
export default PreviewImage;
