import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '款号',
    align: "center",
    dataIndex: 'styleNo'
  },
  {
    title: '款式名称',
    align: "center",
    dataIndex: 'itemName'
  },
  {
    title: '客户',
    align: "center",
    dataIndex: 'customAccount'
  },
  {
    title: '金工费',
    align: "center",
    dataIndex: 'goldProcessFee'
  },
  {
    title: '银工费',
    align: "center",
    dataIndex: 'sliverProcessFee'
  },
];

// 高级查询数据
export const superQuerySchema = {
  styleNo: {title: '款号',order: 0,view: 'text', type: 'string',},
  itemName: {title: '款式名称',order: 1,view: 'text', type: 'string',},
  customAccount: {title: '客户',order: 2,view: 'text', type: 'string',},
  goldProcessFee: {title: '金工费',order: 3,view: 'number', type: 'number',},
  sliverProcessFee: {title: '银工费',order: 4,view: 'number', type: 'number',},
};
