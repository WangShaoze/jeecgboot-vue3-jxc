import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '款号',
    align: 'center',
    dataIndex: 'styleNo',
  },
  {
    title: '款式名称',
    align: 'center',
    dataIndex: 'itemName',
  },
  /*{
    title: '客户',
    align: 'center',
    dataIndex: 'customAccount',
  },
  {
    title: '金工费',
    align: 'center',
    dataIndex: 'goldProcessFee',
  },
  {
    title: '银工费',
    align: 'center',
    dataIndex: 'sliverProcessFee',
  },*/
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '款号',
    field: 'styleNo',
    component: 'JInput',
  },
  {
    label: '款式名称',
    field: 'itemName',
    component: 'JInput',
  },
  {
    label: '客户',
    field: 'customAccount',
    component: 'JInput',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '款号',
    field: 'styleNo',
    component: 'Input',
  },
  {
    label: '款式名称',
    field: 'itemName',
    component: 'Input',
  },
  /*{
    label: '客户',
    field: 'customAccount',
    component: 'Input',
  },
  {
    label: '金工费',
    field: 'goldProcessFee',
    component: 'InputNumber',
  },
  {
    label: '银工费',
    field: 'sliverProcessFee',
    component: 'InputNumber',
  },*/
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
//子表单数据
//子表列表数据
export const tBGoodsForCKColumns: BasicColumn[] = [
  {
    title: '款号',
    align: 'center',
    dataIndex: 'newStyleNo',
  },
  {
    title: '款式类别',
    align: 'center',
    dataIndex: 'styleCategory',
  },
  {
    title: '款名',
    align: 'center',
    dataIndex: 'itemName',
  },
  {
    title: '货号',
    align: 'center',
    dataIndex: 'productNo',
  },
  {
    title: '库位号',
    align: 'center',
    dataIndex: 'kmValue',
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
    title: '参考售价',
    align: 'center',
    dataIndex: 'referenceSellingPrice',
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
];
//子表表格配置
export const tBGoodsForCKJVxeColumns: JVxeColumn[] = [
  {
    title: '款式类别',
    key: 'styleCategory',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '货号',
    key: 'productNo',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '客户款号',
    key: 'newStyleNo',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '客胚名称',
    key: 'itemName',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '银重',
    key: 'silverWeight',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '金重',
    key: 'goldWeight',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '总重',
    key: 'totalWeight',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '证书编号',
    key: 'certificateNo',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '证书机构',
    key: 'certificateOrg',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '字印',
    key: 'seal',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '查询地址',
    key: 'queryUrl',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '序号',
    key: 'sequenceNo',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '原价',
    key: 'originalPrice',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '参考售价',
    key: 'referenceSellingPrice',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '状态（合/残）',
    key: 'status',
    type: JVxeTypes.select,
    options: [],
    dictCode: 'jxc_pandian_status',
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '库存状态',
    key: 'inboundStatus',
    type: JVxeTypes.select,
    options: [],
    dictCode: 'jxc_inbound_status',
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '销售状态',
    key: 'salesStatus',
    type: JVxeTypes.select,
    options: [],
    dictCode: 'jxc_sales_status',
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '库位号',
    key: 'kmValue',
    type: JVxeTypes.popup,
    popupCode: 'jxc_select_km',
    fieldConfig: [
      { source: 'id', target: 'kmId' },
      { source: 'km', target: 'kmValue' },
    ],

    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];

// 高级查询数据
export const superQuerySchema = {
  styleNo: { title: '款号', order: 0, view: 'text', type: 'string' },
  itemName: { title: '款式名称', order: 1, view: 'text', type: 'string' },
  customAccount: { title: '客户', order: 2, view: 'text', type: 'string' },
  goldProcessFee: { title: '金工费', order: 3, view: 'number', type: 'number' },
  sliverProcessFee: { title: '银工费', order: 4, view: 'number', type: 'number' },
  //子表高级查询
  tBGoodsForCK: {
    title: '货品记录',
    view: 'table',
    fields: {
      styleCategory: { title: '款式类别', order: 0, view: 'text', type: 'string' },
      productNo: { title: '货号', order: 1, view: 'text', type: 'string' },
      newStyleNo: { title: '客户款号', order: 2, view: 'text', type: 'string' },
      itemName: { title: '客胚名称', order: 3, view: 'text', type: 'string' },
      silverWeight: { title: '银重', order: 4, view: 'number', type: 'number' },
      goldWeight: { title: '金重', order: 5, view: 'number', type: 'number' },
      totalWeight: { title: '总重', order: 6, view: 'number', type: 'number' },
      certificateNo: { title: '证书编号', order: 7, view: 'text', type: 'string' },
      certificateOrg: { title: '证书机构', order: 8, view: 'text', type: 'string' },
      seal: { title: '字印', order: 9, view: 'text', type: 'string' },
      queryUrl: { title: '查询地址', order: 10, view: 'text', type: 'string' },
      sequenceNo: { title: '序号', order: 11, view: 'number', type: 'number' },
      originalPrice: { title: '原价', order: 12, view: 'number', type: 'number' },
      referenceSellingPrice: { title: '参考售价', order: 13, view: 'number', type: 'number' },
      status: {
        title: '状态（合/残）',
        order: 14,
        view: 'radio',
        type: 'string',
        dictCode: 'jxc_pandian_status',
      },
      inboundStatus: {
        title: '库存状态',
        order: 15,
        view: 'radio',
        type: 'string',
        dictCode: 'jxc_inbound_status',
      },
      salesStatus: {
        title: '销售状态',
        order: 16,
        view: 'radio',
        type: 'string',
        dictCode: 'jxc_sales_status',
      },
      kmValue: {
        title: '库位号',
        order: 18,
        view: 'popup',
        type: 'string',
        code: 'jxc_select_km',
        orgFields: 'km',
        destFields: 'kmValue',
        popupMulti: false,
      },
    },
  },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
