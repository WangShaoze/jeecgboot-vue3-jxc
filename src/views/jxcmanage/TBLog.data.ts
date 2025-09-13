import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '日志标识',
    align: 'center',
    dataIndex: 'remarks',
  },
  {
    title: '日志内容',
    align: 'center',
    dataIndex: 'logContent',
  },
  {
    title: '文件路径',
    align: 'center',
    dataIndex: 'fileUrl',
  },
];

// 高级查询数据
export const superQuerySchema = {
  remarks: { title: '日志标识', order: 0, view: 'text', type: 'string' },
  logContent: { title: '日志内容', order: 1, view: 'text', type: 'string' },
  fileUrl: { title: '文件路径', order: 2, view: 'file', type: 'string' },
};
