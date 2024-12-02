import React, { useEffect, useRef } from 'react';
import './App.less';
import { Layout, Row, Col } from 'antd';
import FileReview from './components/FileReview';
import AnalysisResult from './components/AnalysisResult';
import { invoiceImgListRsponse } from './mock/invoiceData';
const { Content } = Layout;
function App() {
	const FileReviewRef = useRef(null);
	/* 第一步：获取图像信息，加载图像 */
	const getImgListRsp = () => {
		if (!FileReviewRef.current) return;
		FileReviewRef.current.controlScanLoading(true);
		setTimeout(() => {
			FileReviewRef.current.controlScanLoading(false);
			console.log('获取到数据', invoiceImgListRsponse);
		}, 3000);
	};
	// /* 第二步：获取识别结果 */
	// const getRecognitionRsp = () => {
	// 	if (!FileReviewRef.current) return;
	// 	FileReviewRef.current.controlScanLoading(true);
	// 	setTimeout(() => {
	// 		FileReviewRef.current.controlScanLoading(false);
	// 		console.log('获取到数据', invoiceImgListRsponse);
	// 	}, 3000);
	useEffect(() => {
		getImgListRsp();
	}, []);
	return (
		<Content className="App">
			{/* 组件 */}
			<div className="view-box">
				<Row className="file-review" justify="space-between">
					<Col className="gutter-row" span={13}>
						<FileReview ref={FileReviewRef} />
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
