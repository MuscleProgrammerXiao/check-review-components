import React, { useEffect, useRef, useCallback, useState, useImperativeHandle } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Stage, Layer, Rect, Image } from 'react-konva';
import ImgControlBtns from './components/ImgControlBtns';
import useImage from 'use-image';
import ScanLoading from './components/ScanLoading';
import './index.less';
const RectColor = 'red';
const FileReview = React.forwardRef((prop, ref) => {
	const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 }); // 父容器的尺寸
	const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 }); // 图片的尺寸和位置
	const containerRef = useRef(null);
	const TransformWrapperRef = useRef(null);
	const ScanLoadingRef = useRef(null);
	const [viewData, setViewData] = useState([]);
	const [pageInfo, setPageInfo] = useState({
		total: null,
		pageIndex: 1,
		url: '',
		docId: '',
	});
	const [image, status] = useImage(pageInfo.url); // 加载图片
	const [annotations, setAnnotations] = useState([]);
	/* 初始化影像列表 */
	const initImageList = useCallback(
		(initData) => {
			// 初始化图片列表
			const { total, list } = initData.data;
			if (list.length === 0) return; //这里当图片列表为空，渲染图片为空的dom
			const { docId, pageIndex, url } = list[pageInfo.pageIndex - 1];
			setPageInfo({ total, pageIndex, url, docId });
			setViewData(list);
			console.log('图片列表', viewData);
		},
		[pageInfo, viewData]
	);
	/* 渲染ocrs识别的坐标 */
	const renderOcrRects = useCallback((ocrData) => {
		setAnnotations(ocrData);
	}, []);
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
			default:
				break;
		}
	};

	const updateSize = useCallback(() => {
		if (containerRef.current) {
			const { offsetWidth, offsetHeight } = containerRef.current;
			if (containerDimensions.width !== offsetWidth || containerDimensions.height !== offsetHeight) {
				setContainerDimensions({ width: offsetWidth - 2, height: offsetHeight - 2 });
			}
		}
	}, [containerDimensions.width, containerDimensions.height]);
	const shouldUpdateLayer = useCallback(() => {
		return !!image || annotations.length > 0;
	}, [image, annotations]);
	useEffect(() => {
		// 组件挂载时初始化尺寸
		updateSize();

		// 窗口尺寸变化时更新父容器尺寸
		window.addEventListener('resize', updateSize);

		// 组件卸载时清理事件监听
		return () => window.removeEventListener('resize', updateSize);
	}, [updateSize]);
	useEffect(() => {
		// 当图片和容器尺寸都准备好时，计算图片的尺寸
		if (image && containerDimensions.width > 0 && containerDimensions.height > 0) {
			const imageRatio = image.width / image.height;
			const containerRatio = containerDimensions.width / containerDimensions.height;
			let width, height;

			if (imageRatio > containerRatio) {
				// 如果图片宽度大于高度，宽度设为父容器的宽度
				width = containerDimensions.width;
				height = width / imageRatio;
			} else {
				height = containerDimensions.height;
				width = height * imageRatio;
			}

			// 计算居中的 X 和 Y 坐标
			const x = (containerDimensions.width - width) / 2;
			const y = (containerDimensions.height - height) / 2;

			// 更新图片的尺寸和位置
			setSize({ width, height, x, y });
		}
	}, [image, containerDimensions]);
	// 监听 status 和 image 变化
	useEffect(() => {
		if (status === 'loaded') {
			prop.sendOcrReq(pageInfo);
		}
	}, [status, image, pageInfo, prop]);

	useImperativeHandle(ref, () => ({
		/* 控制扫描loading */
		controlScanLoading: (val) => {
			if (ScanLoadingRef.current) {
				ScanLoadingRef.current.setScanLoading(val);
			}
		},
		initImageList,
		renderOcrRects,
	}));
	return (
		<div className="wrap">
			<main className="img-review" ref={containerRef}>
				<>
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
								<Layer shouldComponentUpdate={shouldUpdateLayer}>
									<Image
										x={size.x} // 图片的 X 坐标
										y={size.y} // 图片的 Y 坐标
										width={size.width} // 图片的宽度
										height={size.height} // 图片的高度
										image={image} // 渲染的图片
									/>
								</Layer>
								<Layer shouldComponentUpdate={shouldUpdateLayer}>
									{annotations.map((annotation, index) => (
										<Rect
											key={index}
											x={annotation.point.x}
											y={annotation.point.y}
											width={annotation.point.width}
											height={annotation.point.height}
											stroke={RectColor}
											strokeWidth={2}
											// dash={[10, 5]} // 虚线
										/>
									))}
								</Layer>
							</Stage>
						</TransformComponent>
					</TransformWrapper>
					<ImgControlBtns handleChangeInputValue={handleChangeInputValue} />
				</>
				<ScanLoading ref={ScanLoadingRef} />
			</main>
			<footer className="tools-row">
				{/* <div onClick={() => ScanLoadingRef.current.setScanLoading(true)}>识别</div>
				<div onClick={() => ScanLoadingRef.current.setScanLoading(false)}>关闭</div> */}
			</footer>
		</div>
	);
});
export default FileReview;
