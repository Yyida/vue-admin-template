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
          @edit="onEdit"
          @changeCategoryAllList="updateCategoryAllList"
        />
      </div>
      <div v-show="isShow === 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input
              v-model="attrsParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!attrsParams.attrName"
          @click="onAddAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="onCancel">取消</el-button>

        <el-table style="margin: 10px 0" :data="attrsParams.attrValueList">
          <el-table-column
            label="序号"
            width="80"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputFocusArr[$index] = vc)"
                v-show="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="onToLook(row)"
              ></el-input>
              <el-tag @click="onToEdit(row, $index)" v-show="!row.flag">
                {{ row.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                link
                icon="Delete"
                @click="onDeleteAttrValue($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="onSaveAttrValue" :loading="saveLoad">
          保存
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, reactive } from 'vue'
import ReqParamsForm from './components/ReqParamsForm/index.vue'
import CategoryTable from './components/CategoryTable/index.vue'
import { getCategoryAll, saveOrUpdateAttrValue } from '@/api/product/attr/attr'
import type {
  categoryAllResponse,
  attrValueListType,
  attrsParamsAsgType,
  saveOrUpdateAttrValueResponse,
} from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

let categoryTableRef = ref()
let isShow = ref<number>(0)
let loading = ref<boolean>(false)
let disabledAdd = ref<boolean>(true)
let allCategoryParams = reactive<any>({
  category3Id: '',
  category2Id: '',
  category1Id: '',
})
let c3Id = ref<number | string>('')
let attrsParams = reactive<attrsParamsAsgType>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})
let saveLoad = ref<boolean>(false)
let inputFocusArr = ref<any>([])

interface paramsArgType {
  category3Id: number | string
  category2Id: number | string
  category1Id: number | string
}

const changeParams = async (params: paramsArgType) => {
  const { category3Id } = params
  if (category3Id) {
    allCategoryParams = Object.assign(params)
    c3Id.value = category3Id
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
  attrsParams.categoryId = c3Id.value || ''
}

const onCancel = () => {
  isShow.value = 0
  disabledAdd.value = false
  nextTick(() => {
    attrsParams = Object.assign(attrsParams, {
      attrName: '',
      categoryId: '',
      categoryLevel: 3,
      attrValueList: [],
    })
  })
}
const onAddAttrValue = (row: attrValueListType) => {
  if (row) {
    attrsParams.attrValueList.push({
      valueName: '',
      flag: true,
    })
  }
  if (attrsParams.attrValueList.length) {
    const valid = attrsParams.attrValueList.find((item: attrValueListType) => {
      return item.valueName == ''
    })
    if (!valid) {
      nextTick(() => {
        inputFocusArr.value[inputFocusArr.value.length - 1].focus()
      })
    }
  }
}

const onSaveAttrValue = async () => {
  if (attrsParams.attrName) {
    let check = true
    attrsParams.attrValueList.forEach((item) => {
      if (item.valueName === '' || !item.valueName) check = false
      return
    })
    if (check && attrsParams.attrValueList.length) {
      try {
        saveLoad.value = true
        const result: saveOrUpdateAttrValueResponse =
          await saveOrUpdateAttrValue(attrsParams)
        const { code } = result
        if (code === 200) {
          ElMessage({
            type: 'success',
            message: '保存成功',
          })
          nextTick(() => {
            attrsParams = Object.assign(attrsParams, {
              attrName: '',
              categoryId: '',
              categoryLevel: 3,
              attrValueList: [],
            })
            isShow.value = 0
            changeParams(allCategoryParams)
          })
        }
      } catch (err) {
        console.log(err)
      } finally {
        saveLoad.value = false
      }
    } else {
      ElMessage({
        message: '请至少添加一项属性值',
        type: 'error',
      })
    }
  } else {
    ElMessage({
      message: '请填写属性名称',
      type: 'error',
    })
  }
}

const onToLook = (row: attrValueListType) => {
  row.flag = !row.flag
  console.log(row)
  if (!row.valueName) {
    ElMessage({
      message: '属性值名称不能为空',
      type: 'warning',
    })
    row.flag = true
  }
  const repeat = attrsParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage({
      message: '属性值名称重复',
      type: 'warning',
    })
    row.flag = true
  }
}
const onToEdit = (row: attrValueListType, index: number) => {
  row.flag = !row.flag
  inputFocusArr.value[index].focus()
}

const onDeleteAttrValue = (index: number) => {
  attrsParams.attrValueList.splice(index, 1)
}

const onEdit = (row: attrsParamsAsgType) => {
  if (row) {
    isShow.value = 1
    disabledAdd.value = true
    attrsParams = Object.assign(attrsParams, JSON.parse(JSON.stringify(row)))
  }
}

const updateCategoryAllList = (id: number | string) => {
  if (id) {
    categoryTableRef.value.categoryAllList =
      categoryTableRef.value.categoryAllList.filter((item: any) => {
        return item.id != id
      })
  }
}
</script>

<style scoped></style>
