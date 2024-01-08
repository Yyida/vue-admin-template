<template>
  <div>
    <el-table :data="categoryAllList" fit>
      <el-table-column
        label="序号"
        width="80"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="属性名称" prop="attrName"></el-table-column>
      <el-table-column label="属性值名称">
        <template #default="{ row }">
          <el-tag
            style="margin: 0 5px 5px 0"
            v-for="item in row.attrValueList"
            :key="item.id"
          >
            {{ item.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button text type="primary" icon="Edit" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button
            text
            type="danger"
            icon="Delete"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type {
  attrsParamsAsgType,
  deleteResponseData,
} from '@/api/product/attr/type'
import { deleteAttrValue } from '@/api/product/attr/attr'
import { ElMessageBox, ElMessage } from 'element-plus'
let categoryAllList = ref<any[]>()
let emit = defineEmits(['edit', 'changeCategoryAllList'])
const handleEdit = (row: attrsParamsAsgType) => {
  emit('edit', row)
}
const handleDelete = (row: attrsParamsAsgType) => {
  const { categoryId } = row
  if (categoryId) {
    ElMessageBox.confirm('确定删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        const result: deleteResponseData = await deleteAttrValue(
          row.id as number | string,
        )
        if (result.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          nextTick(() => {
            emit('changeCategoryAllList', row.id)
          })
        }
      })
      .catch(() => {})
  }
}

defineExpose({
  categoryAllList,
})
</script>

<style scoped></style>
