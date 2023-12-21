<template>
  <div class="setting_container">
    <el-button icon="Refresh" circle @click="refresh" />
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <el-button icon="Setting" circle />
    <img style="width: 30px; height: 30px; margin: 0 10px" :src="avatar" />
    <el-dropdown>
      <span class="el-dropdown-link">
        Admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
let userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()
const avatar = ref('')

const refresh = () => {
  settingStore.refresh = !settingStore.refresh
}
const fullScreen = () => {
  let isFull = document.fullscreenElement
  if (!isFull) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  const result = await userStore.logout()
  if (result) {
    console.log($route)
    const { path } = $route
    $router.push({
      path: '/login',
      query: {
        redirect: path,
      },
    })
  }
}
onMounted(() => {
  avatar.value = userStore.avatar
})
</script>

<style scoped lang="scss">
.setting_container {
  display: flex;
  align-items: center;
}
</style>
