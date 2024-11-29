import { create } from 'zustand';

// import

const useStore = create((set) => ({
	rotate: 0,
	setRotate: (rotate) => set({ rotate }),
}));
export default useStore;
