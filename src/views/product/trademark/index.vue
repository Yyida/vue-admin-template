<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <div class="product_container">
    <el-card class="box-card">
      <el-button type="primary" icon="Plus" @click="add">添加品牌</el-button>
      <el-table v-loading="loading" style="margin: 22px 0" :data="list">
        <el-table-column
          label="序号"
          width="80"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="LOGO">
          <template #default="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.logoUrl"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              text
              size="small"
              icon="Edit"
              @click="edit(row)"
            >
              编辑
            </el-button>
            <el-button
              text
              type="danger"
              size="small"
              icon="Delete"
              :loading="delLoad"
              @click="del(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 
        v-model:current-page  当前页码
        v-model:page-size 每页显示的条数
        :page-sizes  可选的每页显示条数
       -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :small="true"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="getData"
        @size-change="sizeChange"
      />
    </el-card>
    <TrademarkDialog
      :dialogVisible="dialogVisible"
      :dialogTitle="dialogTitle"
      :dialogType="dialogType"
      :formData="formData"
      @closeDialog="closeDialog"
      @confirm="getData"
    ></TrademarkDialog>
  </div>
</template>

<script setup lang="ts">
import TrademarkDialog from './components/TrademarkDialog/index.vue'
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  getTrademarkList,
  deleteTrademark,
} from '@/api/product/trademark/trademark.ts'
import { ElMessage } from 'element-plus'
import type {
  trademarkResData,
  trademarkFormData,
  Records,
} from '@/api/product/trademark/type.ts'
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
let list = ref<Records>()
let total = ref<number>(0)
let loading = ref<boolean>(false)

interface formDataInterface {
  tmName: string
  logoUrl: string
  id?: number | string | null
}

let dialogTitle = ref<string>()
let dialogVisible = ref<boolean>(false)
let dialogType = ref<string>('add')
let formData = reactive<formDataInterface>({
  id: undefined,
  tmName: '',
  logoUrl: '',
})

let delLoad = ref<boolean>(false)

const getData = async () => {
  loading.value = true
  try {
    const params: trademarkFormData = {
      page: currentPage.value,
      limit: pageSize.value,
    }
    const result: trademarkResData = await getTrademarkList(params)
    const { code, data } = result
    if (code === 200) {
      list.value = data.records
      total.value = data.total
      loading.value = false
      if (!data.records) {
        currentPage.value = currentPage.value - 1
        getData()
      }
    }
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

const add = () => {
  nextTick(() => {
    dialogType.value = `add`
    dialogTitle.value = '添加品牌'
    console.log(dialogTitle)
    dialogVisible.value = true
  })
}
const closeDialog = () => {
  console.log('close')
  dialogVisible.value = false
  formData = {
    id: '',
    tmName: '',
    logoUrl: '',
  }
}
const edit = (row: any) => {
  nextTick(() => {
    formData = row
    dialogVisible.value = true
    dialogType.value = `edit`
    dialogTitle.value = '编辑品牌'
  })
}

const del = async (row: any) => {
  console.log(row)
  const { id } = row
  if (id) {
    delLoad.value = true
    try {
      let result = await deleteTrademark(id)
      console.log(result)
      if (result.code === 200) {
        delLoad.value = false
        ElMessage({
          message: '删除品牌成功',
          type: 'success',
        })
        getData()
      }
    } catch {
      delLoad.value = false
      ElMessage({
        message: '删除品牌失败',
        type: 'error',
      })
    }
  }
}

const sizeChange = () => {
  currentPage.value = 1
  getData()
}

onMounted(() => {
  getData()
})
</script>

<style scoped></style>
@/api/product/trademark/trademark@/api/product/trademark/type
