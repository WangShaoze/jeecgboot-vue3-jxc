<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TBGoodsForQueryForm">
          <a-row>
						<a-col :span="12">
							<a-form-item label="款式类别" v-bind="validateInfos.styleCategory" id="TBGoodsForQueryForm-styleCategory" name="styleCategory">
								<a-input v-model:value="formData.styleCategory" placeholder="请输入款式类别"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="货号" v-bind="validateInfos.productNo" id="TBGoodsForQueryForm-productNo" name="productNo">
								<a-input v-model:value="formData.productNo" placeholder="请输入货号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="客胚名称" v-bind="validateInfos.itemName" id="TBGoodsForQueryForm-itemName" name="itemName">
								<a-input v-model:value="formData.itemName" placeholder="请输入客胚名称"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="银重" v-bind="validateInfos.silverWeight" id="TBGoodsForQueryForm-silverWeight" name="silverWeight">
								<a-input-number v-model:value="formData.silverWeight" placeholder="请输入银重" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="金重" v-bind="validateInfos.goldWeight" id="TBGoodsForQueryForm-goldWeight" name="goldWeight">
								<a-input-number v-model:value="formData.goldWeight" placeholder="请输入金重" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="总重" v-bind="validateInfos.totalWeight" id="TBGoodsForQueryForm-totalWeight" name="totalWeight">
								<a-input-number v-model:value="formData.totalWeight" placeholder="请输入总重" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="证书编号" v-bind="validateInfos.certificateNo" id="TBGoodsForQueryForm-certificateNo" name="certificateNo">
								<a-input v-model:value="formData.certificateNo" placeholder="请输入证书编号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="查询地址" v-bind="validateInfos.queryUrl" id="TBGoodsForQueryForm-queryUrl" name="queryUrl">
								<a-input v-model:value="formData.queryUrl" placeholder="请输入查询地址"  allow-clear ></a-input>
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
  import { saveOrUpdate } from '../TBGoodsForQuery.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({})},
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    styleCategory: '',   
    productNo: '',   
    itemName: '',   
    silverWeight: undefined,
    goldWeight: undefined,
    totalWeight: undefined,
    certificateNo: '',   
    queryUrl: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    styleCategory: [{ required: true, message: '请输入款式类别!'},],
    productNo: [{ required: true, message: '请输入货号!'},],
    itemName: [{ required: true, message: '请输入客胚名称!'},],
    silverWeight: [{ required: true, message: '请输入银重!'},],
    goldWeight: [{ required: true, message: '请输入金重!'},],
    totalWeight: [{ required: true, message: '请输入总重!'},],
    certificateNo: [{ required: true, message: '请输入证书编号!'},],
    queryUrl: [{ required: true, message: '请输入查询地址!'},],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
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
        if(record.hasOwnProperty(key)){
          tmpData[key] = record[key]
        }
      })
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
