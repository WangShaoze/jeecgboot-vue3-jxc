<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TBStyleForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="客户款号" v-bind="validateInfos.customerStyleNo" id="TBStyleForm-customerStyleNo" name="customerStyleNo">
                <a-input v-model:value="formData.customerStyleNo" placeholder="请输入客户款号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="款号" v-bind="validateInfos.newStyleNo" id="TBStyleForm-newStyleNo" name="newStyleNo">
                <a-input v-model:value="formData.newStyleNo" placeholder="请输入款号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="款式名称" v-bind="validateInfos.itemName" id="TBStyleForm-itemName" name="itemName">
                <a-input v-model:value="formData.itemName" placeholder="请输入款式名称" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="平均银重" v-bind="validateInfos.avgSilverWeight" id="TBStyleForm-avgSilverWeight" name="avgSilverWeight">
                <a-input-number v-model:value="formData.avgSilverWeight" placeholder="请输入平均银重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="平均金重" v-bind="validateInfos.avgGoldWeight" id="TBStyleForm-avgGoldWeight" name="avgGoldWeight">
                <a-input-number v-model:value="formData.avgGoldWeight" placeholder="请输入平均金重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="平均总重" v-bind="validateInfos.avgTotalWeight" id="TBStyleForm-avgTotalWeight" name="avgTotalWeight">
                <a-input-number v-model:value="formData.avgTotalWeight" placeholder="请输入平均总重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="经销工费" v-bind="validateInfos.distributorCost" id="TBStyleForm-distributorCost" name="distributorCost">
                <a-input-number v-model:value="formData.distributorCost" placeholder="请输入经销工费" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="零售工费" v-bind="validateInfos.retailCost" id="TBStyleForm-retailCost" name="retailCost">
                <a-input-number v-model:value="formData.retailCost" placeholder="请输入零售工费" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="零售一口价" v-bind="validateInfos.retailFixedPrice" id="TBStyleForm-retailFixedPrice" name="retailFixedPrice">
                <a-input-number v-model:value="formData.retailFixedPrice" placeholder="请输入零售一口价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="是否一口价" v-bind="validateInfos.isFixedPrice" id="TBStyleForm-isFixedPrice" name="isFixedPrice">
                <j-dict-select-tag
                  v-model:value="formData.isFixedPrice"
                  dictCode="jxc_isFixedPrice_dict"
                  placeholder="请选择是否一口价"
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../TBStyle.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    customerStyleNo: '',
    newStyleNo: '',
    itemName: '',
    customAccount: '',
    avgSilverWeight: undefined,
    avgGoldWeight: undefined,
    avgTotalWeight: undefined,
    distributorCost: undefined,
    retailCost: undefined,
    retailFixedPrice: undefined,
    isFixedPrice: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      if (props.formData.disabled === false) {
        return false;
      } else {
        return true;
      }
    }
    return props.formDisabled;
  });

  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      const tmpData = {};
      Object.keys(formData).forEach((key) => {
        if (record.hasOwnProperty(key)) {
          tmpData[key] = record[key];
        }
      });
      //赋值
      Object.assign(formData, tmpData);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    try {
      // 触发表单验证
      await validate();
    } catch ({ errorFields }) {
      if (errorFields) {
        const firstField = errorFields[0];
        if (firstField) {
          formRef.value.scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
        }
      }
      return Promise.reject(errorFields);
    }
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }

  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
</style>
