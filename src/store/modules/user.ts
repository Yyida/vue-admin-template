import { defineStore } from 'pinia'
import { userReqLogin, userReqInfo } from '@/api/user'
import type { userStateType } from './types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/localStorage'
import type {
  userLoginRequestArgType,
  userLoginResDataType,
  userInfoResType,
} from '@/api/user/type'
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
    userLogin({ username, password }: userLoginRequestArgType) {
      return new Promise<userLoginResDataType>((resolve, rejcet) => {
        userReqLogin({
          username,
          password,
        })
          .then((result) => {
            console.log(result)
            if (result) {
              SET_TOKEN(result.data.token)
              resolve(result)
            }
          })
          .catch((Error) => {
            rejcet(Error)
          })
      })
    },
    userInfo() {
      return new Promise<userInfoResType | any>((resolve, rejcet) => {
        userReqInfo()
          .then((result: any) => {
            if (result.code === 200) {
              console.log('userInfo 200 ', 200)
              this.username = result.data.checkUser.username
              this.avatar = result.data.checkUser.avatar
              console.log(this.username)
              console.log(this.avatar)
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
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        resolve(true)
      })
    },
  },
})

export default useUserStore
