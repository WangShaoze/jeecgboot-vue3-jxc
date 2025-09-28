import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/jxcmanage/tBStyleForZIC/list',
  save = '/jxcmanage/tBStyleForZIC/add',
  edit = '/jxcmanage/tBStyleForZIC/edit',
  deleteOne = '/jxcmanage/tBStyleForZIC/delete',
  deleteBatch = '/jxcmanage/tBStyleForZIC/deleteBatch',
  importExcel = '/jxcmanage/tBStyleForZIC/importExcel',
  exportXls = '/jxcmanage/tBStyleForZIC/exportXls',
  tBGoodsZICList = '/jxcmanage/tBStyleForZIC/listTBGoodsZICByMainId',
  tBGoodsZICSave = '/jxcmanage/tBStyleForZIC/addTBGoodsZIC',
  tBGoodsZICEdit = '/jxcmanage/tBStyleForZIC/editTBGoodsZIC',
  tBGoodsZICDelete = '/jxcmanage/tBStyleForZIC/deleteTBGoodsZIC',
  tBGoodsZICDeleteBatch = '/jxcmanage/tBStyleForZIC/deleteBatchTBGoodsZIC',
  confirmReceive = '/jxcmanage/tBStyleForZIC/confirmReceive',
  zicDelivery = '/jxcmanage/tBStyleForZIC/zicDelivery',
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

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
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
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 列表接口
 * @param params
 */
export const tBGoodsZICList = (params) => {
  if (params['styleId']) {
    return defHttp.get({ url: Api.tBGoodsZICList, params });
  }
  return Promise.resolve({});
};

/**
 * 删除单个
 */
export const tBGoodsZICDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.tBGoodsZICDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 确认收货
 * */
export const confirmReceiveApi = (params, handleSuccess) => {
  return defHttp.get({ url: Api.confirmReceive, params }).then(() => {
    handleSuccess();
  });
};
/**
 * 发货
 * */
export const zicDeliveryApi = (params, handleSuccess) => {
  return defHttp.get({ url: Api.zicDelivery, params }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 */
export const tBGoodsZICDeleteBatch = (params, handleSuccess) => {
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
            url: Api.tBGoodsZICDeleteBatch,
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
 */
export const tBGoodsZICSaveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.tBGoodsZICEdit : Api.tBGoodsZICSave;
  return defHttp.post({ url: url, params });
};
/**
 * 导入
 */
export const tBGoodsZICImportUrl = '/jxcmanage/tBStyleForZIC/importTBGoodsZIC';

/**
 * 导出
 */
export const tBGoodsZICExportXlsUrl = '/jxcmanage/tBStyleForZIC/exportTBGoodsZIC';
