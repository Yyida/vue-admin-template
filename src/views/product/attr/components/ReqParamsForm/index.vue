<template>
  <div>
    <el-form :model="params" label-width="100px" label-position="right" inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="params.category1Id"
          placeholder="请选择一级分类"
          @change="onChangeCategory1"
          :disabled="isDisabled"
        >
          <el-option
            v-for="item in category1List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="params.category2Id"
          placeholder="请选择二级分类"
          @change="onChangeCategory2"
          :disabled="isDisabled"
        >
          <el-option
            v-for="item in category2List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="isDisabled"
          v-model="params.category3Id"
          placeholder="请选择三级分类"
          @change="onChangeCategory3"
        >
          <el-option
            v-for="item in category3List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  getCategory1List,
  getCategory2List,
  getCategory3List,
} from '@/api/product/attr/attr'
import type { paramsArg, categoryResponse } from '@/api/product/attr/type'
defineProps(['isDisabled'])
let emit = defineEmits(['changeParams'])
let params = reactive<paramsArg | any>({
  category1Id: '',
  category2Id: '',
  category3Id: '',
})
let category1List = ref<any | categoryResponse[]>([])
let category2List = ref<any | categoryResponse[]>([])
let category3List = ref<any | categoryResponse[]>([])
// 获取一级类型a
const fetchCategory1List = async () => {
  let result: categoryResponse = await getCategory1List()
  console.log(result)
  const { code, data } = result
  console.log(data)
  if (code === 200) {
    category1List.value = data
  }
}
// 获取二级类型
const onChangeCategory1 = async (val: paramsArg) => {
  if (val) {
    params.category1Id = val
    category2List.value = []
    category3List.value = []
    params = Object.assign(params, { category2Id: '', category3Id: '' })
    let result: categoryResponse = await getCategory2List(val)
    console.log(result)
    const { code, data } = result
    if (code === 200) {
      category2List.value = data
    }
    emit('changeParams', params)
  }
}
// 获取三级类型
const onChangeCategory2 = async (val: paramsArg) => {
  if (val) {
    params.category2Id = val
    category3List.value = []
    params = Object.assign(params, { category3Id: '' })
    let result: categoryResponse = await getCategory3List(val)
    const { code, data } = result
    if (code === 200) {
      console.log(data)
      category3List.value = data
    }
    emit('changeParams', params)
  }
}

// 向外暴露三级id 方法
const onChangeCategory3 = (val: paramsArg) => {
  if (val) {
    params.category3Id = val
  }
  emit('changeParams', params)
}

onMounted(() => {
  fetchCategory1List()
})
</script>

<style scoped></style>
