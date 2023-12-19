<template>
  <div class="layout_container">
    <div class="layout_aside" :class="settingStore.fixedHeader ? 'fixed' : ''">
      <Logo></Logo>
      <el-scrollbar class="scrollbar_container">
        <el-menu
          style="border-right: none"
          :default-active="$router.path"
          background-color="#001529"
          text-color="#959ea6"
          unique-opened
          :collapse="settingStore.fixedHeader"
        >
          <Menu :menuList="menus"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_nav" :class="settingStore.fixedHeader ? 'fixed' : ''">
      <Navbar></Navbar>
    </div>
    <div class="layout_main" :class="settingStore.fixedHeader ? 'fixed' : ''">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './components/Logo/index.vue'
import Menu from './components/Menu/index.vue'
import Main from './components/Main/index.vue'
import Navbar from './components/Navbar/index.vue'
import useUserStore from '@/store/modules/user'
import useSetting from '@/store/modules/setting'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const settingStore = useSetting()
const $router = useRoute()
console.log($router)
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
    transition: all 0.3s;
    .scrollbar_container {
      width: 100%;
      color: #fff;
    }
    .scrollbar_container::-webkit-scrollbar {
      width: 10px; /* 滚动条宽度 */
    }
    &.fixed {
      width: $base_menu_min_width;
    }
  }
  .layout_nav {
    position: fixed;
    top: 0;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: $base_nav-height;
    transition: all 0.3s;
    &.fixed {
      left: $base_menu_min_width;
      width: calc(100% - $base_menu_min_width);
    }
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
    transition: all 0.3s;
    &.fixed {
      left: $base_menu_min_width;
      width: calc(100% - $base_menu_min_width);
    }
  }
}
</style>
