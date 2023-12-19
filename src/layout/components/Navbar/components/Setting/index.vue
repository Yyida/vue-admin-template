<template>
  <div class="setting_container">
    <el-button icon="Refresh" circle />
    <el-button icon="FullScreen" circle />
    <el-button icon="Setting" circle />
    <img
      style="width: 30px; height: 30px; margin: 0 10px"
      src="../../../../../assets/images/logo.jpg"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        Admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.setting_container {
  display: flex;
  align-items: center;
}
</style>
