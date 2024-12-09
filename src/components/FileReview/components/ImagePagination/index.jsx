import React, { useImperativeHandle, useState } from 'react';
import { Pagination } from 'antd';
import './index.less';
const activeImgStyle = {
	border: '4px solid rgba(24, 144, 255, 0.9)',
};
const ImagePagination = React.forwardRef((prop, ref) => {
	const [viewData, setViewData] = useState([]);
	const [pageInfo, setPageInfo] = useState({ total: 0, pageIndex: 1, url: '', docId: '' });
	const currentRenderImg = (pageIndex) => {
		const currentUrl = viewData.filter((item) => item.pageIndex === pageIndex)[0].url;
		prop.initRenderImage(currentUrl);
	};
	useImperativeHandle(ref, () => ({
		initPaginationData: (val) => {
			setPageInfo(val.pageInfo);
			setViewData(val.viewData);
		},
	}));
	return (
		<div className="image-pagenation">
			<div className="wrap">
				<div className="imglist">
					{viewData.map((img) => (
						<img
							className="imglist-item"
							style={img.pageIndex === pageInfo.pageIndex ? activeImgStyle : {}}
							key={img.pageIndex}
							src={img.url}
							alt=""
							onClick={() => {
								setPageInfo({ ...pageInfo, pageIndex: img.pageIndex });
								currentRenderImg(img.pageIndex);
							}}
						/>
					))}
				</div>
				<div className="pagination">
					<Pagination
						simple
						defaultPageSize={1}
						current={pageInfo.pageIndex}
						total={pageInfo.total}
						onChange={(pageIndex) => {
							setPageInfo({ ...pageInfo, pageIndex });
							currentRenderImg(pageIndex);
						}}
					/>
				</div>
			</div>
		</div>
	);
});
export default ImagePagination;
