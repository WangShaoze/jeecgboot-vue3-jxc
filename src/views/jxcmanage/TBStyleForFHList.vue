<template>
  <div class="p-2 erpNativeList">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="reload" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="newStyleNo">
              <template #label><span title="款号">款号</span></template>
              <JInput v-model:value="queryParam.newStyleNo" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="itemName">
              <template #label><span title="款式名称">款式名称</span></template>
              <JInput v-model:value="queryParam.itemName" />
            </a-form-item>
          </a-col>
          <!--          <template v-if="toggleSearchStatus">-->
          <!--            <a-col :lg="6">-->
          <!--              <a-form-item name="customAccount">-->
          <!--                <template #label><span title="客户">客户</span></template>-->
          <!--                <JInput v-model:value="queryParam.customAccount" />-->
          <!--              </a-form-item>-->
          <!--            </a-col>-->
          <!--          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="reload">查询</a-button>
                <a-button preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="content">
      <!--引用表格-->
      <BasicTable @register="registerTable" :rowSelection="rowSelection">
        <!--插槽:table标题-->
        <template #tableTitle>
          <!--          <a-button type="primary" v-auth="'jxcmanage:t_b_style:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增 </a-button>-->
<!--          <a-button type="primary" v-auth="'jxcmanage:t_b_style:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls">-->
<!--            导出-->
<!--          </a-button>-->
          <a-button type="primary" preIcon="ant-design:heat-map-outlined" @click="showSecurityCode"> 检验安全码 </a-button>
          <a-button type="primary" preIcon="ant-design:search" @click="showSearchItemNumberTrigger"> 查询款号 </a-button>
          <a-button type="primary" preIcon="ant-design:pic-right-outlined" @click="batchOutbound"> 批量出库 </a-button>
          <a-button type="primary" preIcon="ant-design:export-outlined" @click="batchGoodsOutboundExport"> 出货导出 </a-button>
          <!--          <j-upload-button type="primary" v-auth="'jxcmanage:t_b_style:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls"-->
          <!--            >导入-->
          <!--          </j-upload-button>-->
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="batchHandleDelete">
                  <Icon icon="ant-design:delete-outlined"></Icon>
                  删除
                </a-menu-item>
              </a-menu>
            </template>
            <a-button v-auth="'jxcmanage:t_b_style:deleteBatch'"
              >批量操作
              <Icon icon="mdi:chevron-down"></Icon>
            </a-button>
          </a-dropdown>
          <!-- 高级查询 -->
          <!--          <super-query :config="superQueryConfig" @search="handleSuperQuery" />-->
        </template>
        <!--操作栏-->
        <template #action="{ record }">
          <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
        </template>
        <!--字段回显插槽-->
        <template v-slot:bodyCell="{ column, record, index, text }"></template>
      </BasicTable>
      <!--子表表格tab-->
      <a-tabs defaultActiveKey="1" style="margin: 10px">
        <a-tab-pane tab="货品记录" key="1">
          <TBGoodsForFHList />
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- 表单区域 -->
    <TBStyleForFHModal ref="registerModal" @success="handleSuccess" />
  </div>
  <!-- JPop 弹窗 -->
  <a-modal v-model:visible="showBatchFenHuo" title="选择子仓和货品" @ok="handleOkBatchOutbound" @cancel="handleCancelBatchOutbound">
    <a-form-item v-bind="warehouseId" id="selectWarehouseAccount" name="selectWarehouseAccountName">
      <j-popup
        spliter="子仓账号"
        placeholder="选择子仓账号"
        v-model:value="warehouseFormData.merchantName"
        code="jxc_warehouse_dict"
        :fieldConfig="[
          { source: 'id', target: 'warehouseId' },
          { source: 'merchant_name', target: 'merchantName' },
        ]"
        :multi="false"
        :setFieldsValue="setWarehouseFieldsValue"
        allow-clear
      />
    </a-form-item>
    <a-form-item v-bind="goodsId" id="selectGoods" name="selectGoodsName">
      <j-popup
        spliter="货品-货号列表"
        placeholder="选择货品"
        v-model:value="goodsFormData.productNos"
        code="jxc_uncoming_outbound_status"
        :fieldConfig="[
          { source: 'id', target: 'goodsIds' },
          { source: 'product_no', target: 'productNos' },
        ]"
        :multi="true"
        :setFieldsValue="setGoodsFieldsValue"
        allow-clear
      />
    </a-form-item>
  </a-modal>
  <a-modal
    v-model:visible="showSecurityCodeModal"
    title="校验安全码"
    :cancel-button-props="{ style: { display: 'none' } }"
    :ok-button-props="{ style: { display: 'none' } }"
  >
    <a-input-search v-model:value="securityCode" placeholder="请输入安全码" enter-button="校验" size="large" @search="judgeSecurityCode" />
  </a-modal>
  <!-- JPop 弹窗 ==》 出货导出 -->
  <a-modal
    v-model:visible="showGoodsOutboundExportModal"
    title="选择需要导出的货品"
    @ok="handleOkGoodsOutboundExport"
    @cancel="handleCancelGoodsOutboundExport"
  >
    <a-form-item v-bind="goodsId" id="selectGoodsOutboundExport" name="selectGoodsOutboundExportName">
      <j-popup
        spliter="货品-货号列表"
        placeholder="选择货品"
        v-model:value="goodsOutboundExportFormData.productNos"
        code="jxc_outbound_goods_export"
        :fieldConfig="[
          { source: 'id', target: 'goodsIds' },
          { source: 'product_no', target: 'productNos' },
        ]"
        :multi="true"
        :setFieldsValue="setGoodsOutboundExportFieldsValue"
        allow-clear
      />
    </a-form-item>
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
</template>

<script lang="ts" name="jxcmanage-tBStyleForFH" setup>
  import { ref, reactive, computed, unref, provide } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TBStyleForFHModal from './components/TBStyleForFHModal.vue';
  import { columns, superQuerySchema } from './TBStyleForFH.data';
  import { list, deleteOne, batchDelete, getImportUrl, /*getExportUrl,*/ batchDeliverApi } from './TBStyleForFH.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import JInput from '/@/components/Form/src/jeecg/components/JInput.vue';
  import TBGoodsForFHList from './TBGoodsForFHList.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { JPopup } from '@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { judgeSecurityCodeApi, goodsOutboundExportApi } from './TBGoods.api';
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

  const showGoodsOutboundExportModal = ref(false);

  const goodsOutboundExportFormData = reactive({
    goodsIds: '',
    productNos: '',
  });

  // 出货导出
  function batchGoodsOutboundExport() {
    showGoodsOutboundExportModal.value = true;
  }

  async function handleOkGoodsOutboundExport() {
    showGoodsOutboundExportModal.value = false;
    await goodsOutboundExportApi({ goodsIds: goodsOutboundExportFormData.goodsIds }).then((res) => {
      // 返回excel连接，下载Excel文件
      downloadFile(res);
    });
    //downloadFile('http://192.168.47.134:9000/jeecg/jxc_import_excel/导入盘点-导入_be7uhI_2025年09月29日10时26分30秒.xlsx');
  }

  function handleCancelGoodsOutboundExport() {
    showGoodsOutboundExportModal.value = false;
    goodsOutboundExportFormData.goodsIds = '';
    goodsOutboundExportFormData.productNos = '';
  }

  /**
   *  popup组件值改变事件
   */
  function setGoodsOutboundExportFieldsValue(map) {
    Object.keys(map).map((key) => {
      goodsOutboundExportFormData[key] = map[key];
    });
  }

  const securityCode = ref('');
  const showSecurityCodeModal = ref(false);

  function showSecurityCode() {
    showSecurityCodeModal.value = true;
  }

  async function judgeSecurityCode() {
    await judgeSecurityCodeApi({ securityCode: securityCode.value });
  }

  const { createMessage } = useMessage();
  const emit = defineEmits(['register', 'ok']);

  const showBatchFenHuo = ref(false);
  const warehouseId = ref('');
  const goodsId = ref('');

  const warehouseFormData = reactive({
    warehouseId: '',
    merchantName: '',
  });

  const goodsFormData = reactive({
    goodsIds: '',
    productNos: '',
  });

  /**
   *  popup组件值改变事件
   */
  function setWarehouseFieldsValue(map) {
    Object.keys(map).map((key) => {
      warehouseFormData[key] = map[key];
    });
  }

  /**
   *  popup组件值改变事件
   */
  function setGoodsFieldsValue(map) {
    Object.keys(map).map((key) => {
      goodsFormData[key] = map[key];
    });
  }

  function batchOutbound() {
    showBatchFenHuo.value = true;
  }

  function handleOkBatchOutbound() {
    // 执行分配操作
    showBatchFenHuo.value = false; // 关闭弹窗
    // 获取已选择的子仓ID和货品记录ID
    // 批量出库
    let params = {
      goodsIds: goodsFormData.goodsIds,
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
        handleCancelBatchOutbound(); // 数据恢复防止下一次操作的时候异常
      });
  }

  function handleCancelBatchOutbound() {
    // 执行分配操作
    showBatchFenHuo.value = false; // 关闭弹窗
    warehouseId.value = '';
    goodsId.value = '';
    warehouseFormData.warehouseId = '';
    warehouseFormData.merchantName = '';
    goodsFormData.goodsIds = '';
    goodsFormData.productNos = '';
  }

  const formRef = ref();
  const queryParam = reactive<any>({});
  const checkedKeys = ref<Array<string | number>>([]);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, /*onImportXls*/ } = useListPage({
    tableProps: {
      title: '分货',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      clickToRowSelect: true,
      rowSelection: { type: 'radio' },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
      pagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '20'],
      },
    },
    /*exportConfig: {
      name: '分货',
      url: getExportUrl,
      params: queryParam,
    },*/
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  const mainId = computed(() => (unref(selectedRowKeys).length > 0 ? unref(selectedRowKeys)[0] : ''));
  //下发 mainId,子组件接收
  provide('mainId', mainId);

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
        auth: 'jxcmanage:t_b_style:delete',
      },
    ];
  }

  /* ----------------------以下为原生查询需要添加的-------------------------- */
  const toggleSearchStatus = ref<boolean>(false);
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
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
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

  .erpNativeList {
    height: 100%;

    .content {
      background-color: #fff;
      height: 100%;
    }
  }
</style>
