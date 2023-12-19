<template>
  <div class="navbar_container">
    <div class="navbar_lf">
      <el-icon
        style="margin: 0 20px; cursor: pointer"
        @click="toggleFixedHeader"
      >
        <component
          :is="settingStore.fixedHeader ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="navbar_rg">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb/index.vue'
import Setting from './components/Setting/index.vue'
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()

const toggleFixedHeader = () => {
  settingStore.fixedHeader = !settingStore.fixedHeader
}
</script>

<style scoped lang="scss">
.navbar_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  .navbar_lf {
    display: flex;
    align-items: center;
  }
}
</style>
