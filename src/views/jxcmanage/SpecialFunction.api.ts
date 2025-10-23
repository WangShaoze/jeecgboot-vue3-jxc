import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  getItemNumberList = '/jxcmanage/specialFunction/api/getItemNumberList',
}

/**
 * 列表接口
 * @param params
 */
export const getItemNumberList = (params) => defHttp.get({ url: Api.getItemNumberList, params });
