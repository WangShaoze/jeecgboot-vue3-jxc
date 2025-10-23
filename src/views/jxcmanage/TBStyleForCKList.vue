<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" :expandedRowKeys="expandedRowKeys" @expand="handleExpand">
      <!-- 内嵌table区域 begin -->
      <template #expandedRowRender="{ record }">
        <a-tabs tabPosition="top">
          <a-tab-pane tab="货品记录" key="tBGoodsForCK" forceRender>
            <tBGoodsForCKSubTable v-if="expandedRowKeys.includes(record.id)" :id="record.id" />
          </a-tab-pane>
        </a-tabs>
      </template>
      <!-- 内嵌table区域 end -->
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button
          type="primary"
          v-if="hasPermission('user:add')"
          v-auth="'jxcmanage:t_b_style:add'"
          @click="handleAdd"
          preIcon="ant-design:plus-outlined"
        >
          新增
        </a-button>
        <a-button type="primary" v-auth="'jxcmanage:t_b_style:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出 </a-button>
        <a-button type="primary" preIcon="ant-design:heat-map-outlined" @click="showSecurityCode"> 检验安全码 </a-button>
        <a-button type="primary" preIcon="ant-design:search" @click="showSearchItemNumberTrigger"> 查询款号 </a-button>
        <j-upload-button
          type="primary"
          v-if="hasPermission('user:importExcel')"
          v-auth="'jxcmanage:t_b_style:importExcel'"
          preIcon="ant-design:import-outlined"
          @click="onImportXls"
          >导入
        </j-upload-button>
        <!-- 高级查询 -->
        <super-query v-if="hasPermission('user:supe:query')" :config="superQueryConfig" @search="handleSuperQuery" />
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }"></template>
    </BasicTable>
    <!-- 表单区域 -->
    <TBStyleForCKModal @register="registerModal" :defaultFullscreen="true" @success="handleSuccess"></TBStyleForCKModal>
    <a-modal
      v-model:visible="showSecurityCodeModal"
      title="校验安全码"
      :cancel-button-props="{ style: { display: 'none' } }"
      :ok-button-props="{ style: { display: 'none' } }"
    >
      <a-input-search v-model:value="securityCode" placeholder="请输入安全码" enter-button="校验" size="large" @search="judgeSecurityCode" />
    </a-modal>
    <a-modal
      v-model:visible="showSearchItemNumber"
      title="查询款号"
      :cancel-button-props="{ style: { display: 'none' } }"
      :ok-button-props="{ style: { display: 'none' } }"
    >
      <div class="flex flex-col gap-3">
        <!-- 状态选择 -->
        <div class="flex items-center gap-2">
          <span class="w-16 text-gray-600 text-sm">&nbsp;&nbsp;状态：</span>
          <a-select v-model:value="searchForm.status" placeholder="请选择状态" style="width: 160px" allow-clear>
            <a-select-option :value="1">在库</a-select-option>
            <a-select-option :value="2">在途</a-select-option>
            <a-select-option :value="3">已售</a-select-option>
            <a-select-option :value="4">已入柜</a-select-option>
          </a-select>
        </div>

        <!-- 时间输入 -->
        <div class="flex items-center gap-2">
          <span class="w-16 text-gray-600 text-sm">&nbsp;&nbsp;时间：</span>
          <a-input-number v-model:value="searchForm.minutes" :min="1" placeholder="请输入分钟数" style="width: 160px" />
          <span class="text-gray-500 text-sm">分钟以内</span>
        </div>

        <!-- 查询按钮 -->
        <div class="mt-2 text-center">
          <a-button type="primary" @click="searchItemNumberCallback">查询</a-button>
        </div>
        <!-- 查询结果 -->
        <div class="mt-3">
          <span class="text-sm text-gray-600">查询结果：</span>
          <a-textarea v-model:value="searchResult" rows="6" readonly placeholder="查询结果将在此显示..." />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" name="jxcmanage-tBStyleForCK" setup>
  import { ref, reactive, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useModal } from '/@/components/Modal';
  import TBStyleForCKModal from './components/TBStyleForCKModal.vue';
  import TBGoodsForCKSubTable from './subTables/TBGoodsForCKSubTable.vue';
  import { columns, searchFormSchema, superQuerySchema } from './TBStyleForCK.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './TBStyleForCK.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { useUserStore } from '/@/store/modules/user';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { judgeSecurityCodeApi } from './TBGoods.api';

  import { getItemNumberList } from './SpecialFunction.api';

  const showSearchItemNumber = ref(false);
  const searchResult = ref(''); // 显示结果的文本区域内容

  function showSearchItemNumberTrigger() {
    showSearchItemNumber.value = true;
  }

  const searchForm = reactive({
    status: null, // 状态：1未发布,2正在发布,3已发布
    minutes: null, // 时间（分钟）
  });

  async function searchItemNumberCallback() {
    console.log('查询条件：', searchForm);
    // 模拟后端查询逻辑
    console.log('查询条件：', searchForm);

    try {
      const res = await getItemNumberList({
        status: searchForm.status,
        minutes: searchForm.minutes,
      });
      // 模拟返回结果
      // const res = ['A123', 'B456'];
      // 格式化输出到 textarea
      searchResult.value = res.map((item) => `${item}`).join('\n');
    } catch (err) {
      searchResult.value = '查询失败，请检查接口连接。';
    }
  }

  const securityCode = ref('');
  const showSecurityCodeModal = ref(false);

  function showSecurityCode() {
    showSecurityCodeModal.value = true;
  }

  async function judgeSecurityCode() {
    await judgeSecurityCodeApi({ securityCode: securityCode.value });
  }

  const { hasPermission } = usePermission();

  const queryParam = reactive<any>({});
  // 展开key
  const expandedRowKeys = ref<any[]>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '仓库',
      api: list,
      columns,
      canResize: false,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: '仓库',
      url: getExportUrl,
      params: queryParam,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    reload();
  }

  /**
   * 展开事件
   * */
  function handleExpand(expanded, record) {
    expandedRowKeys.value = [];
    if (expanded === true) {
      expandedRowKeys.value.push(record.id);
    }
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
      showFooter: true,
    });
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
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
        auth: 'jxcmanage:t_b_style:edit',
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
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'user:delete',
      },
    ];
  }
</script>

<style lang="less" scoped>
  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .gap-2 {
    gap: 8px;
  }

  .gap-3 {
    gap: 12px;
  }

  .text-sm {
    font-size: 14px;
  }

  :deep(.ant-picker),
  :deep(.ant-input-number) {
    width: 100%;
  }
</style>
