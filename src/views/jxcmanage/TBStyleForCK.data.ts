import { BasicColumn, FormSchema } from '/@/components/Table';
import { JVxeColumn, JVxeTypes } from '/@/components/jeecg/JVxeTable/types';
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
  {
    title: '金工费',
    align: 'center',
    dataIndex: 'goldProcessFee',
  },
  {
    title: '银工费/g',
    align: 'center',
    dataIndex: 'sliverProcessFeeEachGram',
  },
  {
    title: '银工费/件',
    align: 'center',
    dataIndex: 'sliverProcessFeeEachPiece',
  },
  {
    title: '证书费',
    align: 'center',
    dataIndex: 'certificateFee',
  },
  {
    title: '辅料费',
    align: 'center',
    dataIndex: 'auxiliaryMaterialFee',
  },
  {
    title: '成本克工费',
    align: 'center',
    dataIndex: 'costWorkFeeEachGram',
  },
  {
    title: '成本件工费',
    align: 'center',
    dataIndex: 'costWorkFeeEachPiece',
  },
  {
    title: '经销克工费',
    align: 'center',
    dataIndex: 'distributorWorkFeeEachGram',
  },
  {
    title: '经销件工费',
    align: 'center',
    dataIndex: 'distributorWorkFeeEachPiece',
  },
  {
    title: '零售克工费',
    align: 'center',
    dataIndex: 'retailWorkFeeEachGram',
  },
  {
    title: '零售件工费',
    align: 'center',
    dataIndex: 'retailWorkFeeEachPiece',
  },
  {
    title: '是否一口价',
    align: 'center',
    dataIndex: 'isFixedPrice',
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
  {
    label: '金工费',
    field: 'goldProcessFee',
    component: 'InputNumber',
  },
  {
    label: '银工费/g',
    field: 'sliverProcessFeeEachGram',
    component: 'InputNumber',
  },
  {
    label: '银工费/件',
    field: 'sliverProcessFeeEachPiece',
    component: 'InputNumber',
  },
  {
    label: '证书费',
    field: 'certificateFee',
    component: 'InputNumber',
  },
  {
    label: '辅料费',
    field: 'auxiliaryMaterialFee',
    component: 'InputNumber',
  },
  {
    label: '成本克工费',
    field: 'costWorkFeeEachGram',
    component: 'InputNumber',
  },
  {
    label: '成本件工费',
    field: 'costWorkFeeEachPiece',
    component: 'InputNumber',
  },
  {
    label: '经销克工费',
    field: 'distributorWorkFeeEachGram',
    component: 'InputNumber',
  },
  {
    label: '经销件工费',
    field: 'distributorWorkFeeEachPiece',
    component: 'InputNumber',
  },
  {
    label: '零售克工费',
    field: 'retailWorkFeeEachGram',
    component: 'InputNumber',
  },
  {
    label: '零售件工费',
    field: 'retailWorkFeeEachPiece',
    component: 'InputNumber',
  },
  {
    label: '是否一口价',
    field: 'isFixedPrice',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_isFixedPrice_dict',
      type: 'list',
    },
  },
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
    title: '成本',
    align: 'center',
    dataIndex: 'goodsCost',
  },
  {
    title: '金成本大盘',
    align: 'center',
    dataIndex: 'goldCostMarketPrice',
  },
  {
    title: '银成本大盘',
    align: 'center',
    dataIndex: 'sliverCostMarketPrice',
  },
  {
    title: '参考售价(经销)',
    align: 'center',
    dataIndex: 'distributorReferenceSellingPrice',
  },
  // {
  //   title: '零售单克工费',
  //   align: 'center',
  //   dataIndex: 'retailWorkFeeEachGram',
  // },
  // {
  //   title: '参考零售价',
  //   align: 'center',
  //   dataIndex: 'retailReferenceSellingPrice',
  // },
  {
    title: '参考零售价(零售单克工费)',
    align: 'center',
    dataIndex: 'retailSellingPriceAndWorkFeeEachGram',
    width: 220,
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
    title: '款号',
    key: 'newStyleNo',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '客户款号',
    key: 'customerStyleNo',
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
    title: '金成本大盘',
    key: 'goldCostMarketPrice',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
  },
  {
    title: '银成本大盘',
    key: 'sliverCostMarketPrice',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
  },
  {
    title: '成本',
    key: 'goodsCost',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '参考售价(经销)',
    key: 'distributorReferenceSellingPrice',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '参考零售价(零售单克工费)',
    key: 'retailSellingPriceAndWorkFeeEachGram',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
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
  newStyleNo: { title: '款号', order: 0, view: 'text', type: 'string' },
  itemName: { title: '款式名称', order: 1, view: 'text', type: 'string' },
  //子表高级查询
  tBGoodsForCK: {
    title: '货品记录',
    view: 'table',
    fields: {
      styleCategory: { title: '款式类别', order: 0, view: 'text', type: 'string' },
      productNo: { title: '货号', order: 1, view: 'text', type: 'string' },
      itemName: { title: '客胚名称', order: 3, view: 'text', type: 'string' },
      silverWeight: { title: '银重', order: 4, view: 'number', type: 'number' },
      goldWeight: { title: '金重', order: 5, view: 'number', type: 'number' },
      totalWeight: { title: '总重', order: 6, view: 'number', type: 'number' },
      certificateNo: { title: '证书编号', order: 7, view: 'text', type: 'string' },
      goodsCost: { title: '成本', order: 12, view: 'number', type: 'number' },
      distributorReferenceSellingPrice: {
        title: '参考售价(经销)',
        order: 13,
        view: 'number',
        type: 'number',
      },
      retailReferenceSellingPrice: {
        title: '参考零售价',
        order: 14,
        view: 'number',
        type: 'number',
      },
      inboundStatus: {
        title: '库存状态',
        order: 16,
        view: 'radio',
        type: 'string',
        dictCode: 'jxc_inbound_status',
      },
      salesStatus: {
        title: '销售状态',
        order: 17,
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
      goldCostMarketPrice: { title: '金成本大盘', order: 19, view: 'number', type: 'number' },
      sliverCostMarketPrice: { title: '银成本大盘', order: 20, view: 'number', type: 'number' },
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
