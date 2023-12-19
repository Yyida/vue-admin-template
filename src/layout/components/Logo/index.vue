<template>
  <div class="logo_container">
    <!-- <SvgIcon name="vite" height="30px" width="30px"></SvgIcon> -->
    <img
      style="width: 30px; height: 30px"
      src="../../../assets/images/logo.jpg"
    />
    <span style="color: #fff">后台模板管理系统</span>
  </div>
</template>

<script setup lang="ts">
// import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<style scoped lang="scss">
.logo_container {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-top: 20px;
  span {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    text-emphasis: none;
    text-overflow: ellipsis;
  }
}
</style>
