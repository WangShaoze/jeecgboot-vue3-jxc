import { defHttp } from '/@/utils/http/axios';

enum Api {
  getAllStyleCategory = '/jxcmanage/bar/api/getAllStyleCategory',
  getNextLevelData = '/jxcmanage/bar/api/getNextLevelData',
}

/**
 * 获取根成数据接口
 * @param params
 */
export const getAllStyleCategory = (params) => defHttp.get({ url: Api.getAllStyleCategory, params });

/**
 * 获取下一层数据接口
 * @param params
 */
export const getNextLevelData = (params) => defHttp.get({ url: Api.getNextLevelData, params });
