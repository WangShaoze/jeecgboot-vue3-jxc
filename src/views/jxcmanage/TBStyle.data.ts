import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户款号',
    align: 'center',
    dataIndex: 'customerStyleNo',
  },
  {
    title: '款号',
    align: 'center',
    dataIndex: 'newStyleNo',
  },
  {
    title: '款式名称',
    align: 'center',
    dataIndex: 'itemName',
  },
  {
    title: '金工费',
    align: 'center',
    dataIndex: 'goldProcessFee',
  },
  {
    title: '银工费/g',
    align: 'center',
    dataIndex: 'sliverProcessFeeEachGram',
  },
  {
    title: '银工费/件',
    align: 'center',
    dataIndex: 'sliverProcessFeeEachPiece',
  },
  {
    title: '证书费',
    align: 'center',
    dataIndex: 'certificateFee',
  },
  {
    title: '辅料费',
    align: 'center',
    dataIndex: 'auxiliaryMaterialFee',
  },
  {
    title: '成本克工费',
    align: 'center',
    dataIndex: 'costWorkFeeEachGram',
  },
  {
    title: '成本件工费',
    align: 'center',
    dataIndex: 'costWorkFeeEachPiece',
  },
  {
    title: '经销克工费',
    align: 'center',
    dataIndex: 'distributorWorkFeeEachGram',
  },
  {
    title: '经销件工费',
    align: 'center',
    dataIndex: 'distributorWorkFeeEachPiece',
  },
  {
    title: '零售克工费',
    align: 'center',
    dataIndex: 'retailWorkFeeEachGram',
  },
  {
    title: '零售件工费',
    align: 'center',
    dataIndex: 'retailWorkFeeEachPiece',
  },
  {
    title: '是否一口价',
    align: 'center',
    dataIndex: 'isFixedPrice_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  customerStyleNo: { title: '客户款号', order: 0, view: 'text', type: 'string' },
  newStyleNo: { title: '款号', order: 1, view: 'text', type: 'string' },
  itemName: { title: '款式名称', order: 2, view: 'text', type: 'string' },
  goldProcessFee: { title: '金工费', order: 3, view: 'number', type: 'number' },
  sliverProcessFeeEachGram: { title: '银工费/g', order: 4, view: 'number', type: 'number' },
  sliverProcessFeeEachPiece: { title: '银工费/件', order: 5, view: 'number', type: 'number' },
  certificateFee: { title: '证书费', order: 6, view: 'number', type: 'number' },
  auxiliaryMaterialFee: { title: '辅料费', order: 7, view: 'number', type: 'number' },
  costWorkFeeEachGram: { title: '成本克工费', order: 8, view: 'number', type: 'number' },
  costWorkFeeEachPiece: { title: '成本件工费', order: 9, view: 'number', type: 'number' },
  distributorWorkFeeEachGram: { title: '经销克工费', order: 10, view: 'number', type: 'number' },
  distributorWorkFeeEachPiece: { title: '经销件工费', order: 11, view: 'number', type: 'number' },
  retailWorkFeeEachGram: { title: '零售克工费', order: 12, view: 'number', type: 'number' },
  retailWorkFeeEachPiece: { title: '零售件工费', order: 13, view: 'number', type: 'number' },
  isFixedPrice: {
    title: '是否一口价',
    order: 14,
    view: 'list',
    type: 'string',
    dictCode: 'jxc_isFixedPrice_dict',
  },
};
