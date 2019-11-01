import { Instance, types, flow, cast } from 'mobx-state-tree'
import { withEnvironment } from './extensions'
import { toastError } from '../utils/toast-error'

export const pageSize = 10

export const CurrentHoldStoreModel = types
  .model('currentHoldStore')
  .props({
    current: types.optional(types.string, 'Binance'),

    list: types.optional(types.array(types.frozen()), []),
    currentPage: types.optional(types.integer, 1),
    isRefreshing: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .actions(self => {
    const isTheEndPage = () => {
      return self.currentPage * pageSize > self.list.length
    }

    const refresh = flow(function * (): any {
      if (self.isRefreshing) return
      try {
        self.isRefreshing = true
        self.list = yield self.environment.api.getHoldList({
          currentPage: 1,
          pageSize,
        })
        self.currentPage = 1
      } catch (e) {
        self.list = cast([])
        toastError(e)
      } finally {
        self.isRefreshing = false
      }
    })

    const load = flow(function * (): any {
      if (self.isRefreshing || self.isLoading || isTheEndPage()) return
      try {
        self.isLoading = true

        const kolList = yield self.environment.api.getHoldList({
          currentPage: self.currentPage + 1,
          pageSize,
        })

        self.currentPage = self.currentPage + 1
        self.list = cast([...self.list, ...kolList])
      } catch (e) {
        toastError(e)
      } finally {
        self.isLoading = false
      }
    })

    return {
      setCurrent (current = '') {
        self.current = current
        refresh()
      },
      refresh,
      load,
    }
  })

export type CurrentHoldStore = Instance<typeof CurrentHoldStoreModel>
