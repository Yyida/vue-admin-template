// 用户信息接口的类型定义

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface loginFormData {
  username: string
  password: string
}

export interface loginResData extends ResponseData {
  data: string
}

export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    roles: string[]
    buttons: string[]
    name: string
    avatar: string
  }
}
