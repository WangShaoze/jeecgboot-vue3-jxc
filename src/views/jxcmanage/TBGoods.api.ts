import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/jxcmanage/tBGoods/list',
  save = '/jxcmanage/tBGoods/add',
  edit = '/jxcmanage/tBGoods/edit',
  deleteOne = '/jxcmanage/tBGoods/delete',
  deleteBatch = '/jxcmanage/tBGoods/deleteBatch',
  //importExcel = '/jxcmanage/tBGoods/importExcel',
  importExcel = '/jxcmanage/tBGoods/importPandianExcel',
  //exportXls = '/jxcmanage/tBGoods/exportXls',
  exportXls = '/jxcmanage/tBGoods/exportPandDianXls',
  inbound = '/jxcmanage/tBGoods/inbound',
  batchInbound = '/jxcmanage/tBGoods/batchInbound',
  selectKm = '/jxcmanage/tBGoods/selectKm',
  batchSelectKm = '/jxcmanage/tBGoods/batchSelectKm',
  updateOriginPrice = '/jxcmanage/tBGoods/updateOriginPrice',
  batchHandleExport = '/jxcmanage/tBGoods/batchHandleExport',
  getBarData = '/jxcmanage/tBGoods/getBarData',
  getMarketPrice = '/jxcmanage/tBGoods/getMarketPrice',
  judgeSecurityCode = '/jxcmanage/tBGoods/judgeSecurityCode',
  goodsOutboundExport = '/jxcmanage/tBGoods/goodsOutboundExport',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
export const getBarDataApi = (params) => defHttp.get({ url: Api.getBarData, params });
export const getMarketPriceApi = () => defHttp.get({ url: Api.getMarketPrice });
export const judgeSecurityCodeApi = (params) => defHttp.get({ url: Api.judgeSecurityCode, params });

/**
 *
 * 入库
 * @param params
 */
export const inboundApi = (params) => defHttp.get({ url: Api.inbound, params });
export const batchInboundApi = (params) => defHttp.get({ url: Api.batchInbound, params });
/**
 * 选择库位
 * */
export const selectKmApi = (params) => defHttp.get({ url: Api.selectKm, params });
export const batchSelectKmApi = (params) => defHttp.get({ url: Api.batchSelectKm, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp
        .delete(
          {
            url: Api.deleteBatch,
            data: params,
          },
          { joinParamsToUrl: true }
        )
        .then(() => {
          handleSuccess();
        });
    },
  });
};

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 批量更新货品成本
 * @param params
 * @param handleSuccess
 */
export const updateOriginPriceApi = (params, handleSuccess) => {
  return defHttp.post({ url: Api.updateOriginPrice, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

export const batchHandleExportApi = (params) => {
  /**
   * 批量导出
   * @param params
   */
  return defHttp.post({ url: Api.batchHandleExport, params });
};

/**
 * 批量更新货品成本
 * @param params
 * @param handleSuccess
 */
export const goodsOutboundExportApi = (params) => {
  return defHttp.post({ url: Api.goodsOutboundExport, params });
};
