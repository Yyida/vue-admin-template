<template>
  <div class="logo_container">
    <SvgIcon name="vite" height="30px" width="30px"></SvgIcon>
    <p>后台模板管理系统</p>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<style scoped lang="scss">
.logo_container {
  width: 100%;
  heigh: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
  p {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
  }
}
</style>
