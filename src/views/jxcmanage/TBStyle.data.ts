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
    title: '单克工费(经销)',
    align: 'center',
    dataIndex: 'singleGramDistributorCost',
  },
  {
    title: '单克工费(代理)',
    align: 'center',
    dataIndex: 'singleGramAgentCost',
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
  singleGramDistributorCost: { title: '单克工费(经销)', order: 8, view: 'number', type: 'number' },
  singleGramAgentCost: { title: '单克工费(代理)', order: 9, view: 'number', type: 'number' },
};
