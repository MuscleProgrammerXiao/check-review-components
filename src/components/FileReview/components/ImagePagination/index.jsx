import React, { useImperativeHandle, useState, useRef } from 'react';
import { Pagination } from 'antd';
import './index.less';
const activeImgStyle = {
	border: '4px solid rgba(24, 144, 255, 0.9)',
};
const ImagePagination = React.forwardRef((prop, ref) => {
	const [viewData, setViewData] = useState([]);
	const [pageInfo, setPageInfo] = useState({ total: 0, pageIndex: 1, url: '', docId: '' });
	const imageRefs = useRef([]);

	// 通用的更新页面数据和滚动的函数
	const updatePage = (newPageIndex) => {
		const newImage = viewData.find((item) => item.pageIndex === newPageIndex);
		if (!newImage) return; // 如果没有找到对应的图片，直接返回

		setPageInfo((prevState) => ({
			...prevState,
			pageIndex: newImage.pageIndex,
			url: newImage.url,
			docId: newImage.docId,
		}));

		prop.initRenderImage(newImage.url);
		imageRefs.current[newImage.pageIndex - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	// 在页面渲染时自动滚动到当前图片
	const currentRenderImg = (pageIndex) => {
		updatePage(pageIndex);
	};
	// 控制翻页操作
	const changeCurrentImage = (sign) => {
		const newPageIndex = sign === 'back' ? pageInfo.pageIndex - 1 : pageInfo.pageIndex + 1;
		updatePage(newPageIndex);
	};

	useImperativeHandle(ref, () => ({
		initPaginationData: (val) => {
			setPageInfo(val.pageInfo);
			setViewData(val.viewData);
		},
		changeCurrentImage,
	}));

	return (
		<div className="image-pagenation">
			<div className="wrap">
				<div className="imglist">
					{viewData.map((img, index) => (
						<div
							key={img.pageIndex}
							className="imglist-item"
							ref={(el) => (imageRefs.current[index] = el)}
							style={img.pageIndex === pageInfo.pageIndex ? activeImgStyle : {}}
						>
							<img src={img.url} alt="" onClick={() => currentRenderImg(img.pageIndex)} />
						</div>
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
