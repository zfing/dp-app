import { Instance, types } from 'mobx-state-tree'

export const SteupStoreModel = types
  .model('SteupStore')
  .props({
    version: types.optional(types.frozen(), 0)
  })
  .actions(self => ({
    setVersion(version) {
      self.version = version
    }
  }))

export type SteupStore = Instance<typeof SteupStoreModel>
