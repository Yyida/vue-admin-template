import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

const globalComponents: any = { SvgIcon, Pagination }

export default {
  install(app: any) {
    Object.keys(globalComponents).forEach((key: any) => {
      app.component(key, globalComponents[key])
    })
  },
}
