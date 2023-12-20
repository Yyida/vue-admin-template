import { defineStore } from 'pinia'

const useSettingStore = defineStore('setting', {
  state: () => ({
    theme: 'light',
    layout: 'side',
    fixedHeader: false,
    refresh: false, // 用于navbar的刷新
  }),
})

export default useSettingStore
