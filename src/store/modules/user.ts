import { defineStore } from 'pinia'
import { userReqLogin, userReqInfo, userReqLogout } from '@/api/user'
import type {
  loginFormData,
  loginResData,
  userInfoResponseData,
} from '@/api/user/type'
import type { userStateType } from './types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/localStorage'
import routes from '@/router/routes'
const useUserStore = defineStore({
  id: 'user',
  state: (): userStateType => ({
    token: GET_TOKEN(),
    routes: routes as any,
    username: '',
    avatar: '',
  }),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    userLogin({ username, password }: loginFormData) {
      return new Promise<any>((resolve, rejcet) => {
        userReqLogin({
          username,
          password,
        })
          .then((result: loginResData) => {
            console.log(result)
            if (result.code === 200) {
              SET_TOKEN(result.data)
              resolve(result)
            }
          })
          .catch((Error) => {
            rejcet(Error)
          })
      })
    },
    userInfo() {
      return new Promise<any>((resolve, rejcet) => {
        userReqInfo()
          .then((result: userInfoResponseData) => {
            if (result.code === 200) {
              console.log(result)
              console.log('userInfo 200 ', 200)
              this.username = result.data.name
              this.avatar = result.data.avatar
              resolve(result)
            } else {
              resolve(result)
            }
          })
          .catch((err) => {
            rejcet(err)
          })
      })
    },
    logout() {
      return new Promise<any>((resolve) => {
        userReqLogout().then((result: any) => {
          console.log(result)
          if (result.code === 200) {
            this.token = ''
            this.username = ''
            this.avatar = ''
            REMOVE_TOKEN()
            resolve(true)
          }
        })
      })
    },
  },
})

export default useUserStore
