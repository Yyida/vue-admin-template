// 定义接口参数类型
// 用户登录接口参数类型定义
export interface userLoginRequestArgType {
  username: string
  password: string
}

// 定义接口返回数据类型
export interface dataType {
  token?: string
  message?: string
  checkUser?: any
}

// 定义接口返回数据类型
export interface userLoginResDataType {
  code?: number
  data: dataType
}

// 获取用户信息接口参数类型定义
export interface userInfoResType {
  code?: number | string
  data: dataType
}
