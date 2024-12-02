/* 
发票图片 docId 页码 图片url
*/

import inovice1 from '../assets/invoice1.jpg';
import invoice2 from '../assets/invoice2.jpg';
import invoice3 from '../assets/invoice3.jpg';
import invoice4 from '../assets/invoice4.jpg';
import invoice5 from '../assets/invoice5.png';

export const invoiceImgListRsponse = {
	code: 200,
	msg: 'success',
	data: {
		total: 5,
		list: [
			{
				docId: 'invoice0001',
				url: inovice1,
				pageIndex: 1,
			},
			{
				docId: 'invoice0002',
				url: invoice2,
				pageIndex: 2,
			},
			{
				docId: 'invoice0003',
				url: invoice3,
				pageIndex: 3,
			},
			{
				docId: 'invoice0004',
				url: invoice4,
				pageIndex: 4,
			},
			{
				docId: 'invoice0005',
				url: invoice5,
				pageIndex: 5,
			},
		],
	},
};
