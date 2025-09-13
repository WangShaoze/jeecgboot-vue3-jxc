import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '原库码',
    align: "center",
    dataIndex: 'km'
  },
];

// 高级查询数据
export const superQuerySchema = {
  km: {title: '原库码',order: 0,view: 'text', type: 'string',},
};
