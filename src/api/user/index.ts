import request from '@/utils/request'
import type { loginFormData, loginResData, userInfoResponseData } from './type'

enum userApi {
  USER_LOGIN_API = '/admin/acl/index/login',
  USER_INFO_API = '/admin/acl/index/info',
  USER_LOGOUT_API = '/admin/acl/index/logout',
}
// 定义用户请求接口
// 用户登录
export const userReqLogin = (data: loginFormData) =>
  request.post<any, loginResData>(userApi.USER_LOGIN_API, data)

// 获取用户信息
export const userReqInfo = () =>
  request.get<any, userInfoResponseData>(userApi.USER_INFO_API)

// 退出登录
export const userReqLogout = () => request.post<any>(userApi.USER_LOGOUT_API)
