<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TBQualityGuaranteeForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="客户ID" v-bind="validateInfos.customerId" id="TBQualityGuaranteeForm-customerId" name="customerId">
                <j-popup
                  placeholder="请选择客户ID"
                  v-model:value="formData.customerId"
                  code="jxc_zicang_customer"
                  :fieldConfig="[
                    { source: 'id', target: 'customerId' },
                    { source: 'customer_name', target: 'customerName' },
                    { source: 'phone', target: 'phone' },
                    { source: 'birthday', target: 'birthday' },
                  ]"
                  :multi="false"
                  :setFieldsValue="setFieldsValue"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="质保单单号"
                v-bind="validateInfos.qualityGuaranteeNo"
                id="TBQualityGuaranteeForm-qualityGuaranteeNo"
                name="qualityGuaranteeNo"
              >
                <a-input v-model:value="formData.qualityGuaranteeNo" placeholder="请输入质保单单号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="购买人姓名" v-bind="validateInfos.customerName" id="TBQualityGuaranteeForm-customerName" name="customerName">
                <j-popup
                  placeholder="请选择购买人姓名"
                  v-model:value="formData.customerName"
                  code="jxc_zicang_customer"
                  :fieldConfig="[
                    { source: 'id', target: 'customerId' },
                    { source: 'customer_name', target: 'customerName' },
                    { source: 'phone', target: 'phone' },
                    { source: 'birthday', target: 'birthday' },
                  ]"
                  :multi="false"
                  :setFieldsValue="setFieldsValue"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="电话号码" v-bind="validateInfos.phone" id="TBQualityGuaranteeForm-phone" name="phone">
                <j-popup
                  placeholder="请选择电话号码"
                  v-model:value="formData.phone"
                  code="jxc_zicang_customer"
                  :fieldConfig="[
                    { source: 'id', target: 'customerId' },
                    { source: 'customer_name', target: 'customerName' },
                    { source: 'phone', target: 'phone' },
                    { source: 'birthday', target: 'birthday' },
                  ]"
                  :multi="false"
                  :setFieldsValue="setFieldsValue"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="购买人出生日期" v-bind="validateInfos.birthday" id="TBQualityGuaranteeForm-birthday" name="birthday">
                <j-popup
                  placeholder="请选择购买人出生日期"
                  v-model:value="formData.birthday"
                  code="jxc_zicang_customer"
                  :fieldConfig="[
                    { source: 'id', target: 'customerId' },
                    { source: 'customer_name', target: 'customerName' },
                    { source: 'phone', target: 'phone' },
                    { source: 'birthday', target: 'birthday' },
                  ]"
                  :multi="false"
                  :setFieldsValue="setFieldsValue"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="产品货号" v-bind="validateInfos.productNoList" id="TBQualityGuaranteeForm-productNoList" name="productNoList">
                <j-popup
                  placeholder="请选择产品货号"
                  v-model:value="formData.productNoList"
                  code="jxc_zicang_goods"
                  :fieldConfig="[
                    { source: 'id', target: 'goodsIdList' },
                    { source: 'product_no', target: 'productNoList' },
                  ]"
                  :multi="true"
                  :setFieldsValue="setFieldsValue"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="产品货品ID列表" v-bind="validateInfos.goodsIdList" id="TBQualityGuaranteeForm-goodsIdList" name="goodsIdList">
                <j-popup
                  placeholder="请选择产品货品ID列表"
                  v-model:value="formData.goodsIdList"
                  code="jxc_zicang_goods"
                  :fieldConfig="[
                    { source: 'id', target: 'goodsIdList' },
                    { source: 'product_no', target: 'productNoList' },
                  ]"
                  :multi="true"
                  :setFieldsValue="setFieldsValue"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="对应销售人员" v-bind="validateInfos.salesman" id="TBQualityGuaranteeForm-salesman" name="salesman">
                <a-input v-model:value="formData.salesman" placeholder="请输入对应销售人员" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="购买日期" v-bind="validateInfos.purchaseDate" id="TBQualityGuaranteeForm-purchaseDate" name="purchaseDate">
                <a-date-picker
                  placeholder="请选择购买日期"
                  v-model:value="formData.purchaseDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="产品原价" v-bind="validateInfos.originalPrice" id="TBQualityGuaranteeForm-originalPrice" name="originalPrice">
                <a-input-number v-model:value="formData.originalPrice" placeholder="请输入产品原价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="实际收款金额" v-bind="validateInfos.actualPaid" id="TBQualityGuaranteeForm-actualPaid" name="actualPaid">
                <a-input-number v-model:value="formData.actualPaid" placeholder="请输入实际收款金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="付款方式" v-bind="validateInfos.paymentMethod" id="TBQualityGuaranteeForm-paymentMethod" name="paymentMethod">
                <a-input v-model:value="formData.paymentMethod" placeholder="请输入付款方式" allow-clear></a-input>
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
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../TBQualityGuarantee.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';

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
    customerId: '',
    qualityGuaranteeNo: '',
    customerName: '',
    phone: '',
    birthday: '',
    productNoList: '',
    goodsIdList: '',
    salesman: '',
    purchaseDate: '',
    originalPrice: undefined,
    actualPaid: undefined,
    paymentMethod: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 30 }, sm: { span: 10 } });
  const wrapperCol = ref<any>({ xs: { span: 30 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    customerId: [{ required: true, message: '请输入客户ID!' }],
    qualityGuaranteeNo: [{ required: true, message: '请输入质保单单号!' }],
    customerName: [{ required: true, message: '请输入购买人姓名!' }],
    phone: [{ required: true, message: '请输入电话号码!' }],
    birthday: [{ required: true, message: '请输入购买人出生日期!' }],
    productNoList: [{ required: true, message: '请输入产品货号!' }],
    goodsIdList: [{ required: true, message: '请输入产品货品ID列表!' }],
    salesman: [{ required: true, message: '请输入对应销售人员!' }],
    purchaseDate: [{ required: true, message: '请输入购买日期!' }],
    originalPrice: [{ required: true, message: '请输入产品原价!' }],
    actualPaid: [{ required: true, message: '请输入实际收款金额!' }],
    paymentMethod: [{ required: true, message: '请输入付款方式!' }],
  });
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

  /**
   *  popup组件值改变事件
   */
  function setFieldsValue(map) {
    Object.keys(map).map((key) => {
      formData[key] = map[key];
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
