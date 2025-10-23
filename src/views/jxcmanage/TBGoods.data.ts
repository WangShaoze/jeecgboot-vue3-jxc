import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '供应商款号',
    align: 'center',
    dataIndex: 'supplierStyleNo',
  },
  {
    title: '销售单号',
    align: 'center',
    dataIndex: 'salesOrderNo',
  },
  {
    title: '销售日期',
    align: 'center',
    dataIndex: 'salesDate',
  },
  {
    title: '订单号',
    align: 'center',
    dataIndex: 'orderNo',
  },
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
    title: '货号',
    align: 'center',
    dataIndex: 'productNo',
  },
  {
    title: '客户款号',
    align: 'center',
    dataIndex: 'customerStyleNo',
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
    title: '是否一口价',
    align: 'center',
    dataIndex: 'isFixedPrice_dictText',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remarks',
  },
  {
    title: '库存状态',
    align: 'center',
    dataIndex: 'inboundStatus_dictText',
  },

  {
    title: '库位号',
    align: 'center',
    dataIndex: 'kmValue',
  },
];

// 高级查询数据
export const superQuerySchema = {
  salesOrderNo: { title: '销售单号', order: 0, view: 'text', type: 'string' },
  salesDate: { title: '销售日期', order: 1, view: 'datetime', type: 'string' },
  orderNo: { title: '订单号', order: 2, view: 'text', type: 'string' },
  newStyleNo: { title: '款号', order: 3, view: 'text', type: 'string' },
  styleCategory: { title: '款式类别', order: 4, view: 'text', type: 'string' },
  productNo: { title: '货号', order: 5, view: 'text', type: 'string' },
  customerStyleNo: { title: '客户款号', order: 6, view: 'text', type: 'string' },
  itemName: { title: '客胚名称', order: 7, view: 'text', type: 'string' },
  silverWeight: { title: '银重', order: 8, view: 'number', type: 'number' },
  goldWeight: { title: '金重', order: 9, view: 'number', type: 'number' },
  totalWeight: { title: '总重', order: 10, view: 'number', type: 'number' },
  certificateNo: { title: '证书编号', order: 11, view: 'text', type: 'string' },
  isFixedPrice: {
    title: '是否一口价',
    order: 17,
    view: 'list',
    type: 'string',
    dictCode: 'jxc_isFixedPrice_dict',
  },
  inboundStatus: {
    title: '库存状态',
    order: 19,
    view: 'radio',
    type: 'string',
    dictCode: 'jxc_inbound_status',
  },
  salesStatus: {
    title: '销售状态',
    order: 20,
    view: 'radio',
    type: 'string',
    dictCode: 'jxc_sales_status',
  },
  remarks: { title: '备注', order: 21, view: 'text', type: 'string' },
  kmId: {
    title: '库码ID',
    order: 22,
    view: 'popup',
    type: 'string',
    code: 'jxc_select_km',
    orgFields: 'id',
    destFields: 'kmId',
    popupMulti: false,
  },
  kmValue: {
    title: '库位号',
    order: 23,
    view: 'popup',
    type: 'string',
    code: 'jxc_select_km',
    orgFields: 'km',
    destFields: 'kmValue',
    popupMulti: false,
  },
  supplierStyleNo: {
    title: '款号',
    order: 24,
    view: 'text',
    type: 'string',
  },
};
