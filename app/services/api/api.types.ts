import { GeneralApiProblem } from './api-problem'

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: 'ok'; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: 'ok'; user: User } | GeneralApiProblem

export interface Pages {
  currentPage?: number;
  pageSize?: number;
}

export interface ValidateCodeParams {
  account: string
  accType: number // 1:邮箱 2:手机号
  type: number // 1:注册获取验证码 3:获取登录验证码
}

export interface LoginParams {
  email?: string,
  phone?: string,
  password?: string,
  validateCode?: string
  loginType: number, // 1:邮箱 2:手机号 3:手机验证码登陆
}

export interface RegisterParams {
  email?: string,
  phone?: string,
  password: string,
  validateCode: string
  regType: number, // 1:邮箱 2:手机号
}

export type ExchangeName = 'Binance' | 'Huobi' | 'OKEx' | 'BitMex';

export interface BindAPIParams {
  apikey: string;
  apisecret: string;
  exchangeName: ExchangeName;
  passphrase?: string;
}

export interface GetBindAPIResult {
  read?: boolean
  write?: boolean
}

export interface UnBindAPIParams {
  exchangeName: ExchangeName;
}

export interface UserInfo {
  id: number;
  email?: string;
  phone?: string;
  nickName?: string;
  avatarUrl?: string;
  role?: string;
}

export interface GetUserInfoResult {
  user: UserInfo;
  trade: string;
}

export interface GetKolListParams extends Pages {
  // tradeType: 1 | 2; //交易方式 1：现货 2：合约
  // rankType:  1 | 2 | 3 | 4 | 5 | 6; // 排序方式 1：综合排序 2：资金量 3：月收益额 4：月收益率 5:总收益额 6:总收益率
  rankType: number
}

export interface KolListItem {
  userId: number;
  name?: string;
  nickName?: string;
  avatarUrl?: string;
  exchange: ExchangeName;
  blanace: number;
  monthP: number;
  monthPR: number;
  totalP: number;
  totalPR: number;
}

export type GetKolListResult = KolListItem[]

export interface GetKolDetailParams {
  exchangeName: ExchangeName;
  userId: number;
}

export interface KolDetail {}

export type GetKolDetailResult = KolDetail

export interface ResetPwdParams {
  account: string
  password: string
  validateCode: string
}

export interface FollowListParams extends Pages {
  type: number; // 0：当前跟单 1：历史跟单
  exchangeName?: ExchangeName
}

export interface StopCopyParams {
  
}

export interface GetFollowDetailParams {
  id: number
}