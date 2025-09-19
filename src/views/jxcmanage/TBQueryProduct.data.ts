import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '货号',
    align: "center",
    dataIndex: 'itemNumber'
  },
  {
    title: '证书编号',
    align: "center",
    dataIndex: 'certificateNumber'
  },
  {
    title: '商品名称',
    align: "center",
    dataIndex: 'productName'
  },
  {
    title: '形状',
    align: "center",
    dataIndex: 'shape'
  },
  {
    title: '颜色',
    align: "center",
    dataIndex: 'color'
  },
  {
    title: '基材重',
    align: "center",
    dataIndex: 'baseMaterialWeight'
  },
  {
    title: '电金后重',
    align: "center",
    dataIndex: 'weightAfterGoldPlating'
  },
  {
    title: '总质量',
    align: "center",
    dataIndex: 'totalWeight'
  },
  {
    title: '金重',
    align: "center",
    dataIndex: 'goldWeight'
  },
];

// 高级查询数据
export const superQuerySchema = {
  itemNumber: {title: '货号',order: 0,view: 'text', type: 'string',},
  certificateNumber: {title: '证书编号',order: 1,view: 'text', type: 'string',},
  productName: {title: '商品名称',order: 2,view: 'text', type: 'string',},
  shape: {title: '形状',order: 3,view: 'text', type: 'string',},
  color: {title: '颜色',order: 4,view: 'text', type: 'string',},
  baseMaterialWeight: {title: '基材重',order: 5,view: 'number', type: 'number',},
  weightAfterGoldPlating: {title: '电金后重',order: 6,view: 'number', type: 'number',},
  totalWeight: {title: '总质量',order: 7,view: 'number', type: 'number',},
  goldWeight: {title: '金重',order: 8,view: 'number', type: 'number',},
};
