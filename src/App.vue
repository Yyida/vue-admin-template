<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import { userReqLogin } from '@/api/user'
import { onMounted } from 'vue'

onMounted(() => {
  // userReqLogin({
  //   username: 'admin',
  //   password: '123456',
  // }).then((res) => {
  //   console.log(res)
  // })
  fetchUserInfo()
})

const fetchUserInfo = () => {
  userReqLogin({
    username: 'admin',
    password: '123456',
  }).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="title">hello world!</div>
  <el-button type="primary" :icon="Edit">按钮</el-button>
  <svg>
    <use xlink:href="#icon-vue"></use>
  </svg>
  <SvgIcon name="vue" width="50px" height="50px"></SvgIcon>
  <Pagination></Pagination>
</template>

<style scoped lang="scss">
.title {
  color: $base_color;
}
</style>
