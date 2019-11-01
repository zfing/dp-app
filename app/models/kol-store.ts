import { Instance, types, flow, cast, getRoot } from 'mobx-state-tree'
import { withEnvironment } from './extensions'
import { toastError } from '../utils/toast-error'
import { GetKolDetailParams } from '../services/api/api.types'

export const pageSize = 10

export const KolStoreModel = types
  .model('KolStore')
  .props({
    // list page
    list: types.optional(types.array(types.frozen()), []),
    rankType: types.optional(types.integer, 4),
    currentPage: types.optional(types.integer, 1),
    isRefreshing: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),

    // detail page
    detail: types.optional(types.frozen(), {}),
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
        self.list = yield self.environment.api.getKolList({
          rankType: self.rankType,
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

        const kolList = yield self.environment.api.getKolList({
          rankType: self.rankType,
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

    const getDetail = flow(function * (payload: GetKolDetailParams): any {
      try {
        self.detail = yield self.environment.api.getKolDetail(payload)
      } catch (e) {
        toastError(e)
        self.detail = {}
      }
    })

    const follow = flow(function * (params): any {
      try {
        self.isLoading = true
        const { followNumber, stopNumber, detail, fee, type } = params
        const payload = {
          amount: followNumber,
          stopLossLine: stopNumber,
          type,
          exchangeName: detail.exchange,
          targetUserId: detail.userId,
          fee,
        }
        
        yield self.environment.api.follow(payload)

        const { followListStore } = getRoot(self)
        followListStore.refresh()
        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.isLoading = false
      }
    })

    const renewal = flow(function * (payload): any {
      try {
        self.isLoading = true
        yield self.environment.api.renew(payload)
        return true
      } catch (e) {
        toastError(e)
      } finally {
        self.isLoading = false
      }
    })

    return {
      setKolTag (tag = 1) {
        self.rankType = tag
        self.list = cast([])
        refresh()
      },
      refresh,
      load,
      getDetail,
      follow,
      renewal,
    }
  })

export type KolStore = Instance<typeof KolStoreModel>
