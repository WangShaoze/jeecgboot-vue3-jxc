import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名称',
    align: 'center',
    dataIndex: 'customerName',
  },
  {
    title: '客户类型',
    align: 'center',
    dataIndex: 'customerType_dictText',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '出生日期',
    align: 'center',
    dataIndex: 'birthday',
    customRender: ({ text }) => {
      text = !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
      return text;
    },
  },
];

// 高级查询数据
export const superQuerySchema = {
  customerName: { title: '客户名称', order: 0, view: 'text', type: 'string' },
  customerType: {
    title: '客户类型',
    order: 1,
    view: 'list',
    type: 'string',
    dictCode: 'jxc_sales_status',
  },
  phone: { title: '手机号', order: 2, view: 'text', type: 'string' },
  birthday: { title: '出生日期', order: 3, view: 'date', type: 'string' },
};
