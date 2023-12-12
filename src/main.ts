import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入element-plus的语言包
import locale from 'element-plus/lib/locale/lang/zh-cn'
// svg 插件配置
import 'virtual:svg-icons-register'
// 导入自定义插件组件
import GlobalComponents from '@/components'
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus, {
  locale, // 设置element-plus的语言包
})
// 安装自定义插件
app.use(GlobalComponents)
app.mount('#app')

// createApp(App).mount('#app')
