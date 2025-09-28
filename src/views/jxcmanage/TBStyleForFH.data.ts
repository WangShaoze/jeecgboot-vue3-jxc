import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
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
  // {
  //   title: '金工费',
  //   align: 'center',
  //   dataIndex: 'goldProcessFee',
  // },
  // {
  //   title: '银工费',
  //   align: 'center',
  //   dataIndex: 'sliverProcessFee',
  // },
];

//子表列表数据
export const tBGoodsForFHColumns: BasicColumn[] = [
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
    title: '客户款号',
    align: 'center',
    dataIndex: 'customerStyleNo',
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
    title: '证书机构',
    align: 'center',
    dataIndex: 'certificateOrg',
  },
  {
    title: '字印',
    align: 'center',
    dataIndex: 'seal',
  },
  {
    title: '查询地址',
    align: 'center',
    dataIndex: 'queryUrl',
  },
  {
    title: '序号',
    align: 'center',
    dataIndex: 'sequenceNo',
  },
  {
    title: '原价',
    align: 'center',
    dataIndex: 'originalPrice',
  },
  {
    title: '参考售价(经销商)',
    align: 'center',
    dataIndex: 'distributorReferenceSellingPrice',
  },
  {
    title: '参考售价(代理商)',
    align: 'center',
    dataIndex: 'agentReferenceSellingPrice',
  },
  {
    title: '状态（合/残）',
    align: 'center',
    dataIndex: 'status_dictText',
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

// 高级查询数据
export const superQuerySchema = {
  newStyleNo: { title: '款号', order: 0, view: 'text', type: 'string' },
  itemName: { title: '款式名称', order: 1, view: 'text', type: 'string' },
  // goldProcessFee: { title: '金工费', order: 3, view: 'number', type: 'number' },
  // sliverProcessFee: { title: '银工费', order: 4, view: 'number', type: 'number' },
};
