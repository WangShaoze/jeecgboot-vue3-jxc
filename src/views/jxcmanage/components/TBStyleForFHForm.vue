<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TBStyleForFHForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="款号" v-bind="validateInfos.styleNo" id="TBStyleForFHForm-styleNo" name="styleNo">
                <a-input v-model:value="formData.styleNo" placeholder="请输入款号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="款式名称" v-bind="validateInfos.itemName" id="TBStyleForFHForm-itemName" name="itemName">
                <a-input v-model:value="formData.itemName" placeholder="请输入款式名称" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <!--						<a-col :span="12">-->
            <!--							<a-form-item label="客户" v-bind="validateInfos.customAccount" id="TBStyleForFHForm-customAccount" name="customAccount">-->
            <!--								<a-input v-model:value="formData.customAccount" placeholder="请输入客户"  allow-clear ></a-input>-->
            <!--							</a-form-item>-->
            <!--						</a-col>-->
            <a-col :span="12">
              <a-form-item label="金工费" v-bind="validateInfos.goldProcessFee" id="TBStyleForFHForm-goldProcessFee" name="goldProcessFee">
                <a-input-number v-model:value="formData.goldProcessFee" placeholder="请输入金工费" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="银工费" v-bind="validateInfos.sliverProcessFee" id="TBStyleForFHForm-sliverProcessFee" name="sliverProcessFee">
                <a-input-number v-model:value="formData.sliverProcessFee" placeholder="请输入银工费" style="width: 100%" />
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
  import { saveOrUpdate } from '../TBStyleForFH.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
  });
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    styleNo: '',
    itemName: '',
    customAccount: '',
    goldProcessFee: undefined,
    sliverProcessFee: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });
  const formRef = ref();
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
