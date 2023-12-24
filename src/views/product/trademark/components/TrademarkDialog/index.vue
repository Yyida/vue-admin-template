<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    @close="handleBeforeClose(formRef)"
    width="30%"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      label-suffix=":"
      label-position="right"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="form.tmName" placeholder="请填写品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌Logo" prop="logoUrl">
        <!-- action 属性： 上传到服务器的地址路径 -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
        >
          <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(formRef)">取消</el-button>
        <el-button
          type="primary"
          @click="handleSave(formRef)"
          :loading="loading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { defineProps, watchEffect, ref, reactive } from 'vue'
import { addTrademark } from '@/api/product/trademark'
import { UploadProps } from 'element-plus/es/components/upload/src/upload'
let emit = defineEmits(['closeDialog'])
let props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '',
  },
})
let dialogVisible = props.dialogVisible
let dialogTitle = props.dialogTitle
const formRef = ref<FormInstance | any>()
let form = reactive({
  tmName: '',
  logoUrl: '',
})
let rules = reactive<FormRules>({
  tmName: [
    {
      required: true,
      message: '请输入品牌名称',
      trigger: 'blur',
    },
  ],
  logoUrl: [
    {
      required: true,
      message: '请上传品牌Logo',
      trigger: 'blur',
    },
  ],
})
let loading = ref<boolean>(false)

// 监听dialogbisible 属性变化， 用于控制隐藏、显示 dialog
watchEffect(() => {
  if (props.dialogVisible) {
    dialogVisible = true
    dialogTitle = props.dialogTitle
  } else {
    dialogVisible = false
    dialogTitle = ''
  }
})

const handleBeforeClose = (formEl: FormInstance) => {
  formEl.resetFields()
  emit('closeDialog')
}

// 关闭dialog
const handleClose = (formEl: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
  emit('closeDialog')
}

// 保存添加品牌
const handleSave = (formEl: FormInstance) => {
  console.log(formEl)
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        let result = await addTrademark(form)
        console.log(result)
        loading.value = false
        handleClose(formEl)
        ElMessage({
          message: '添加品牌成功',
          type: 'success',
        })
      } catch {
        loading.value = false
        ElMessage({
          message: '添加品牌失败',
          type: 'error',
        })
      }
    }
  })
}

// 图片上传前回调
const beforeUpload: UploadProps['beforeUpload'] = (file: any) => {
  // 在上传成功前执行的回调， 可以限制文件的大小， 类型等...
  let types = ['image/png', 'image/jpeg', 'image/gif']
  if (types.some((v) => v === file.type)) {
    return true
  } else {
    ElMessage({
      message: '请上传png或jpg或git类型的图片',
      type: 'error',
    })
    return false
  }
}

// 图片上传成功后回调
const handleSuccess: UploadProps['onSuccess'] = (response: any) => {
  console.log(response)
  if (response.code === 200) {
    form.logoUrl = response.data
  } else {
    form.logoUrl = ''
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
