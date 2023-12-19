import { defineStore } from 'pinia'

const useSettingStore = defineStore('setting', {
  state: () => ({
    theme: 'light',
    layout: 'side',
    fixedHeader: false,
  }),
})

export default useSettingStore
