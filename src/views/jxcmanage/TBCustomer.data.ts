import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名称',
    align: "center",
    dataIndex: 'customerName'
  },
  {
    title: '客户类型',
    align: "center",
    dataIndex: 'customerType_dictText'
  },
  {
    title: '保留字段2',
    align: "center",
    dataIndex: 'preserveFieldTwo'
  },
  {
    title: '保留字段3',
    align: "center",
    dataIndex: 'preserveFieldThree'
  },
];

// 高级查询数据
export const superQuerySchema = {
  customerName: {title: '客户名称',order: 0,view: 'text', type: 'string',},
  customerType: {title: '客户类型',order: 1,view: 'list', type: 'string',dictCode: 'jxc_sales_status',},
  preserveFieldTwo: {title: '保留字段2',order: 2,view: 'text', type: 'string',},
  preserveFieldThree: {title: '保留字段3',order: 3,view: 'text', type: 'string',},
};
