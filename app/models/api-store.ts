import { Instance, types, flow, getRoot } from 'mobx-state-tree'
import { withEnvironment } from './extensions'
import { toastError } from '../utils/toast-error'
import { BindAPIParams, UnBindAPIParams } from '../services/api/api.types'

export const ApiStoreModel = types
  .model('UcenterStore')
  .props({
    loading: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .actions(self => {
    const bindApi = flow(function * (payload: BindAPIParams): any {
      try {
        self.loading = true
        const { read, write } = yield self.environment.api.bindApi(payload)
        const { ucenterStore } = getRoot(self)
        yield ucenterStore.getUserInfo()
        return {
          pass: true,
          read,
          write,
        }
      } catch (e) {
        return {
          pass: false,
          msg:e.message
        }
      } finally {
        self.loading = false
      }
    })

    const unBindApi = flow(function * (payload: UnBindAPIParams): any {
      try {
        self.loading = true
        yield self.environment.api.unBindApi(payload)
        const { ucenterStore } = getRoot(self)
        yield ucenterStore.getUserInfo()
        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.loading = false
      }
    })

    // 判断是否存在交易
    const checkTaskPass = flow(function * (exchangeName): any {
      try {
        const { list }  = yield self.environment.api.getFollowList({ exchangeName, type: 0 })
        return list.length === 0 ? true : false // 有跟单则返回false
      } catch (e) {
        return false
      }
    })

    return {
      setExBindInfo (name = '', info = {}) {
        self[name] = info
      },
      bindApi,
      unBindApi,
      checkTaskPass,
    }
  })

export type ApiStore = Instance<typeof ApiStoreModel>
