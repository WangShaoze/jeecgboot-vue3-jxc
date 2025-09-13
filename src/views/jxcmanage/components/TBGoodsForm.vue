<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TBGoodsForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="销售单号" v-bind="validateInfos.salesOrderNo" id="TBGoodsForm-salesOrderNo" name="salesOrderNo">
                <a-input v-model:value="formData.salesOrderNo" placeholder="请输入销售单号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="销售日期" v-bind="validateInfos.salesDate" id="TBGoodsForm-salesDate" name="salesDate">
                <a-date-picker
                  placeholder="请选择销售日期"
                  v-model:value="formData.salesDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="订单号" v-bind="validateInfos.orderNo" id="TBGoodsForm-orderNo" name="orderNo">
                <a-input v-model:value="formData.orderNo" placeholder="请输入订单号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="款号" v-bind="validateInfos.styleNo" id="TBGoodsForm-styleNo" name="styleNo">
                <a-input v-model:value="formData.styleNo" placeholder="请输入款号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="款式类别" v-bind="validateInfos.styleCategory" id="TBGoodsForm-styleCategory" name="styleCategory">
                <a-input v-model:value="formData.styleCategory" placeholder="请输入款式类别" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="货号" v-bind="validateInfos.productNo" id="TBGoodsForm-productNo" name="productNo">
                <a-input v-model:value="formData.productNo" placeholder="请输入货号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="客户款号" v-bind="validateInfos.newStyleNo" id="TBGoodsForm-newStyleNo" name="newStyleNo">
                <a-input v-model:value="formData.newStyleNo" placeholder="请输入客户款号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="客胚名称" v-bind="validateInfos.itemName" id="TBGoodsForm-itemName" name="itemName">
                <a-input v-model:value="formData.itemName" placeholder="请输入客胚名称" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="银重" v-bind="validateInfos.silverWeight" id="TBGoodsForm-silverWeight" name="silverWeight">
                <a-input-number v-model:value="formData.silverWeight" placeholder="请输入银重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="金重" v-bind="validateInfos.goldWeight" id="TBGoodsForm-goldWeight" name="goldWeight">
                <a-input-number v-model:value="formData.goldWeight" placeholder="请输入金重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="总重" v-bind="validateInfos.totalWeight" id="TBGoodsForm-totalWeight" name="totalWeight">
                <a-input-number v-model:value="formData.totalWeight" placeholder="请输入总重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="证书编号" v-bind="validateInfos.certificateNo" id="TBGoodsForm-certificateNo" name="certificateNo">
                <a-input v-model:value="formData.certificateNo" placeholder="请输入证书编号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="证书机构" v-bind="validateInfos.certificateOrg" id="TBGoodsForm-certificateOrg" name="certificateOrg">
                <a-input v-model:value="formData.certificateOrg" placeholder="请输入证书机构" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="字印" v-bind="validateInfos.seal" id="TBGoodsForm-seal" name="seal">
                <a-input v-model:value="formData.seal" placeholder="请输入字印" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="查询地址" v-bind="validateInfos.queryUrl" id="TBGoodsForm-queryUrl" name="queryUrl">
                <a-input v-model:value="formData.queryUrl" placeholder="请输入查询地址" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="序号" v-bind="validateInfos.sequenceNo" id="TBGoodsForm-sequenceNo" name="sequenceNo">
                <a-input-number v-model:value="formData.sequenceNo" placeholder="请输入序号" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="原价" v-bind="validateInfos.originalPrice" id="TBGoodsForm-originalPrice" name="originalPrice">
                <a-input-number v-model:value="formData.originalPrice" placeholder="请输入原价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="参考售价"
                v-bind="validateInfos.referenceSellingPrice"
                id="TBGoodsForm-referenceSellingPrice"
                name="referenceSellingPrice"
              >
                <a-input-number v-model:value="formData.referenceSellingPrice" placeholder="请输入参考售价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="状态（合/残）" v-bind="validateInfos.status" id="TBGoodsForm-status" name="status">
                <j-dict-select-tag
                  type="radio"
                  v-model:value="formData.status"
                  dictCode="jxc_pandian_status"
                  placeholder="请选择状态（合/残）"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="库存状态" v-bind="validateInfos.inboundStatus" id="TBGoodsForm-inboundStatus" name="inboundStatus">
                <j-dict-select-tag
                  type="radio"
                  v-model:value="formData.inboundStatus"
                  dictCode="jxc_inbound_status"
                  placeholder="请选择库存状态"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="销售状态" v-bind="validateInfos.salesStatus" id="TBGoodsForm-salesStatus" name="salesStatus">
                <j-dict-select-tag
                  type="radio"
                  v-model:value="formData.salesStatus"
                  dictCode="jxc_sales_status"
                  placeholder="请选择销售状态"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="备注" v-bind="validateInfos.remarks" id="TBGoodsForm-remarks" name="remarks">
                <a-input v-model:value="formData.remarks" placeholder="请输入备注" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="库码ID" v-bind="validateInfos.kmId" id="TBGoodsForm-kmId" name="kmId">
                <j-popup
                  placeholder="请选择库码ID"
                  v-model:value="formData.kmId"
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
            <a-col :span="24">
              <a-form-item label="库位号" v-bind="validateInfos.kmValue" id="TBGoodsForm-kmValue" name="kmValue">
                <j-popup
                  placeholder="请选择库位号"
                  v-model:value="formData.kmValue"
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
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../TBGoods.api';
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
    salesOrderNo: '',
    salesDate: '',
    orderNo: '',
    styleNo: '',
    styleCategory: '',
    productNo: '',
    newStyleNo: '',
    itemName: '',
    silverWeight: undefined,
    goldWeight: undefined,
    totalWeight: undefined,
    certificateNo: '',
    certificateOrg: '',
    seal: '',
    queryUrl: '',
    sequenceNo: undefined,
    originalPrice: undefined,
    referenceSellingPrice: undefined,
    status: '',
    inboundStatus: '',
    salesStatus: '',
    remarks: '',
    kmId: '',
    kmValue: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    salesOrderNo: [{ required: true, message: '请输入销售单号!' }],
    salesDate: [{ required: true, message: '请输入销售日期!' }],
    orderNo: [{ required: true, message: '请输入订单号!' }],
    styleNo: [{ required: true, message: '请输入款号!' }],
    styleCategory: [{ required: true, message: '请输入款式类别!' }],
    productNo: [{ required: true, message: '请输入货号!' }],
    newStyleNo: [{ required: true, message: '请输入客户款号!' }],
    itemName: [{ required: true, message: '请输入客胚名称!' }],
    silverWeight: [{ required: true, message: '请输入银重!' }],
    goldWeight: [{ required: true, message: '请输入金重!' }],
    totalWeight: [{ required: true, message: '请输入总重!' }],
    certificateNo: [{ required: true, message: '请输入证书编号!' }],
    certificateOrg: [{ required: true, message: '请输入证书机构!' }],
    seal: [{ required: true, message: '请输入字印!' }],
    queryUrl: [{ required: true, message: '请输入查询地址!' }],
    sequenceNo: [{ required: true, message: '请输入序号!' }],
    status: [{ required: true, message: '请输入状态（合/残）!' }],
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
