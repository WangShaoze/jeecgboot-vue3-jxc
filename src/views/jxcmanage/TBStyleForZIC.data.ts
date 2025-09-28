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
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '款号',
    field: 'newStyleNo',
    component: 'JInput',
  },
  {
    label: '款式名称',
    field: 'itemName',
    component: 'JInput',
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '款号',
    field: 'newStyleNo',
    component: 'Input',
  },
  {
    label: '款式名称',
    field: 'itemName',
    component: 'Input',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

//子表列表数据
export const tBGoodsZICColumns: BasicColumn[] = [
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
    title: '成本',
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
//子表表单数据
export const tBGoodsZICFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '款式类别',
    field: 'styleCategory',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入款式类别!' }];
    },
  },
  {
    label: '货号',
    field: 'productNo',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入货号!' }];
    },
  },
  {
    label: '客胚名称',
    field: 'itemName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入客胚名称!' }];
    },
  },
  {
    label: '银重',
    field: 'silverWeight',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入银重!' }];
    },
  },
  {
    label: '金重',
    field: 'goldWeight',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入金重!' }];
    },
  },
  {
    label: '总重',
    field: 'totalWeight',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入总重!' }];
    },
  },
  {
    label: '证书编号',
    field: 'certificateNo',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入证书编号!' }];
    },
  },
  {
    label: '证书机构',
    field: 'certificateOrg',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入证书机构!' }];
    },
  },
  {
    label: '字印',
    field: 'seal',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入字印!' }];
    },
  },
  {
    label: '查询地址',
    field: 'queryUrl',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入查询地址!' }];
    },
  },
  {
    label: '序号',
    field: 'sequenceNo',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入序号!' }];
    },
  },
  {
    label: '成本',
    field: 'originalPrice',
    component: 'InputNumber',
  },
  {
    label: '参考售价(经销商)',
    field: 'distributorReferenceSellingPrice',
    component: 'InputNumber',
  },
  {
    label: '参考售价(代理商)',
    field: 'agentReferenceSellingPrice',
    component: 'InputNumber',
  },
  {
    label: '状态（合/残）',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_pandian_status',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态（合/残）!' }];
    },
  },
  {
    label: '库存状态',
    field: 'inboundStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_zic_inbound_status',
    },
  },
  {
    label: '销售状态',
    field: 'salesStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_sales_status',
    },
  },
  {
    label: '库位号',
    field: 'kmValue',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'jxc_select_km',
        fieldConfig: [
          { source: 'id', target: 'kmId' },
          { source: 'km', target: 'kmValue' },
        ],
        multi: true,
      };
    },
  },
];

// 高级查询数据
export const superQuerySchema = {
  newStyleNo: { title: '款号', order: 0, view: 'text', type: 'string' },
  itemName: { title: '款式名称', order: 1, view: 'text', type: 'string' },
};
