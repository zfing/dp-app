import { Instance, types, flow } from 'mobx-state-tree'
import { withEnvironment } from './extensions'
import { toastError } from '../utils/toast-error'
import { GetFollowDetailParams } from '../services/api/api.types'

export const pageSize = 10

export const FollowDetailStoreModel = types
  .model('FollowDetail')
  .props({
    isLoading: types.optional(types.boolean, false),
    detail: types.optional(types.frozen(), {}),
  })
  .extend(withEnvironment)
  .actions(self => {

    const getDetail = flow(function * (payload: GetFollowDetailParams): any {
      try {
        self.detail = yield self.environment.api.getFollowDetail(payload)
      } catch (e) {
        toastError(e)
        self.detail = {}
      }
    })

    return {
      getDetail,
    }
  })

export type FollowDetailStore = Instance<typeof FollowDetailStoreModel>
