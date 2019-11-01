import { Instance, types, flow } from 'mobx-state-tree'
import { withEnvironment } from './extensions'
import { toastError } from '../utils/toast-error'
import { FieldsTypes, parseUserInfoResult } from '../utils/values'
import * as auth from '../services/auth'

const EX_NAMES = ['Binance', 'Huobi', 'OKEx', 'BitMex']

// 处理更新用户信息时间间隔
let lastTime: number = 0
const interval = 1000 * 3 // 秒

export const UcenterStoreModel = types
  .model('UcenterStore')
  .props({
    // initialAccount: types.optional(types.string, ''),
    loading: types.optional(types.boolean, false),
    userInfo: types.optional(types.frozen(), {}),

    Binance: types.optional(types.frozen(), {}),
    Huobi: types.optional(types.frozen(), {}),
    OKEx: types.optional(types.frozen(), {}),
    BitMex: types.optional(types.frozen(), {}),
  })
  .extend(withEnvironment)
  .actions(self => {
    const setTrade = (tradeInfo) => {
      EX_NAMES.forEach(exchangeName => {
        const exInfo = tradeInfo[exchangeName] || {}
        const { api = {}, detail = {} } = exInfo
        self[exchangeName] = Object.assign({}, api, detail, {
          bind: (api.read || api.write) ? true : false
        })
      })
    }

    const getUserInfo = flow(function * (): any {
      try {
        const now = Date.now()
        const duration = now - lastTime

        if (lastTime && (duration < interval)) {
          return null
        } else {
          lastTime = now
        }

        if (yield auth.logged()) {
          const result = yield self.environment.api.getUserInfo()
          const { tradeInfo, userInfo } = parseUserInfoResult(result)
          self.userInfo = userInfo
          setTrade(tradeInfo) 
        }
      } catch (e) {
        self.userInfo = {}
        setTrade({})
        toastError(e)
      }
    })

    const register = flow(function * (fields: FieldsTypes): any {
      try {
        self.loading = true

        const { account, password, validateCode } = fields

        const isEmail = account.indexOf('@') !== -1
        const payload = {
          [isEmail ? 'email' : 'phone']: account,
          regType: isEmail ? 1 : 2,
          password,
          validateCode,
        }

        yield auth.login(yield self.environment.api.register(payload))

        getUserInfo()
        // self.initialAccount = account

        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.loading = false
      }
    })

    const login = flow(function * (fields): any {
      try {
        self.loading = true

        const { account, password } = fields

        const isEmail = account.indexOf('@') !== -1
        const payload = {
          [isEmail ? 'email' : 'phone']: account,
          loginType: isEmail ? 1 : 2,
          password,
        }
        yield auth.login(yield self.environment.api.login(payload))
        // self.initialAccount = account

        getUserInfo()

        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.loading = false
      }
    })

    const loginWithCode = flow(function * (fields): any {
      try {
        self.loading = true

        const { account, validateCode } = fields

        const isEmail = account.indexOf('@') !== -1

        const payload = {
          loginType: 3,
          validateCode,
        }

        payload[isEmail ? 'email' : 'phone'] = account

        auth.login(yield self.environment.api.login(payload))
        // self.initialAccount = account

        getUserInfo()

        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.loading = false
      }
    })

    const getRegCode = flow(function * (account: string) {
      try {
        const isEmail = account.indexOf('@') !== -1
        const payload = {
          account,
          accType: isEmail ? 1 : 2,
          type: 1,
        }
        yield self.environment.api.getValidateCode(payload)
      } catch (e) {
        toastError(e)
      }
    })

    const getLogCode = flow(function * (account: string) {
      try {
        const isEmail = account.indexOf('@') !== -1
        const payload = {
          account,
          accType: isEmail ? 1 : 2,
          type: 3,
        }
        yield self.environment.api.getValidateCode(payload)
      } catch (e) {
        toastError(e)
      }
    })

    const getRestCode = flow(function * (account: string) {
      try {
        const isEmail = account.indexOf('@') !== -1

        const payload = {
          account: account,
          accType: isEmail ? 1 : 2,
          type: 4,
        }
        yield self.environment.api.getValidateCode(payload)
      } catch (e) {
        toastError(e)
      }
    })

    const logout = flow(function * (): any {
      try {
        self.loading = true
        yield self.environment.api.logout()
      } catch (e) {
        toastError(e)
      } finally {
        self.loading = false
        auth.logout()
        self.userInfo = {}
        setTrade({})
        return true
      }
    })

    const resetPwd = flow(function * (fields): any {
      try {
        self.loading = true
        auth.login(yield self.environment.api.resetPwd(fields))
        getUserInfo()
        // self.initialAccount = fields.account
        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.loading = false
      }
    })

    return {
      register,
      login,
      loginWithCode,
      getRegCode,
      getLogCode,
      getRestCode,
      logout,
      getUserInfo,
      resetPwd,
    }
  })

export type UcenterStore = Instance<typeof UcenterStoreModel>
