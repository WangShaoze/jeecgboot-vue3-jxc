import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/jxcmanage/tBStyleForFH/list',
  save = '/jxcmanage/tBStyleForFH/add',
  edit = '/jxcmanage/tBStyleForFH/edit',
  deleteOne = '/jxcmanage/tBStyleForFH/delete',
  deleteBatch = '/jxcmanage/tBStyleForFH/deleteBatch',
  importExcel = '/jxcmanage/tBStyleForFH/importExcel',
  exportXls = '/jxcmanage/tBStyleForFH/exportXls',
  tBGoodsForFHList = '/jxcmanage/tBStyleForFH/listTBGoodsForFHByMainId',
  tBGoodsForFHSave = '/jxcmanage/tBStyleForFH/addTBGoodsForFH',
  tBGoodsForFHEdit = '/jxcmanage/tBStyleForFH/editTBGoodsForFH',
  tBGoodsForFHDelete = '/jxcmanage/tBStyleForFH/deleteTBGoodsForFH',
  tBGoodsForFHDeleteBatch = '/jxcmanage/tBStyleForFH/deleteBatchTBGoodsForFH',
  deliverToSonWarehouse = '/jxcmanage/tBStyleForFH/deliverToSonWarehouse',
  batchDeliverToSonWarehouse = '/jxcmanage/tBStyleForFH/batchDeliverToSonWarehouse',
  putIntoCloset = '/jxcmanage/tBStyleForFH/putIntoCloset',
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
export const deliverApi = (params) => defHttp.post({ url: Api.deliverToSonWarehouse, params });
export const batchDeliverApi = (params) =>
  defHttp.post({
    url: Api.batchDeliverToSonWarehouse,
    params,
  });
export const putIntoClosetApi = (params) =>
  defHttp.post(
    {
      url: Api.putIntoCloset,
      params,
    },
    { joinParamsToUrl: true }
  );

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
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 列表接口
 * @param params
 */
export const tBGoodsForFHList = (params) => {
  if (params['styleId']) {
    return defHttp.get({ url: Api.tBGoodsForFHList, params });
  }
  return Promise.resolve({});
};

/**
 * 删除单个
 */
export const tBGoodsForFHDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.tBGoodsForFHDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 */
export const tBGoodsForFHDeleteBatch = (params, handleSuccess) => {
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
            url: Api.tBGoodsForFHDeleteBatch,
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
export const tBGoodsForFHSaveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.tBGoodsForFHEdit : Api.tBGoodsForFHSave;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 导入
 */
export const tBGoodsForFHImportUrl = '/jxcmanage/tBStyleForFH/importTBGoodsForFH';

/**
 * 导出
 */
export const tBGoodsForFHExportXlsUrl = '/jxcmanage/tBStyleForFH/exportTBGoodsForFH';
