import * as storage from '../../utils/storage'
import { STORAGE_TOKEN } from '../../utils/constants'

export const getToken = async () => {
  const token = await storage.loadString(STORAGE_TOKEN)
  return token
}

export const logged = async () => {
  const token = await getToken()
  return !!token
}

export const login = async (token: string) => {
  await storage.saveString(STORAGE_TOKEN, token)
}

export const logout = async () => {
  await storage.remove(STORAGE_TOKEN)
}
