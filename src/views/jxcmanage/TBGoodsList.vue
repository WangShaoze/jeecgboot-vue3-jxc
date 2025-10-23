<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="3">
            <a-form-item name="styleNo">
              <template #label><span title="款号">款号</span></template>
              <JInput v-model:value="queryParam.newStyleNo" />
            </a-form-item>
          </a-col>
          <a-col :lg="3">
            <a-form-item name="productNo">
              <template #label><span title="货号">货号</span></template>
              <JInput v-model:value="queryParam.productNo" />
            </a-form-item>
          </a-col>
          <a-col :lg="4">
            <a-form-item name="kmValue">
              <template #label><span title="库位号">库位号</span></template>
              <j-popup
                placeholder="请选择库位号"
                v-model:value="queryParam.kmValue"
                code="jxc_select_km"
                :fieldConfig="[
                  { source: 'km', target: 'kmValue' },
                  { source: 'id', target: 'kmId' },
                ]"
                :multi="true"
                :setFieldsValue="setFieldsValue"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="orderNo">
                <template #label><span title="订单号">订单号</span></template>
                <JInput v-model:value="queryParam.orderNo" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="salesOrderNo">
                <template #label><span title="销售单号">销售单号</span></template>
                <JInput v-model:value="queryParam.salesOrderNo" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="salesDate">
                <template #label><span title="销售日期">销售日期</span></template>
                <a-range-picker showTime value-format="YYYY-MM-DD HH:mm:ss" v-model:value="queryParam.salesDate" class="query-group-cust" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                <a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
                </a>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <j-upload-button type="primary" v-auth="'jxcmanage:t_b_goods:importPandianExcel'" preIcon="ant-design:import-outlined" @click="onImportXls"
          >导入
        </j-upload-button>
        <a-button type="primary" preIcon="ant-design:retweet-outlined" @click="batchHandleUpdateOriginPrice">全表货品成本更新 </a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="2" @click="batchHandleSelectKm">
                <Icon icon="ant-design:inbox-outlined"></Icon>
                批量入库
              </a-menu-item>
              <a-menu-item key="3" @click="batchHandleUpdateOriginPrice">
                <Icon icon="ant-design:retweet-outlined"></Icon>
                批量更新货品成本
              </a-menu-item>
              <a-menu-item key="4" @click="batchHandleExport">
                <Icon icon="ant-design:export-outlined"></Icon>
                批量导出
              </a-menu-item>
              <a-menu-item key="5" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'jxcmanage:t_b_goods:deleteBatch'"
            >批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }"></template>
    </BasicTable>
    <!-- 表单区域 -->
    <TBGoodsModal ref="registerModal" @success="handleSuccess"></TBGoodsModal>
    <!-- JPop 弹窗 -->
    <a-modal v-model:visible="showSelectKm" title="请选择库码" @ok="handleOkSelectKm">
      <a-form-item id="selectKm" name="selectKmName">
        <j-popup
          placeholder="请选择库码"
          v-model:value="kmFormData.kmValue"
          code="jxc_select_km"
          :fieldConfig="[
            { source: 'id', target: 'kmId' },
            { source: 'km', target: 'kmValue' },
          ]"
          :multi="false"
          :setFieldsValue="setSelectKmFieldsValue"
          allow-clear
        />
      </a-form-item>
    </a-modal>
  </div>
</template>

<script lang="ts" name="jxcmanage-tBGoods" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './TBGoods.data';
  import {
    list,
    deleteOne,
    batchDelete,
    getImportUrl,
    getExportUrl,
    inboundApi,
    batchInboundApi,
    selectKmApi,
    batchSelectKmApi,
    updateOriginPriceApi,
    batchHandleExportApi,
  } from './TBGoods.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import TBGoodsModal from './components/TBGoodsModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import JInput from '/@/components/Form/src/jeecg/components/JInput.vue';
  import { cloneDeep } from 'lodash-es';

  const formRef = ref();
  const showSelectKm = ref(false);
  const isBatchSelectKm = ref(false);
  const kmFormData = reactive({
    kmId: '',
    kmValue: '',
  });
  const recordId = ref('');
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '盘点',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        let rangerQuery = await setRangeQuery();
        return Object.assign(params, rangerQuery);
      },
    },
    // exportConfig: {
    //   name: '盘点',
    //   url: getExportUrl,
    //   params: setRangeQuery,
    // },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] =
    tableContext;
  const labelCol = reactive({
    xs: 24,
    sm: 4,
    xl: 6,
    xxl: 4,
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    searchQuery();
  }

  /**
   * batchHandleUpdateOriginPrice
   * */
  async function batchHandleUpdateOriginPrice() {
    await updateOriginPriceApi({ goodIds: selectedRowKeys.value.join(',') }, handleSuccess);
  }

  /**
   * 批量导出
   * */
  async function batchHandleExport() {
    await batchHandleExportApi({ goodsIds: selectedRowKeys.value.join(',') }).then((res) => {
      downloadFile(res); // 下载文件
    });
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }

  /**
   *  popup组件值改变事件
   */
  function setSelectKmFieldsValue(map) {
    Object.keys(map).map((k) => {
      kmFormData[k] = map[k];
    });
  }

  /**
   * 选库位
   * */
  function handleSelectKm(record) {
    showSelectKm.value = true;
    recordId.value = record.id;
    kmFormData.kmId = record.kmId;
    kmFormData.kmValue = record.kmValue;
  }

  /**
   * 选库位
   * */
  async function handleOkSelectKm() {
    showSelectKm.value = false;
    if (isBatchSelectKm.value === true) {
      await batchHandleOkSelectKm();
      isBatchSelectKm.value = false;
      return;
    }
    await selectKmApi({
      id: recordId.value,
      kmId: kmFormData.kmId,
    });
    handleInbound();
    handleSuccess();
  }

  /**
   * 入库
   * */
  async function handleInbound(record) {
    console.log(record.id);
    await inboundApi({ id: record.id });
    handleSuccess();
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 批量选库位
   */
  function batchHandleSelectKm() {
    isBatchSelectKm.value = true;
    showSelectKm.value = true;
    kmFormData.kmId = '';
    kmFormData.kmValue = '';
  }

  /**
   * 批量选库位
   */
  async function batchHandleOkSelectKm() {
    showSelectKm.value = false;
    let ids = selectedRowKeys.value.join(',');
    /*console.log(ids);
console.log(kmFormData.kmId);*/
    await batchSelectKmApi({
      ids: ids,
      kmId: kmFormData.kmId,
    });
    batchHandleInbound();
    handleSuccess();
  }

  /**
   * 批量入库
   */
  async function batchHandleInbound() {
    let ids = selectedRowKeys.value.join(',');
    console.log(ids);
    await batchInboundApi({
      ids: ids,
    });
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * onExportXlsx 自定义导出按钮
   * 导出 excel 表格数据
   * */
  async function onExportXlsx() {
    const selectRowArr = tableContext[2].selectedRowKeys.value.join(',');
    try {
      // 准备请求头参数
      const headers = new Headers();
      headers.append('x-access-token', userStore.getToken); // 添加认证令牌
      headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // 指定接受的响应类型

      const response = await fetch(`/jeecgboot${getExportUrl}?selectRowArr=${encodeURIComponent(selectRowArr)}`, {
        method: 'GET', // 请求方法
        headers: headers, // 添加请求头
        credentials: 'include', // 如需携带Cookie，添加此配置
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      // 获取图片的Blob数据
      const blob = await response.blob();

      // 解析文件名
      const disposition = response.headers.get('Content-Disposition');
      let filename = '盘点货品导出表.xlsx';
      if (disposition) {
        const utf8Match = disposition.match(/filename\*=utf-8''(.+)/i);
        if (utf8Match && utf8Match[1]) {
          filename = decodeURIComponent(utf8Match[1]);
        } else {
          const match = disposition.match(/filename[^;=\n]*=([^;\n]*)/i);
          if (match && match[1]) {
            filename = match[1].replace(/['"]/g, '');
          }
        }
      }
      filename = decodeURIComponent(filename.replace('.xlsx', '')) + '.xlsx';

      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // 设置文件名
      a.download = filename;
      // 触发点击
      document.body.appendChild(a);
      a.click();
      // 清理
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载失败:', error);
    }
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'jxcmanage:t_b_goods:edit',
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '入库',
        onClick: handleSelectKm.bind(null, record),
      },
      /*{
label: '入库',
onClick: handleInbound.bind(null, record),
},*/
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'jxcmanage:t_b_goods:delete',
      },
    ];
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }

  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }

  /**
   *  popup组件值改变事件
   */
  function setFieldsValue(map) {
    Object.keys(map).map((key) => {
      queryParam[key] = map[key];
    });
  }

  let rangeField = 'salesDate,';

  /**
   * 设置范围查询条件
   */
  async function setRangeQuery() {
    let queryParamClone = cloneDeep(queryParam);
    if (rangeField) {
      let fieldsValue = rangeField.split(',');
      fieldsValue.forEach((item) => {
        if (queryParamClone[item]) {
          let range = queryParamClone[item];
          queryParamClone[item + '_begin'] = range[0];
          queryParamClone[item + '_end'] = range[1];
          delete queryParamClone[item];
        } else {
          queryParamClone[item + '_begin'] = '';
          queryParamClone[item + '_end'] = '';
        }
      });
    }
    return queryParamClone;
  }
</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;

    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }

    .query-group-cust {
      min-width: 100px !important;
    }

    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
    }

    .ant-form-item:not(.ant-form-item-with-help) {
      margin-bottom: 16px;
      height: 32px;
    }

    :deep(.ant-picker),
    :deep(.ant-input-number) {
      width: 100%;
    }
  }
</style>
