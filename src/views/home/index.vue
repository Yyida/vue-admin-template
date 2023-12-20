<template>
  <div>首页页面{{ userStore.username }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
console.log(userStore)
onMounted(() => {
  userStore.userInfo().then((res: any) => {
    console.log(res)
  })
})
</script>

<style scoped></style>
