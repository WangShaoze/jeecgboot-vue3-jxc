<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" :searchInfo="searchInfo">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!--        <a-button type="primary" @click="handleCreate" preIcon="ant-design:plus-outlined" v-if="mainId != ''"> 新增 </a-button>-->
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" v-if="mainId != ''"> 导出 </a-button>
        <!--        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls" v-if="mainId != ''">导入 </j-upload-button>-->
        <!--        <a-button type="primary" preIcon="ant-design:search-outlined" @click="onExportXls" v-if="mainId != ''"> 查询 </a-button>-->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
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
        <TableAction :actions="getTableAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }"></template>
    </BasicTable>

    <TBGoodsZICModal @register="registerModal" @success="handleSuccess" />
    <!-- JPop 弹窗 -->
    <a-modal v-model:visible="showSelectCustomerVisible" title="请选择发货客户" @ok="handleOkSelectCustomer">
      <a-form-item id="selectCustomer" name="selectCustomerName">
        <j-popup
          placeholder="请选择发货客户"
          v-model:value="customerFormData.id"
          code="jxc_zicang_customer"
          :fieldConfig="[
            { source: 'id', target: 'id' },
            { source: 'customer_name', target: 'customerName' },
          ]"
          :multi="false"
          :setFieldsValue="setSelectCustomerFieldsValue"
          allow-clear
        />
      </a-form-item>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, inject, watch, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useModal } from '/@/components/Modal';
  import TBGoodsZICModal from './components/TBGoodsZICModal.vue';
  import { tBGoodsZICColumns } from './TBStyleForZIC.data';
  import {
    tBGoodsZICList,
    tBGoodsZICDelete,
    tBGoodsZICDeleteBatch,
    confirmReceiveApi,
    zicDeliveryApi,
    tBGoodsZICExportXlsUrl,
    tBGoodsZICImportUrl,
  } from './TBStyleForZIC.api';
  import { isEmpty } from '/@/utils/is';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import JPopup from '../../components/Form/src/jeecg/components/JPopup.vue';

  const showSelectCustomerVisible = ref(false);
  const goodsId = ref('');
  const customerFormData = reactive({
    id: '',
    customerName: '',
  });

  /**
   *  popup组件值改变事件
   */
  function setSelectCustomerFieldsValue(map) {
    Object.keys(map).map((k) => {
      customerFormData[k] = map[k];
    });
  }

  /**
   * 选客户
   * */
  async function handleOkSelectCustomer() {
    showSelectCustomerVisible.value = false;
    // 修改状态
    await zicDeliveryApi(
      {
        goodsId: goodsId.value,
        customerId: customerFormData.id,
      },
      handleSuccess
    );
    handleSuccess();
  }

  //接收主表id
  const mainId = inject('mainId') || '';
  //提示弹窗
  const $message = useMessage();
  //弹窗model
  const [registerModal, { openModal }] = useModal();
  const searchInfo = {};
  // 列表页面公共参数、方法
  const { prefixCls, tableContext, onImportXls, onExportXls } = useListPage({
    tableProps: {
      api: tBGoodsZICList,
      columns: tBGoodsZICColumns,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 180,
        fixed: 'right',
      },
      pagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '20'],
      },
    },
    exportConfig: {
      name: '货品记录',
      url: tBGoodsZICExportXlsUrl,
      params: {
        styleId: mainId,
      },
    },
    importConfig: {
      url: () => {
        return tBGoodsZICImportUrl + '/' + unref(mainId);
      },
    },
  });

  //注册table数据
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  watch(mainId, () => {
    searchInfo['styleId'] = unref(mainId);
    reload();
  });

  /**
   * 新增事件
   */
  function handleCreate() {
    if (isEmpty(unref(mainId))) {
      $message.createMessage.warning('请选择一个主表信息');
      return;
    }
    openModal(true, {
      isUpdate: false,
      showFooter: true,
    });
  }

  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 确认收货
   */
  async function handleConfirmReceive(record: Recordable) {
    // 修改状态
    await confirmReceiveApi({ id: record.id }, handleSuccess);
  }

  /**
   * 发货
   */
  async function handleZicDelivery(record: Recordable) {
    showSelectCustomerVisible.value = true;
    goodsId.value = record.id;
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    // 仅移除，总仓管理员才可以删除
    await tBGoodsZICDelete({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await tBGoodsZICDeleteBatch({ ids: selectedRowKeys.value }, handleSuccess);
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
        label: '确认收货',
        onClick: handleConfirmReceive.bind(null, record),
      },
      {
        label: '发货',
        onClick: handleZicDelivery.bind(null, record),
      },
      {
        label: '移除',
        popConfirm: {
          title: '是否确认移除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
      },
    ];
  }
</script>
