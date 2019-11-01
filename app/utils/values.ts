import R from 'ramda'
import { GetUserInfoResult } from '../services/api/api.types'

export interface FieldsTypes {
  [key: string]: any
}

export function parseAccount(payload: FieldsTypes) {
  const account = payload.account
  const isEmail = account.indexOf('@') !== -1
  return {
    [isEmail ? 'email' : 'phone']: account,
    type: isEmail ? 1 : 2, // 1:邮箱 2:手机号
  }
}

export function parseUserInfoResult(result: GetUserInfoResult) {
  const tradeResult = JSON.parse(result.trade)
  return {
    userInfo: result.user,
    tradeInfo: tradeResult.code === 1 ? tradeResult.ret : {}
  }
}

export function valueFixed (input: any, len = 1) {
  return Number((Number(input) || 0).toFixed(len))
}

export function valueWithColor(style = {}, value = 0, isBackgroundColor = false) {
  const attr = isBackgroundColor ? 'backgroundColor' : 'color'
  return {
    ...style,
    [attr]: value > 0 ? '#0BA194' : '#FF3B30'
  }
}

export function handleProfitMonth(data = []) {
  return R.sortWith(
    [
      R.ascend(R.prop('month'))
    ],
    data.map(_ => ({
      ..._,
      month: _.sDay.replace(/^(\d{4})(\d{2})(\d{2})$/, '$2'), // 01
    }))
  )
}
