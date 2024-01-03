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
            style="margin: 0 5px"
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
import { ref } from 'vue'
let categoryAllList = ref<any[]>()
const handleEdit = (row: any) => {
  console.log(row)
}
const handleDelete = (row: any) => {
  console.log(row)
}

defineExpose({
  categoryAllList,
})
</script>

<style scoped></style>
