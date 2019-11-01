import { Toast, BridgeActions } from '../components'
import * as auth from '../services/auth'

export async function toastError(e) {
  if (e.code === '@TOKEN_FAIL') {
    await auth.logout()
    BridgeActions.navigation.navigate({
      routeName: 'Login'
    })
  } else {
    Toast.show({
      type: 'danger',
      text: e.message,
    })
  }
}
// 暂时先写这个警告提示框用，不合适再删除
export function toastWarning(text) {
  Toast.show({
    type: 'warning',
    text: text,
  })
}
