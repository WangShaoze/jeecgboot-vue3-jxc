import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '开户时间',
    align: "center",
    dataIndex: 'openAccountDatetime'
  },
  {
    title: '激活码',
    align: "center",
    dataIndex: 'activateCode'
  },
  {
    title: '仓库名',
    align: "center",
    dataIndex: 'warehouseName'
  },
  {
    title: '注册手机号',
    align: "center",
    dataIndex: 'phone'
  },
  {
    title: '店铺名',
    align: "center",
    dataIndex: 'merchantName'
  },
  {
    title: '报警原因',
    align: "center",
    dataIndex: 'warningCause'
  },
  {
    title: '角色',
    align: "center",
    dataIndex: 'sysRole'
  },
  {
    title: '角色ID',
    align: "center",
    dataIndex: 'sysRoleId'
  },
];

// 高级查询数据
export const superQuerySchema = {
  openAccountDatetime: {title: '开户时间',order: 0,view: 'datetime', type: 'string',},
  activateCode: {title: '激活码',order: 1,view: 'text', type: 'string',},
  warehouseName: {title: '仓库名',order: 2,view: 'text', type: 'string',},
  phone: {title: '注册手机号',order: 3,view: 'text', type: 'string',},
  merchantName: {title: '店铺名',order: 4,view: 'text', type: 'string',},
  warningCause: {title: '报警原因',order: 5,view: 'text', type: 'string',},
  sysRole: {title: '角色',order: 6,view: 'popup', type: 'string',code: 'jxc_sys_role', orgFields: 'sys_role', destFields: 'sysRole', popupMulti: false,},
  sysRoleId: {title: '角色ID',order: 7,view: 'popup', type: 'string',code: 'jxc_sys_role', orgFields: 'sys_role_id', destFields: 'sysRoleId', popupMulti: false,},
};
