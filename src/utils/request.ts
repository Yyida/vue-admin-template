import axios from 'axios'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from './localStorage'
// 创建请求实例对象
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 6 * 10000,
})
// 配置请求拦截器
request.interceptors.request.use((config) => {
  // 配置请求头及其他配置信息
  if (GET_TOKEN()) {
    config.headers.token = `${GET_TOKEN()}`
  }
  return config
})
// 配置请求响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应成功处理
    return <any>response.data
  },
  (error) => {
    // 响应失败处理
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      switch (response.status) {
        case 400:
          ElMessage({
            type: 'error',
            message: '网络异常！',
          })
          break
        case 401:
          ElMessage({
            type: 'error',
            message: '未登录或登录已过期，请重新登录',
          })
          break
        case 403:
          ElMessage({
            type: 'error',
            message: '拒绝访问',
          })
          break
        case 404:
          ElMessage({
            type: 'error',
            message: '无效的请求链接！',
          })
          break
        default:
          ElMessage({
            type: 'error',
            message: '请求异常',
          })
          break
      }
    }
    return Promise.reject(error)
  },
)

// 导出请求实例对象
export default request
