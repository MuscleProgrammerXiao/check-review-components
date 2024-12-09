import { create } from 'zustand';

import previewImgStore from './modules/previewImgStore';

const useStore = create((set) => ({
	...previewImgStore(...set),
}));
export default useStore;
