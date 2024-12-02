import React from 'react';
import './App.less';
import { Layout, Row, Col } from 'antd';
import FileReview from './components/FileReview';
const { Content } = Layout;
function App() {
	return (
		<Content className="App">
			{/* 组件 */}
			<div className="view-box">
				<Row className="file-review" justify="space-between">
					<Col className="gutter-row" span={13}>
						<FileReview />
					</Col>
					<Col className="gutter-row" span={11}>
						12
					</Col>
				</Row>
			</div>
		</Content>
	);
}

export default App;
