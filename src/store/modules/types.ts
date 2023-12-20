import { RouteRecordRaw } from 'vue-router'
export interface userStateType {
  token: string | null
  routes: RouteRecordRaw[]
  username: string
  avatar: string
}
