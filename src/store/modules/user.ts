import { defineStore } from 'pinia'
import { userReqLogin } from '@/api/user'
import type { userStateType } from './types'
import { SET_TOKEN, GET_TOKEN } from '@/utils/localStorage'
import type {
  userLoginRequestArgType,
  userLoginResDataType,
} from '@/api/user/type'
import routes from '@/router/routes'

const useUserStore = defineStore({
  id: 'user',
  state: (): userStateType => ({
    token: GET_TOKEN(),
    routes: routes,
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
  },
})

export default useUserStore
