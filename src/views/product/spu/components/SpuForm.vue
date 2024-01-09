<template>
  <div>
    <el-form
      label-position="left"
      label-suffix=":"
      label-width="120px"
      :model="formData"
      ref="formDataRef"
    >
      <el-form-item label="SPU名称">
        <el-input
          v-model="formData.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select
          v-loading="spusLoading"
          v-model="formData.tmId"
          placeholder="请选择SPU品牌"
        >
          <el-option
            v-for="item in spus"
            :label="item.tmName"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="formData.description"
          type="textarea"
          placeholder="请输入SPU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload class="avatar-uploader" :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select v-model="formData.spuSaleAttrList">
          <el-option label="123" :value="1"></el-option>
          <el-option label="112323" :value="12"></el-option>
          <el-option label="1321323" :value="123"></el-option>
        </el-select>
        <el-button type="primary" icon="Plus" style="margin: 0 10px">
          添加属性值
        </el-button>
        <el-table style="margin: 20px 0" border :data="[]" fit>
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="销售属性名字" width="140px"></el-table-column>
          <el-table-column label="销售属性值"></el-table-column>
          <el-table-column label="操作" width="140px"></el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <div style="margin-left: 120px">
      <el-button type="primary" :loading="loading" @click="onSubmit">
        保存
      </el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="SpuForm">
import { reactive, ref } from 'vue'
let emit = defineEmits(['cancel'])
interface formDataType {
  spuName: string | number
  tmId: string | number
  description: string
  spuImageList: spuImageListItemType[]
  spuSaleAttrList: spuSaleAttrListType[]
  category3Id: string | number
  id: string | number
}

interface spuImageListItemType {
  id: string | number
  spuId: string | number
  imgName: string
  imgUrl: string
}

interface spuSaleAttrValueListItemType {
  baseSaleAttrId: string | number
  id: string | number
  isChecked: boolean
  saleAttrName: string
  saleAttrValueName: string
  spuId: string | number
}

interface spuSaleAttrListItemType {
  baseSaleAttrId?: string | number
  id?: string | number
  saleAttrName: string
  spuId?: string | number
  spuSaleAttrValueList: spuSaleAttrValueListItemType[]
}
interface spuSaleAttrListType {
  baseSaleAttrId?: string | number
  id?: string | number
  saleAttrName: string
  spuId?: string | number
  spuSaleAttrValueList: spuSaleAttrListItemType[]
}
let formData = reactive<formDataType>({
  spuName: '',
  tmId: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: [],
  category3Id: '',
  id: '',
})
let spus = ref<any[]>()
let loading = ref<boolean>(false)
let spusLoading = ref<boolean>(false)
let imageUrl = ref<string>('')

const onSubmit = () => {
  console.log('保存')
}

const onCancel = () => {
  console.log('取消')
  emit('cancel')
}

defineExpose({
  spusLoading,
  spus,
})
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
