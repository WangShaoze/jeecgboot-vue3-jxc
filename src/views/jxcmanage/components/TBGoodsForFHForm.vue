<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form class="antd-modal-form" v-bind="formItemLayout" ref="formRef" name="TBGoodsForFHForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="款式类别" v-bind="validateInfos.styleCategory" id="TBGoodsForFH-styleCategory" name="styleCategory">
                <a-input v-model:value="formData.styleCategory" placeholder="请输入款式类别" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="货号" v-bind="validateInfos.productNo" id="TBGoodsForFH-productNo" name="productNo">
                <a-input v-model:value="formData.productNo" placeholder="请输入货号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="款号" v-bind="validateInfos.newStyleNo" id="TBGoodsForFH-newStyleNo" name="newStyleNo">
                <a-input v-model:value="formData.newStyleNo" placeholder="请输入款号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="客胚名称" v-bind="validateInfos.itemName" id="TBGoodsForFH-itemName" name="itemName">
                <a-input v-model:value="formData.itemName" placeholder="请输入客胚名称" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="银重" v-bind="validateInfos.silverWeight" id="TBGoodsForFH-silverWeight" name="silverWeight">
                <a-input-number v-model:value="formData.silverWeight" placeholder="请输入银重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="金重" v-bind="validateInfos.goldWeight" id="TBGoodsForFH-goldWeight" name="goldWeight">
                <a-input-number v-model:value="formData.goldWeight" placeholder="请输入金重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="总重" v-bind="validateInfos.totalWeight" id="TBGoodsForFH-totalWeight" name="totalWeight">
                <a-input-number v-model:value="formData.totalWeight" placeholder="请输入总重" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="证书编号" v-bind="validateInfos.certificateNo" id="TBGoodsForFH-certificateNo" name="certificateNo">
                <a-input v-model:value="formData.certificateNo" placeholder="请输入证书编号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="成本" v-bind="validateInfos.goodsCost" id="TBGoodsForFH-goodsCost" name="goodsCost">
                <a-input-number v-model:value="formData.goodsCost" placeholder="请输入成本" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="16">
              <a-form-item
                label="参考售价(经销)"
                v-bind="validateInfos.distributorReferenceSellingPrice"
                id="TBGoodsForFH-distributorReferenceSellingPrice"
                name="distributorReferenceSellingPrice"
              >
                <a-input-number v-model:value="formData.distributorReferenceSellingPrice" placeholder="请输入参考售价(经销)" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="16">
              <a-form-item
                label="参考零售价"
                v-bind="retailReferenceSellingPrice"
                id="TBGoodsForFH-retailReferenceSellingPrice"
                name="retailReferenceSellingPrice"
              >
                <a-input-number v-model:value="formData.retailReferenceSellingPrice" placeholder="请输入参考零售价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="16">
              <a-form-item
                label="参考一口价"
                v-bind="retailFixedReferenceSellingPrice"
                id="TBGoodsForFH-retailFixedReferenceSellingPrice"
                name="retailFixedReferenceSellingPrice"
              >
                <a-input-number v-model:value="formData.retailFixedReferenceSellingPrice" placeholder="请输入参考一口价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="16">
              <a-form-item label="是否一口价" id="TBStyleForm-isFixedPrice" name="isFixedPrice">
                <j-dict-select-tag
                  v-model:value="formData.isFixedPrice"
                  dictCode="jxc_isFixedPrice_dict"
                  placeholder="请选择是否一口价"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="库位号" v-bind="validateInfos.kmValue" id="TBGoodsForFH-kmValue" name="kmValue">
                <j-popup
                  placeholder="请选择库位号"
                  v-model:value="formData.kmValue"
                  code="jxc_select_km"
                  :fieldConfig="[
                    { source: 'id', target: 'kmId' },
                    { source: 'km', target: 'kmValue' },
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
  import { ref, reactive, defineExpose, nextTick, onMounted, inject, defineProps, unref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import { getValueType } from '/@/utils';
  import { tBGoodsForFHSaveOrUpdate } from '../TBStyleForFH.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';

  //接收主表id
  const mainId = inject('mainId');
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    styleCategory: '',
    productNo: '',
    newStyleNo: '',
    itemName: '',
    silverWeight: undefined,
    goldWeight: undefined,
    totalWeight: undefined,
    certificateNo: '',
    goodsCost: undefined,
    distributorReferenceSellingPrice: undefined,
    retailReferenceSellingPrice: undefined,
    retailFixedReferenceSellingPrice: undefined,
    isFixedPrice: '',
    inboundStatus: '',
    salesStatus: '',
    kmValue: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    styleCategory: [{ required: true, message: '请输入款式类别!' }],
    productNo: [{ required: true, message: '请输入货号!' }],
    newStyleNo: [{ required: true, message: '请输入款号!' }],
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
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 5 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  };

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
    // 触发表单验证
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
    if (unref(mainId)) {
      model['styleId'] = unref(mainId);
    }
    await tBGoodsForFHSaveOrUpdate(model, isUpdate.value)
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

  /**`
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
