/* 
发票ocrs 后端返回数据  coordinate

目前有两种数据结构方案
{
    key: 2,
    labelPoint: {
        label: '名称',
        x: 150, y: 317, width: 120, height: 30
    },
    valuePoint: {
        value: null, x: null, y: null, width: null, height: null,
    }
},
{
    key: 3,
    label: '开票日期',
    value: '2018年03月21日',
    sign: "invoiceDate",
    point: [
        {
            id: 1,
            x: 890, y: 270, width: 250, height: 30
        }
    ],
}
*/
export const invoiceOcrsRspData = [
    {
        "code": 0,
        "msg": "成功",
        "data": {
            docId: "invoice0001",
            list: [
                {
                    key: 1,
                    label: '购买方名称',
                    value: null,
                    sign: "buyerName",
                    point: { x: 150, y: 317, width: 120, height: 30 }
                },
                {
                    key: 2,
                    label: '开票日期',
                    value: '2018年03月21日',
                    sign: "invoiceDate",
                    point: { x: 890, y: 270, width: 250, height: 30 }
                }
            ],

        }
    }
] 