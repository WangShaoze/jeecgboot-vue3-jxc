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
    title: '平均银重',
    align: 'center',
    dataIndex: 'avgSilverWeight',
  },
  {
    title: '平均金重',
    align: 'center',
    dataIndex: 'avgGoldWeight',
  },
  {
    title: '平均总重',
    align: 'center',
    dataIndex: 'avgTotalWeight',
  },
  {
    title: '经销工费',
    align: 'center',
    dataIndex: 'distributorCost',
  },
  {
    title: '零售工费',
    align: 'center',
    dataIndex: 'retailCost',
  },
  {
    title: '成本工费',
    align: 'center',
    dataIndex: 'costWorkFee',
  },
  {
    title: '零售一口价',
    align: 'center',
    dataIndex: 'retailFixedPrice',
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
  avgSilverWeight: { title: '平均银重', order: 3, view: 'number', type: 'number' },
  avgGoldWeight: { title: '平均金重', order: 3, view: 'number', type: 'number' },
  avgTotalWeight: { title: '平均总重', order: 4, view: 'number', type: 'number' },
  distributorCost: { title: '经销工费', order: 5, view: 'number', type: 'number' },
  retailCost: { title: '零售工费', order: 7, view: 'number', type: 'number' },
  costWorkFee: { title: '成本工费', order: 7, view: 'number', type: 'number' },
  retailFixedPrice: { title: '零售一口价', order: 8, view: 'number', type: 'number' },
  isFixedPrice: {
    title: '是否一口价',
    order: 9,
    view: 'list',
    type: 'string',
    dictCode: 'jxc_isFixedPrice_dict',
  },
};
