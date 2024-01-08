<template>
  <div>
    <el-card>
      <ReqParamsForm @changeParams="onChangeParams"></ReqParamsForm>
    </el-card>

    <el-card style="margin-top: 20px">
      <el-button
        style="margin-bottom: 10px"
        type="primary"
        icon="Plus"
        @click="onAddSpu"
      >
        添加SPU
      </el-button>
      <el-table v-loading="loading" :data="spuList">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button text type="primary" icon="Edit" @click="onEdit(row)">
              编辑
            </el-button>
            <el-button text type="danger" icon="Delete" @click="onDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import ReqParamsForm from '../attr/components/ReqParamsForm/index.vue'
import { fetchCategory3SpuList } from '@/api/product/spu/spu.ts'
import type { spuListResponseData, Records } from '@/api/product/spu/type'
let params = reactive<any>({
  category3Id: '',
  page: 1,
  limit: 3,
})
let total = ref<number>(0)
let spuList = ref<Records[]>([])
let loading = ref<boolean>(false)
const onChangeParams = async (row: any) => {
  const { category3Id } = row

  if (category3Id) {
    let temp = Object.assign(
      {},
      {
        ...params,
        category3Id: category3Id,
      },
    )
    try {
      loading.value = true
      const result: any | spuListResponseData =
        await fetchCategory3SpuList(temp)
      const { code, data } = result
      if (code === 200) {
        spuList.value = data.records
        total.value = data.total
      }
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }
}
const onEdit = (row: any) => {
  console.log('编辑', row)
}
const onDelete = (row: any) => {
  console.log('删除', row)
}
const onAddSpu = () => {
  console.log('添加')
}
</script>

<style scoped></style>
