import React from 'react';
import './App.less';
import { Layout, Row, Col } from 'antd';
import FileReview from './components/FileReview';
const { Content } = Layout;
function App() {
	return (
		<Content className="App">
			<Row>
				<Col className="gutter-row" span={12}>
					<FileReview />
				</Col>
				<Col className="gutter-row" span={12}>
					right
				</Col>
			</Row>
		</Content>
	);
}

export default App;
