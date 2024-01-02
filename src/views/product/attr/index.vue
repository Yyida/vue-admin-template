<template>
  <div>
    <el-card>
      <ReqParamsForm
        :isDisabled="isShow === 1"
        @changeParams="changeParams"
      ></ReqParamsForm>
    </el-card>
    <el-card style="margin-top: 20px">
      <div v-show="isShow === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="disabledAdd"
          @click="onAddAttr"
        >
          添加属性
        </el-button>
        <CategoryTable
          style="margin: 10px 0"
          v-loading="loading"
          ref="categoryTableRef"
        />
      </div>
      <div v-show="isShow === 1">
        <el-form :model="formData" inline>
          <el-form-item label="属性名称">
            <el-input
              v-model="formData.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus">添加属性值</el-button>
        <el-button @click="onCancel">取消</el-button>

        <el-table style="margin: 10px 0">
          <el-table-column
            label="序号"
            width="80"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>

        <el-button type="primary">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, reactive } from 'vue'
import ReqParamsForm from './components/ReqParamsForm/index.vue'
import CategoryTable from './components/CategoryTable/index.vue'
import { getCategoryAll } from '@/api/product/attr/attr'
import type { categoryAllResponse } from '@/api/product/attr/type'

let categoryTableRef = ref()
let isShow = ref<number>(0)
let loading = ref<boolean>(false)
let formData = reactive<any>({
  attrName: '',
})
let disabledAdd = ref<boolean>(true)

const changeParams = async (params: any) => {
  const { category3Id } = params
  if (category3Id) {
    disabledAdd.value = false
    loading.value = true
    try {
      let result: categoryAllResponse = await getCategoryAll(params)
      const { code, data } = result
      if (code === 200) {
        nextTick(() => {
          categoryTableRef.value.categoryAllList = data
          loading.value = false
        })
      }
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  } else {
    loading.value = false
    categoryTableRef.value.categoryAllList = []
  }
}

const onAddAttr = () => {
  isShow.value = 1
  disabledAdd.value = false
}

const onCancel = () => {
  isShow.value = 0
  disabledAdd.value = false
}
</script>

<style scoped></style>
