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
              <a-form-item label="金工费" v-bind="validateInfos.goldProcessFee" id="TBStyleForm-goldProcessFee" name="goldProcessFee">
                <a-input-number v-model:value="formData.goldProcessFee" placeholder="请输入金工费" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="银工费/g"
                v-bind="validateInfos.sliverProcessFeeEachGram"
                id="TBStyleForm-sliverProcessFeeEachGram"
                name="sliverProcessFeeEachGram"
              >
                <a-input-number v-model:value="formData.sliverProcessFeeEachGram" placeholder="请输入银工费/g" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="银工费/件"
                v-bind="validateInfos.sliverProcessFeeEachPiece"
                id="TBStyleForm-sliverProcessFeeEachPiece"
                name="sliverProcessFeeEachPiece"
              >
                <a-input-number v-model:value="formData.sliverProcessFeeEachPiece" placeholder="请输入银工费/件" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="证书费" v-bind="validateInfos.certificateFee" id="TBStyleForm-certificateFee" name="certificateFee">
                <a-input-number v-model:value="formData.certificateFee" placeholder="请输入证书费" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="辅料费"
                v-bind="validateInfos.auxiliaryMaterialFee"
                id="TBStyleForm-auxiliaryMaterialFee"
                name="auxiliaryMaterialFee"
              >
                <a-input-number v-model:value="formData.auxiliaryMaterialFee" placeholder="请输入辅料费" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="成本克工费"
                v-bind="validateInfos.costWorkFeeEachGram"
                id="TBStyleForm-costWorkFeeEachGram"
                name="costWorkFeeEachGram"
              >
                <a-input-number v-model:value="formData.costWorkFeeEachGram" placeholder="请输入成本克工费" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="成本件工费"
                v-bind="validateInfos.costWorkFeeEachPiece"
                id="TBStyleForm-costWorkFeeEachPiece"
                name="costWorkFeeEachPiece"
              >
                <a-input-number v-model:value="formData.costWorkFeeEachPiece" placeholder="请输入成本件工费" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="经销克工费"
                v-bind="validateInfos.distributorWorkFeeEachGram"
                id="TBStyleForm-distributorWorkFeeEachGram"
                name="distributorWorkFeeEachGram"
              >
                <a-input-number v-model:value="formData.distributorWorkFeeEachGram" placeholder="请输入经销克工费" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="经销件工费"
                v-bind="validateInfos.distributorWorkFeeEachPiece"
                id="TBStyleForm-distributorWorkFeeEachPiece"
                name="distributorWorkFeeEachPiece"
              >
                <a-input-number v-model:value="formData.distributorWorkFeeEachPiece" placeholder="请输入经销件工费" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="零售克工费"
                v-bind="validateInfos.retailWorkFeeEachGram"
                id="TBStyleForm-retailWorkFeeEachGram"
                name="retailWorkFeeEachGram"
              >
                <a-input-number v-model:value="formData.retailWorkFeeEachGram" placeholder="请输入零售克工费" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="零售件工费"
                v-bind="validateInfos.retailWorkFeeEachPiece"
                id="TBStyleForm-retailWorkFeeEachPiece"
                name="retailWorkFeeEachPiece"
              >
                <a-input-number v-model:value="formData.retailWorkFeeEachPiece" placeholder="请输入零售件工费" style="width: 100%" />
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
    goldProcessFee: undefined,
    sliverProcessFeeEachGram: undefined,
    sliverProcessFeeEachPiece: undefined,
    certificateFee: undefined,
    auxiliaryMaterialFee: undefined,
    costWorkFeeEachGram: undefined,
    costWorkFeeEachPiece: undefined,
    distributorWorkFeeEachGram: undefined,
    distributorWorkFeeEachPiece: undefined,
    retailWorkFeeEachGram: undefined,
    retailWorkFeeEachPiece: undefined,
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
