import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '款式类别',
    align: 'center',
    dataIndex: 'styleCategory',
  },
  {
    title: '货号',
    align: 'center',
    dataIndex: 'productNo',
  },
  {
    title: '客胚名称',
    align: 'center',
    dataIndex: 'itemName',
  },
  {
    title: '银重',
    align: 'center',
    dataIndex: 'silverWeight',
  },
  {
    title: '金重',
    align: 'center',
    dataIndex: 'goldWeight',
  },
  {
    title: '总重',
    align: 'center',
    dataIndex: 'totalWeight',
  },
  {
    title: '证书编号',
    align: 'center',
    dataIndex: 'certificateNo',
  },
  {
    title: '成本',
    align: 'center',
    dataIndex: 'goodsCost',
  },
  {
    title: '参考售价(经销)',
    align: 'center',
    dataIndex: 'distributorReferenceSellingPrice',
  },
  {
    title: '参考零售价(零售单克工费)',
    align: 'center',
    dataIndex: 'retailSellingPriceAndWorkFeeEachGram',
    width: 220,
  },
  {
    title: '库存状态',
    align: 'center',
    dataIndex: 'inboundStatus_dictText',
  },
  {
    title: '销售状态',
    align: 'center',
    dataIndex: 'salesStatus_dictText',
  },
  {
    title: '库位号',
    align: 'center',
    dataIndex: 'kmValue',
  },
];
