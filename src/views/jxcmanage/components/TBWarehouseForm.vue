<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TBWarehouseForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="开户时间" v-bind="validateInfos.openAccountDatetime" id="TBWarehouseForm-openAccountDatetime" name="openAccountDatetime">
								<a-date-picker placeholder="请选择开户时间"  v-model:value="formData.openAccountDatetime" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="激活码" v-bind="validateInfos.activateCode" id="TBWarehouseForm-activateCode" name="activateCode">
								<a-input v-model:value="formData.activateCode" placeholder="请输入激活码"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="仓库名" v-bind="validateInfos.warehouseName" id="TBWarehouseForm-warehouseName" name="warehouseName">
								<a-input v-model:value="formData.warehouseName" placeholder="请输入仓库名"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="注册手机号" v-bind="validateInfos.phone" id="TBWarehouseForm-phone" name="phone">
								<a-input v-model:value="formData.phone" placeholder="请输入注册手机号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="店铺名" v-bind="validateInfos.merchantName" id="TBWarehouseForm-merchantName" name="merchantName">
								<a-input v-model:value="formData.merchantName" placeholder="请输入店铺名"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="报警原因" v-bind="validateInfos.warningCause" id="TBWarehouseForm-warningCause" name="warningCause">
								<a-input v-model:value="formData.warningCause" placeholder="请输入报警原因"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="角色" v-bind="validateInfos.sysRole" id="TBWarehouseForm-sysRole" name="sysRole">
								<j-popup
									placeholder="请选择角色"
									v-model:value="formData.sysRole"
									code="jxc_sys_role"
									:fieldConfig="[
										{ source: 'sys_role_id', target: 'sysRoleId' },
										{ source: 'sys_role', target: 'sysRole' },
									]"
									:multi="true"
									:setFieldsValue="setFieldsValue"
									 allow-clear />							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="角色ID" v-bind="validateInfos.sysRoleId" id="TBWarehouseForm-sysRoleId" name="sysRoleId">
								<j-popup
									placeholder="请选择角色ID"
									v-model:value="formData.sysRoleId"
									code="jxc_sys_role"
									:fieldConfig="[
										{ source: 'sys_role_id', target: 'sysRoleId' },
										{ source: 'sys_role', target: 'sysRole' },
									]"
									:multi="true"
									:setFieldsValue="setFieldsValue"
									 allow-clear />							</a-form-item>
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
  import { saveOrUpdate } from '../TBWarehouse.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { duplicateValidate } from '/@/utils/helper/validator'
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
    openAccountDatetime: '',   
    activateCode: '',   
    warehouseName: '',   
    phone: '',   
    merchantName: '',   
    warningCause: '',   
    sysRole: '',   
    sysRoleId: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    phone: [{ required: true, message: '请输入注册手机号!'}, { validator: phoneDuplicatevalidate }],
    sysRole: [{ required: true, message: '请输入角色!'},],
    sysRoleId: [{ required: true, message: '请输入角色ID!'},],
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

  /**
   *  popup组件值改变事件
   */
  function setFieldsValue(map) {
    Object.keys(map).map((key) => {
      formData[key] = map[key];
    });
  }

  async function phoneDuplicatevalidate(_r, value) {
    return duplicateValidate('t_b_warehouse', 'phone', value, formData.id || '')
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
