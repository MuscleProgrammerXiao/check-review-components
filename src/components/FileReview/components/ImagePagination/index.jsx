import React, { useImperativeHandle, useState } from 'react';
import './index.less';
const ImagePagination = React.forwardRef((prop, ref) => {
	const [viewData, setViewData] = useState([]);
	const [pageInfo, setPageInfo] = useState({ total: 0, pageIndex: 1, url: '', docId: '' });
	useImperativeHandle(ref, () => ({
		initPaginationData: (val) => {
			console.log('图片分页接收参数', val);
			setPageInfo(val.pageInfo);
			setViewData(val.viewData);
		},
	}));
	return (
		<div className="image-pagenation">
			<div className="wrap">ImagePagination</div>
		</div>
	);
});
export default ImagePagination;
