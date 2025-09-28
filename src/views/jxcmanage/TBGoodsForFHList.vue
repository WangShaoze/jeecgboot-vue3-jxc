<template>
  <div class="p-2">
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!--        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined" v-if="mainId != ''"> 新增 </a-button>-->
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" v-if="mainId != ''"> 导出 </a-button>
        <!--        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls" v-if="mainId != ''">导入 </j-upload-button>-->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleOutbound">
                <Icon icon="ant-design:pic-right-outlined"></Icon>
                批量出库
              </a-menu-item>
              <a-menu-item key="2" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }"></template>
    </BasicTable>

    <TBGoodsForFHModal ref="registerModal" @success="handleSuccess" />

    <!-- JPop 弹窗 -->
    <a-modal v-model:visible="isAssignPopupVisible" title="选择子仓账号" @ok="handleOkDeliver" @cancel="handleCancelDeliver">
      <a-form-item v-bind="warehouseId" id="selectWarehouseAccount" name="selectWarehouseAccountName">
        <j-popup
          placeholder="选择子仓账号"
          v-model:value="warehouseFormData.merchantName"
          code="jxc_warehouse_dict"
          :fieldConfig="[
            { source: 'id', target: 'warehouseId' },
            { source: 'merchant_name', target: 'merchantName' },
          ]"
          :multi="false"
          :setFieldsValue="setFieldsValue"
          allow-clear
        />
      </a-form-item>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, unref, inject, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TBGoodsForFHModal from './components/TBGoodsForFHModal.vue';
  import { tBGoodsForFHColumns } from './TBStyleForFH.data';
  import {
    tBGoodsForFHList,
    tBGoodsForFHDelete,
    tBGoodsForFHDeleteBatch,
    tBGoodsForFHExportXlsUrl,
    tBGoodsForFHImportUrl,
    deliverApi,
    batchDeliverApi,
    putIntoClosetApi,
  } from './TBStyleForFH.api';
  import { isEmpty } from '/@/utils/is';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { JPopup } from '@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const emit = defineEmits(['register', 'ok']);

  const isAssignPopupVisible = ref(false);
  const isBatchOutbound = ref(false);
  const warehouseId = ref('');
  const goodsId = ref('');

  const warehouseFormData = reactive({
    warehouseId: '',
    merchantName: '',
  });

  /**
   *  popup组件值改变事件
   */
  function setFieldsValue(map) {
    Object.keys(map).map((key) => {
      warehouseFormData[key] = map[key];
    });
  }

  /**
   * 控制popup窗口的显隐
   */
  function batchHandleOutbound() {
    isAssignPopupVisible.value = true;
    isBatchOutbound.value = true;
  }

  function handleOkDeliver() {
    // 执行分配操作
    isAssignPopupVisible.value = false; // 关闭弹窗

    if (isBatchOutbound.value) {
      // 批量出库
      let params = {
        goodsIds: selectedRowKeys.value.join(','),
        warehouseId: warehouseFormData.warehouseId,
      };
      batchDeliverApi(params)
        .then(async (res) => {
          if (res.success) {
            createMessage.success(res.message);
            emit('ok');
          }
        })
        .finally(() => {
          searchQuery();
          handleCancelDeliver(); // 数据恢复防止下一次操作的时候异常
        });
    } else {
      let params = {
        goodsId: goodsId.value,
        warehouseId: warehouseFormData.warehouseId,
      };
      deliverApi(params)
        .then(async (res) => {
          if (res.success) {
            createMessage.success(res.message);
            emit('ok');
          }
        })
        .finally(() => {
          searchQuery();
          handleCancelDeliver(); // 数据恢复防止下一次操作的时候异常
        });
    }
  }

  function handleCancelDeliver() {
    isAssignPopupVisible.value = false; // 关闭弹窗
    isBatchOutbound.value = false;
    warehouseId.value = '';
    goodsId.value = '';
    warehouseFormData.warehouseId = '';
    warehouseFormData.merchantName = '';
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }

  const toggleSearchStatus = ref<boolean>(false);
  //接收主表id
  const mainId = inject('mainId') || '';
  //提示弹窗
  const $message = useMessage();
  const queryParam = {};
  // 列表页面公共参数、方法
  const { prefixCls, tableContext, onImportXls, onExportXls } = useListPage({
    tableProps: {
      api: tBGoodsForFHList,
      columns: tBGoodsForFHColumns,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 180,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: '货品记录',
      url: tBGoodsForFHExportXlsUrl,
      params: {
        styleId: mainId,
      },
    },
    importConfig: {
      url: () => {
        return tBGoodsForFHImportUrl + '/' + unref(mainId);
      },
    },
  });

  //注册table数据
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  const registerModal = ref();
  const formRef = ref();
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

  /**
   * 新增事件
   */
  function handleAdd() {
    if (isEmpty(unref(mainId))) {
      $message.createMessage.warning('请选择一个主表信息');
      return;
    }
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }

  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }

  /**
   * 详情事件
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await tBGoodsForFHDelete({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await tBGoodsForFHDeleteBatch({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }

  function handleDeliver(record: Recordable) {
    // 显示弹窗
    isAssignPopupVisible.value = true;
    goodsId.value = record.id;
  }

  function handlePutIntoCloset(record: Recordable) {
    // 该库存状态
    putIntoClosetApi({ goodsId: record.id })
      .then(async (res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        }
      })
      .finally(() => {
        searchQuery();
      });
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '入柜',
        onClick: handlePutIntoCloset.bind(null, record),
      },
      {
        label: '去出库',
        onClick: handleDeliver.bind(null, record),
      },
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
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

  watch(mainId, () => {
    queryParam['styleId'] = unref(mainId);
    reload();
  });
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
  }
</style>
