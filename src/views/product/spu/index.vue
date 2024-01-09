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
        :disabled="!params.category3Id"
        @click="onAddSpu"
      >
        添加SPU
      </el-button>
      <el-table v-show="scene === 1" v-loading="loading" :data="spuList">
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
            <el-button text type="primary" icon="Plus" @click="onAdd(row)">
              新增
            </el-button>
            <el-button text type="primary" icon="Edit" @click="onEdit(row)">
              编辑
            </el-button>
            <el-button
              text
              type="primary"
              icon="InfoFilled"
              @click="onLook(row)"
            >
              查看
            </el-button>
            <el-button text type="danger" icon="Delete" @click="onDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <SpuForm
        ref="spuFormRef"
        v-show="scene === 2 || scene === 3"
        @cancel="onSpuFormCancel"
      ></SpuForm>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import ReqParamsForm from '../attr/components/ReqParamsForm/index.vue'
import SpuForm from './components/SpuForm.vue'
import { fetchCategory3SpuList } from '@/api/product/spu/spu.ts'
import type { spuListResponseData, Records } from '@/api/product/spu/type'
import { getAllTradeMarkList } from '@/api/product/trademark/trademark.ts'
let params = reactive<any>({
  category3Id: '',
  page: 1,
  limit: 3,
})
let total = ref<number>(0)
let spuList = ref<Records[]>([])
let loading = ref<boolean>(false)
let scene = ref<number>(1) // 1 展示 2新增 3编辑
let spuFormRef = ref()
const onChangeParams = async (row: any) => {
  const { category3Id } = row

  if (category3Id) {
    params = Object.assign(params, {
      category3Id: category3Id,
    })
    try {
      loading.value = true
      const result: any | spuListResponseData =
        await fetchCategory3SpuList(params)
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
  } else {
    params = Object.assign(params, {
      category3Id: '',
      page: 1,
      limit: 3,
    })
    spuList.value = []
    total.value = 0
  }
}
const onEdit = (row: any) => {
  console.log('编辑', row)
  scene.value = 3
}
const onDelete = (row: any) => {
  console.log('删除', row)
}
const onAddSpu = async (row: any) => {
  console.log(row)
  try {
    spuFormRef.value.spusLoading = true
    scene.value = 2
    const result = await getAllTradeMarkList()
    const { code, data } = result
    console.log(data)
    if (code === 200) {
      nextTick(() => {
        spuFormRef.value.spus = data
      })
    }
  } catch (err) {
    console.log(err)
  } finally {
    spuFormRef.value.spusLoading = false
  }
}
const onAdd = (row: any) => {
  console.log('添加', row)
}
const onLook = (row: any) => {
  console.log('查看', row)
}

const onSpuFormCancel = () => {
  scene.value = 1
}
</script>

<style scoped></style>
