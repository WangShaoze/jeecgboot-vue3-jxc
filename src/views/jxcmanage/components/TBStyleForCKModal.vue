<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="896" @ok="handleSubmit">
    <BasicForm @register="registerForm" ref="formRef" name="TBStyleForCKForm" />
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="货品记录" key="tBGoodsForCK" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="tBGoodsForCK"
          :loading="tBGoodsForCKTable.loading"
          :columns="tBGoodsForCKTable.columns"
          :dataSource="tBGoodsForCKTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
          :toolbar-config="toolbarConfig"
        />
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { JVxeTable } from '/@/components/jeecg/JVxeTable';
  import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts';
  import { formSchema, tBGoodsForCKJVxeColumns } from '../TBStyleForCK.data';
  import { saveOrUpdate, queryTBGoodsForCK } from '../TBStyleForCK.api';
  import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const formDisabled = ref(true);
  const refKeys = ref(['tBGoodsForCK']);
  const activeKey = ref('tBGoodsForCK');
  const tBGoodsForCK = ref();
  const tableRefs = { tBGoodsForCK };
  const tBGoodsForCKTable = reactive({
    loading: false,
    dataSource: [],
    columns: tBGoodsForCKJVxeColumns,
  });
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 12 },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await reset();
    setModalProps({
      confirmLoading: false,
      showCancelBtn: data?.showFooter,
      showOkBtn: data?.showFooter,
    });
    isUpdate.value = !!data?.isUpdate;
    formDisabled.value = !data?.showFooter;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      requestSubTableData(queryTBGoodsForCK, { id: data?.record?.id }, tBGoodsForCKTable);
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //方法配置
  const [handleChangeTabs, handleSubmit, requestSubTableData, formRef] = useJvxeMethod(
    requestAddOrEdit,
    classifyIntoFormData,
    tableRefs,
    activeKey,
    refKeys
  );

  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : !unref(formDisabled) ? '编辑' : '详情'));

  async function reset() {
    await resetFields();
    activeKey.value = 'tBGoodsForCK';
    tBGoodsForCKTable.dataSource = [];
  }

  function classifyIntoFormData(allValues) {
    let main = Object.assign({}, allValues.formValue);
    return {
      ...main, // 展开
      tBGoodsForCKList: allValues.tablesValue[0].tableData,
    };
  }

  //表单提交事件
  async function requestAddOrEdit(values) {
    try {
      setModalProps({ confirmLoading: true });
      values.recordString = JSON.stringify(values.tBGoodsForCKList);
      values.goodsList = values.tBGoodsForCKList;
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  // 工具栏的按钮配置
  const toolbarConfig = reactive({
    // add 新增按钮；save 保存按钮；remove 删除按钮
    btn: ['add', 'save', 'remove'],
    // btn: ['remove'],
    // prefix 按钮前方位置显示的内容 suffix 按钮后方位置显示的内容
    slot: ['prefix', 'suffix'],
  });
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
