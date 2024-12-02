import React, { useEffect, useRef } from 'react';
import './App.less';
import { Layout, Row, Col } from 'antd';
import FileReview from './components/FileReview';
import AnalysisResult from './components/AnalysisResult';
import { invoiceImgListRsponse } from './mock/invoiceData';
import { invoiceOcrsRspData } from './mock/invoiceOcrsRspData';
const { Content } = Layout;
function App() {
	const FileReviewRef = useRef(null);
	/* 第一步：获取图像信息，加载图像 */
	const getImgListRsp = () => {
		if (!FileReviewRef.current) return;
		setTimeout(() => {
			// console.log('获取到影像数据', invoiceImgListRsponse);
			FileReviewRef.current.initImageList(invoiceImgListRsponse);
		}, 1000);
	};
	/* 第二步：获取识别结果 */
	const getRecognitionRsp = (params) => {
		if (!FileReviewRef.current) return;
		FileReviewRef.current.controlScanLoading(true);
		setTimeout(() => {
			const resData = invoiceOcrsRspData.filter(item => item.data.docId === params.docId);
			FileReviewRef.current.controlScanLoading(false);
			if (resData.length === 0) return;
			FileReviewRef.current.renderOcrRects(resData[0].data.list);
		}, 3000);
	}
	useEffect(() => {
		getImgListRsp();
	}, []);
	return (
		<Content className="App">
			{/* 组件 */}
			<div className="view-box">
				<Row className="file-review" justify="space-between">
					<Col className="gutter-row" span={13}>
						<FileReview ref={FileReviewRef} sendOcrReq={getRecognitionRsp} />
					</Col>
					<Col className="gutter-row" span={11}>
						<AnalysisResult />
					</Col>
				</Row>
			</div>
		</Content>
	);
}

export default App;
