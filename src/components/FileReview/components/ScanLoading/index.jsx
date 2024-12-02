import React, { useImperativeHandle, useState } from 'react';
import './index.less';
const ScanLoading = React.forwardRef((prop, ref) => {
	const [loading, setLoading] = useState(false);
	useImperativeHandle(ref, () => ({
		setScanLoading: (e) => {
			setLoading(e);
		},
	}));
	return (
		<div className="scanner" style={{ display: loading ? '' : 'none' }}>
			<div className="box">
				<div className="line"></div>
				<div className="angle"></div>
			</div>
		</div>
	);
});
export default ScanLoading;
