import React, { useEffect, useRef, useCallback, useState, useImperativeHandle } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Stage, Layer, Rect, Image } from 'react-konva';
import useImage from 'use-image';
import ScanLoading from './components/ScanLoading';
import ImgControlBtns from './components/ImgControlBtns';
import NumberPagination from './components/NumberPagination';
import PreviewImage from './components/PreviewImage';
// import useStore from '../../store';
import './index.less';

const RectColor = 'rgba(24, 144, 255)';
const RectFillColor = 'rgba(24, 144, 255, 0.1)';

const FileReview = React.forwardRef((props, ref) => {
	const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
	const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
	const [viewData, setViewData] = useState([]);
	const [pageInfo, setPageInfo] = useState({ total: 0, pageIndex: 1, url: '', docId: '' });
	const [image, status] = useImage(pageInfo.url);
	const [annotations, setAnnotations] = useState([]);
	// const { setCurrentPaginationViewData, setCurrentPaginationPageInfo } = useStore();
	const containerRef = useRef(null);
	const TransformWrapperRef = useRef(null);
	const ScanLoadingRef = useRef(null);
	const NumberPaginationRef = useRef(null);
	const RectLayerRef = useRef(null);
	const PreviewImageRef = useRef(null);

	/* 初始化影像列表 */
	const initImageList = useCallback(
		(initData) => {
			const { total, list } = initData.data;
			if (list.length === 0) return;
			const { docId, pageIndex, url } = list[pageInfo.pageIndex - 1];
			setPageInfo({ total, pageIndex, url, docId });
			NumberPaginationRef.current.changePageIndex({ total, pageIndex, url, docId });
			setViewData(list);
		},
		[pageInfo.pageIndex]
	);

	/* 渲染 OCR 坐标 */
	const renderOcrRects = useCallback((ocrData) => {
		setAnnotations(ocrData);
		RectLayerRef.current?.draw();
	}, []);

	/* 切换图片 */
	const changePageIndex = useCallback(
		(val) => {
			const { pageIndex, url, docId } = viewData[val - 1];
			RectLayerRef.current.clear();
			setPageInfo((prev) => ({ ...prev, pageIndex, url, docId }));
			NumberPaginationRef.current.changePageIndex({ ...pageInfo, pageIndex, url, docId });
		},
		[viewData, pageInfo]
	);

	/* 操作图片缩放 */
	const handleChangeInputValue = (val) => {
		switch (val) {
			case 'increase':
				TransformWrapperRef.current.zoomIn(0.25);
				break;
			case 'subtract':
				TransformWrapperRef.current.zoomOut(0.25);
				break;
			case 'reset':
				TransformWrapperRef.current.resetTransform();
				break;
			case 'preview':
				PreviewImageRef.current.initPreviewImageModalData({ viewData, pageInfo });
				// setCurrentPaginationViewData(viewData);
				// setCurrentPaginationPageInfo(pageInfo);
				break;
			default:
				break;
		}
	};

	/* 更新容器尺寸 */
	const updateSize = useCallback(() => {
		if (containerRef.current) {
			const { offsetWidth, offsetHeight } = containerRef.current;
			if (containerDimensions.width !== offsetWidth || containerDimensions.height !== offsetHeight) {
				setContainerDimensions({ width: offsetWidth - 2, height: offsetHeight - 2 });
			}
		}
	}, [containerDimensions.width, containerDimensions.height]);

	/* 计算图片尺寸 */
	useEffect(() => {
		if (image && containerDimensions.width > 0 && containerDimensions.height > 0) {
			const imageRatio = image.width / image.height;
			const containerRatio = containerDimensions.width / containerDimensions.height;
			let width, height;

			if (imageRatio > containerRatio) {
				width = containerDimensions.width;
				height = width / imageRatio;
			} else {
				height = containerDimensions.height;
				width = height * imageRatio;
			}

			setSize({
				width,
				height,
				x: (containerDimensions.width - width) / 2,
				y: (containerDimensions.height - height) / 2,
			});
		}
	}, [image, containerDimensions]);

	/* 监听图片加载完成并发送 OCR 请求 */
	useEffect(() => {
		if (status === 'loaded') {
			props.sendOcrReq(pageInfo);
		}
	}, [status, pageInfo, props]);

	/* 初始化容器大小和事件监听 */
	useEffect(() => {
		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, [updateSize]);

	/* 暴露方法给父组件 */
	useImperativeHandle(ref, () => ({
		controlScanLoading: (val) => {
			ScanLoadingRef.current?.setScanLoading(val);
		},
		initImageList,
		renderOcrRects,
	}));

	return (
		<div className="wrap">
			<main className="img-review" ref={containerRef}>
				<TransformWrapper
					ref={TransformWrapperRef}
					panning={{ velocityDisabled: true }}
					limitToBounds={false}
					minScale={0.5}
					maxScale={2}
					initialScale={1}
				>
					<TransformComponent>
						<Stage width={containerDimensions.width} height={containerDimensions.height}>
							<Layer>
								<Image x={size.x} y={size.y} width={size.width} height={size.height} image={image} />
							</Layer>
							<Layer ref={RectLayerRef}>
								{annotations.map((annotation, index) => (
									<Rect
										key={index}
										x={annotation.point.x}
										y={annotation.point.y}
										width={annotation.point.width}
										height={annotation.point.height}
										stroke={RectColor}
										fill={RectFillColor}
										strokeWidth={2}
									/>
								))}
							</Layer>
						</Stage>
					</TransformComponent>
				</TransformWrapper>
				<ImgControlBtns handleChangeInputValue={handleChangeInputValue} />
				<ScanLoading ref={ScanLoadingRef} />
			</main>
			<footer className="tools-row">
				<NumberPagination ref={NumberPaginationRef} changePageIndex={changePageIndex} />
			</footer>
			<PreviewImage ref={PreviewImageRef} />
		</div>
	);
});

export default FileReview;
