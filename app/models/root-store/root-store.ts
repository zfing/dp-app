import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { NavigationStoreModel } from '../../navigation/navigation-store'
import { SteupStoreModel } from '../steup-store'
import { UcenterStoreModel } from '../ucenter-store'
import { ApiStoreModel } from '../api-store'
import { KolStoreModel } from '../kol-store'
import { FollowListStoreModel } from '../follow-list-store'
import { FollowListHistoryStoreModel } from '../follow-list-history-store'
import { CurrentHoldStoreModel } from '../current-hold-store'
import { FollowDetailStoreModel } from '../follow-detail-store'

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  steupStore: types.optional(SteupStoreModel, {}),
  ucenterStore: types.optional(UcenterStoreModel, {}),
  apiStore: types.optional(ApiStoreModel, {}),
  kolStore: types.optional(KolStoreModel, {}),
  followListStore: types.optional(FollowListStoreModel, {}),
  followListHistoryStore: types.optional(FollowListHistoryStoreModel, {}),
  currentHoldStore: types.optional(CurrentHoldStoreModel, {}),
  followDetailStore: types.optional(FollowDetailStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
