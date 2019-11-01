import { Instance, types, flow, cast, getRoot } from 'mobx-state-tree'
import { withEnvironment } from './extensions'
import { toastError } from '../utils/toast-error'

export const pageSize = 10

export const FollowListStoreModel = types
  .model('followListStore')
  .props({
    list: types.optional(types.array(types.frozen()), []),
    currentPage: types.optional(types.integer, 1),
    isRefreshing: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
    inStopCopy: types.optional(types.boolean, false),
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
        const { list } = yield self.environment.api.getFollowList({
          currentPage: 1,
          pageSize,
          type: 0,
        })
        self.list = list
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

        const { list } = yield self.environment.api.getFollowList({
          currentPage: self.currentPage + 1,
          pageSize,
          type: 0,
        })

        self.currentPage = self.currentPage + 1
        self.list = cast([...self.list, ...list])
      } catch (e) {
        toastError(e)
      } finally {
        self.isLoading = false
      }
    })

    const stopCopy = flow(function * (payload): any {
      try {
        self.inStopCopy = true
        yield self.environment.api.stopCopy(payload)
        refresh()
        const { followListHistoryStore } = getRoot(self)
        followListHistoryStore.refresh()
        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.inStopCopy = false
      }
    })

    return {
      refresh,
      load,
      stopCopy,
    }
  })

export type FollowListStore = Instance<typeof FollowListStoreModel>
