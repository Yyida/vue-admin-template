import request from '@/utils/request'
import type { userLoginRequestArgType } from './type'

enum userApi {
  USER_LOGIN_API = '/user/login',
  USER_INFO_API = '/user/info',
}
// 定义用户请求接口
// 用户登录
export const userReqLogin = (data: userLoginRequestArgType) =>
  request.post(userApi.USER_LOGIN_API, data)

// 获取用户信息
export const userReqInfo = () => request.get(userApi.USER_INFO_API)
