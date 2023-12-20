<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="isRefresh" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()
const isRefresh = ref(true)

watch(
  () => settingStore.refresh,
  () => {
    isRefresh.value = false
    nextTick(() => {
      isRefresh.value = true
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  /* transform: scale(0); */
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-to {
  opacity: 1;
  /* transform: scale(1); */
}
</style>
