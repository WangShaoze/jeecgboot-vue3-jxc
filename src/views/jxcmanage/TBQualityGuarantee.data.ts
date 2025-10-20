import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户ID',
    align: "center",
    dataIndex: 'customerId'
  },
  {
    title: '质保单单号',
    align: "center",
    dataIndex: 'qualityGuaranteeNo'
  },
  {
    title: '购买人姓名',
    align: "center",
    dataIndex: 'customerName'
  },
  {
    title: '电话号码',
    align: "center",
    dataIndex: 'phone'
  },
  {
    title: '购买人出生日期',
    align: "center",
    dataIndex: 'birthday'
  },
  {
    title: '产品货号',
    align: "center",
    dataIndex: 'productNoList'
  },
  {
    title: '产品货品ID列表',
    align: "center",
    dataIndex: 'goodsIdList'
  },
  {
    title: '对应销售人员',
    align: "center",
    dataIndex: 'salesman'
  },
  {
    title: '购买日期',
    align: "center",
    dataIndex: 'purchaseDate',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
  },
  {
    title: '产品原价',
    align: "center",
    dataIndex: 'originalPrice'
  },
  {
    title: '实际收款金额',
    align: "center",
    dataIndex: 'actualPaid'
  },
  {
    title: '付款方式',
    align: "center",
    dataIndex: 'paymentMethod'
  },
];

// 高级查询数据
export const superQuerySchema = {
  customerId: {title: '客户ID',order: 0,view: 'popup', type: 'string',code: 't_b_customer', orgFields: 'id', destFields: 'customerId', popupMulti: false,},
  qualityGuaranteeNo: {title: '质保单单号',order: 1,view: 'text', type: 'string',},
  customerName: {title: '购买人姓名',order: 2,view: 'popup', type: 'string',code: 't_b_customer', orgFields: 'customer_name', destFields: 'customerName', popupMulti: false,},
  phone: {title: '电话号码',order: 3,view: 'popup', type: 'string',code: 't_b_customer', orgFields: 'phone', destFields: 'phone', popupMulti: false,},
  birthday: {title: '购买人出生日期',order: 4,view: 'popup', type: 'string',code: 't_b_customer', orgFields: 'birthday', destFields: 'birthday', popupMulti: false,},
  productNoList: {title: '产品货号',order: 5,view: 'popup', type: 'string',code: 't_b_goods', orgFields: 'product_no', destFields: 'productNoList', popupMulti: false,},
  goodsIdList: {title: '产品货品ID列表',order: 6,view: 'popup', type: 'string',code: 't_b_goods', orgFields: 'id', destFields: 'goodsIdList', popupMulti: false,},
  salesman: {title: '对应销售人员',order: 7,view: 'text', type: 'string',},
  purchaseDate: {title: '购买日期',order: 8,view: 'date', type: 'string',},
  originalPrice: {title: '产品原价',order: 9,view: 'number', type: 'number',},
  actualPaid: {title: '实际收款金额',order: 10,view: 'number', type: 'number',},
  paymentMethod: {title: '付款方式',order: 11,view: 'text', type: 'string',},
};
