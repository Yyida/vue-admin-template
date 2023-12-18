<template>
  <div class="layout_container">
    <div class="layout_aside">
      <Logo></Logo>
      <el-scrollbar class="scrollbar_container">
        <el-menu background-color="#001529" text-color="#959ea6">
          <Menu :menuList="menus"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_nav"></div>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './components/Logo/index.vue'
import Menu from './components/Menu/index.vue'
import useUserStore from '@/store/modules/user'
import Main from './components/Main/index.vue'
const userStore = useUserStore()
const menus = userStore.routes
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_aside {
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    width: $base_menu_width;
    background: $base_menu_bg;
    .scrollbar_container {
      width: 100%;
      color: #fff;
    }
  }
  .layout_nav {
    position: fixed;
    top: 0;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: $base_nav-height;
    background: #00f;
  }
  .layout_main {
    position: absolute;
    top: $base_nav-height;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: calc(100vh - $base_nav-height);
    background: #0f0;
    overflow: auto;
    padding: 20px;
  }
}
</style>
