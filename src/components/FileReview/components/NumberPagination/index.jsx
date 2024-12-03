/* 
分页器，数字模式
*/
import React, { useImperativeHandle, useState } from 'react';
import { Pagination } from 'antd';
import './index.less';
const NumberPagination = React.forwardRef((prop, ref) => {
	const [pageInfo, setPageInfo] = useState({
		total: 1,
		current: 1,
	});
	useImperativeHandle(ref, () => ({
		changePageIndex: (page) => {
			setPageInfo({ total: page.total, current: page.pageIndex });
		},
	}));
	return (
		<div className="number-pagination">
			<Pagination
				current={pageInfo.current}
				total={pageInfo.total}
				showTotal={(total) => `共 ${total} 页`}
				defaultPageSize={1}
				showSizeChanger={false}
				onChange={(page) => prop.changePageIndex(page)}
				showQuickJumper
			/>
		</div>
	);
});
export default NumberPagination;
