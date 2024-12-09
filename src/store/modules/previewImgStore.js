/* 预览图片 */

const previewImgStore = (set) => ({
	currentPaginationViewData: [],
	currentPaginationPageInfo: { total: 0, pageIndex: 1, url: '', docId: '' },
	setCurrentPaginationViewData: (status) => {
		set(() => ({
			currentPaginationViewData: status,
		}));
	},
	setCurrentPaginationPageInfo: (status) => {
		set(() => ({
			currentPaginationPageInfo: status,
		}));
	},
});
export default previewImgStore;
