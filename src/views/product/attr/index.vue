<template>
  <div>
    <el-card>
      <ReqParamsForm @changeParams="changeParams"></ReqParamsForm>
    </el-card>
    <el-card style="margin-top: 20px">
      <CategoryTable v-loading="loading" ref="categoryTableRef" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import ReqParamsForm from './components/ReqParamsForm/index.vue'
import CategoryTable from './components/CategoryTable/index.vue'
import { getCategoryAll } from '@/api/product/attr/attr'
import type { categoryAllResponse } from '@/api/product/attr/type'

let categoryTableRef = ref()
let loading = ref<boolean>(false)

const changeParams = async (params: any) => {
  const { category3Id } = params
  if (category3Id) {
    loading.value = true
    let result: categoryAllResponse = await getCategoryAll(params)
    const { code, data } = result
    if (code === 200) {
      nextTick(() => {
        categoryTableRef.value.categoryAllList = data
        loading.value = false
      })
    }
  }
}
</script>

<style scoped></style>
