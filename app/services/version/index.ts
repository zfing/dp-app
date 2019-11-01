import DeviceInfo from 'react-native-device-info'

export const current = async () => {
  await DeviceInfo.getVersion()
  return true
}

export const isLatest = async (version) => {
  try {
    return version === await current()
  } catch {
    return false
  }
}
