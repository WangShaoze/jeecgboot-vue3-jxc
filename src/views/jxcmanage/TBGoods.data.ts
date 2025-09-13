import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
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
    dataIndex: 'styleNo',
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
    dataIndex: 'newStyleNo',
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
  /*{
    title: '原价',
    align: 'center',
    dataIndex: 'originalPrice',
  },
  {
    title: '参考售价',
    align: 'center',
    dataIndex: 'referenceSellingPrice',
  },*/
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
  /*{
    title: '销售状态',
    align: 'center',
    dataIndex: 'salesStatus_dictText',
  },*/
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remarks',
  },
  /*{
    title: '库码ID',
    align: 'center',
    dataIndex: 'kmId',
  },*/
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
  styleNo: { title: '款号', order: 3, view: 'text', type: 'string' },
  styleCategory: { title: '款式类别', order: 4, view: 'text', type: 'string' },
  productNo: { title: '货号', order: 5, view: 'text', type: 'string' },
  newStyleNo: { title: '客户款号', order: 6, view: 'text', type: 'string' },
  itemName: { title: '客胚名称', order: 7, view: 'text', type: 'string' },
  silverWeight: { title: '银重', order: 8, view: 'number', type: 'number' },
  goldWeight: { title: '金重', order: 9, view: 'number', type: 'number' },
  totalWeight: { title: '总重', order: 10, view: 'number', type: 'number' },
  certificateNo: { title: '证书编号', order: 11, view: 'text', type: 'string' },
  certificateOrg: { title: '证书机构', order: 12, view: 'text', type: 'string' },
  seal: { title: '字印', order: 13, view: 'text', type: 'string' },
  queryUrl: { title: '查询地址', order: 14, view: 'text', type: 'string' },
  sequenceNo: { title: '序号', order: 15, view: 'number', type: 'number' },
  originalPrice: { title: '原价', order: 16, view: 'number', type: 'number' },
  referenceSellingPrice: { title: '参考售价', order: 17, view: 'number', type: 'number' },
  status: {
    title: '状态（合/残）',
    order: 18,
    view: 'radio',
    type: 'string',
    dictCode: 'jxc_pandian_status',
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
};
