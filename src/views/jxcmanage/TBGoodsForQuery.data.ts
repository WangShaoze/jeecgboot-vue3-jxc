import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '形状',
    align: 'center',
    dataIndex: 'styleCategory',
  },
  {
    title: '货号',
    align: 'center',
    dataIndex: 'productNo',
  },
  {
    title: '证书编号',
    align: 'center',
    dataIndex: 'certificateNo',
  },
  {
    title: '颜色',
    align: 'center',
    dataIndex: 'color',
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'itemName',
  },
  {
    title: '基材重',
    align: 'center',
    dataIndex: 'silverWeight',
  },
  {
    title: '金重',
    align: 'center',
    dataIndex: 'goldWeight',
  },
  {
    title: '电金后重',
    align: 'center',
    dataIndex: 'totalWeightOne',
  },
  {
    title: '总重',
    align: 'center',
    dataIndex: 'totalWeight',
  },
  {
    title: '查询地址',
    align: 'center',
    dataIndex: 'queryUrl',
  },
];

// 高级查询数据
export const superQuerySchema = {
  styleCategory: { title: '形状', order: 0, view: 'text', type: 'string' },
  productNo: { title: '货号', order: 1, view: 'text', type: 'string' },
  itemName: { title: '商品名称', order: 2, view: 'text', type: 'string' },
  silverWeight: { title: '基材重', order: 3, view: 'number', type: 'number' },
  goldWeight: { title: '金重', order: 4, view: 'number', type: 'number' },
  totalWeight: { title: '总重', order: 5, view: 'number', type: 'number' },
  certificateNo: { title: '证书编号', order: 6, view: 'text', type: 'string' },
  queryUrl: { title: '查询地址', order: 7, view: 'text', type: 'string' },
  totalWeightOne: { title: '电金后重', order: 8, view: 'number', type: 'number' },
  color: { title: '颜色', order: 9, view: 'text', type: 'text' },
};
