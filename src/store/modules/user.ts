import { defineStore } from 'pinia'
import { userReqLogin, userReqInfo } from '@/api/user'
import type { userStateType } from './types'
import { SET_TOKEN, GET_TOKEN } from '@/utils/localStorage'
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
    routes: routes,
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
            debugger
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
      return new Promise<userInfoResType>((resolve, rejcet) => {
        userReqInfo()
          .then((result) => {
            console.log(result)
            if (result) {
              this.username = result.data.checkUser.username
              this.avatar = result.data.checkUser.avatar
              resolve(result)
            }
          })
          .catch((err) => {
            rejcet(err)
          })
      })
    },
  },
})

export default useUserStore
