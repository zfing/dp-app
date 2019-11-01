import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from './api-problem'
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config'
import md5 from 'blueimp-md5'
import { isJson } from '@crude/extras'
import * as Types from './api.types'
import { message } from './api-message'
import * as auth from '../auth'
import Throw from '../../utils/throw'

export function encryptPwd(password) {
  return md5(password, 'btoto123')
}

export function handlePayload(payload) {
  if (isJson(payload)) {
    if (payload.password) {
      payload.password = encryptPwd(payload.password)
    }
  }
  return payload
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    })
  }

  async create(apiGen: string, payload?: object) {
    let method = 'get'
    let url = ''

    const [part1, part2] = apiGen.split(' ')
    if (part2) {
      method = part1
      url = part2
    } else {
      url = part1
    }

    const userToken = await auth.getToken()

    userToken && this.apisauce.setHeader('userToken', userToken)

    const response: ApiResponse<any> = await this.apisauce[method](url, handlePayload(payload))

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) {
        throw Error('网络异常')
      } else {
        throw Error('未知错误')
      }
    }

    const { resultCode, data } = response.data

    if (Number(resultCode) === 0) {
      return data
    } else if ([1012, 1016, 1017].indexOf(Number(resultCode)) !== -1) {
      throw Throw('登录信息失效', '@TOKEN_FAIL')
    } else {
      throw Error(message(Number(resultCode)))
    }
  }

  async login(payload: Types.LoginParams): Promise<any> {
    const result = await this.create('post /btoto/account/login', payload)
    return result
  }

  async logout(): Promise<any> {
    const result = await this.create('/btoto/account/loginOut')
    return result
  }

  async register(payload: Types.RegisterParams): Promise<any> {
    const result = await this.create('post /btoto/account/register', payload)
    return result
  }

  async getValidateCode(payload: Types.ValidateCodeParams): Promise<any> {
    const result = await this.create('/btoto/account/getValidateCode', payload)
    return result
  }

  async bindApi(payload: Types.BindAPIParams): Promise<Types.GetBindAPIResult> {
    const result = await this.create('post /btoto/account/saveAPI', payload)
    return result
  }

  async unBindApi(payload: Types.UnBindAPIParams): Promise<void> {
    await this.create('/btoto/account/unbindAPI', payload)
  }

  async getUserInfo(): Promise<Types.GetUserInfoResult> {
    const result = await this.create('/btoto/account/getUserInfo')
    return result
  }

  async getKolList(payload: Types.GetKolListParams): Promise<Types.GetKolListResult> {
    const result = await this.create('/btoto/info/Kolinfo', payload)
    return result
  }

  async getKolDetail(payload: Types.GetKolDetailParams): Promise<Types.GetKolDetailResult> {
    const result = await this.create('/btoto/info/Koldetail', payload)
    return result
  }

  async resetPwd(payload: Types.ResetPwdParams): Promise<any> {
    const result = await this.create('post /btoto/account/findpassword', payload)
    return result
  }

  async follow(payload: any): Promise<any> {
    const result = await this.create('/btoto/info/copyTrade', payload)
    return result
  }

  async getFollowList(payload: Types.FollowListParams): Promise<any> {
    const result = await this.create('/btoto/info/copyTrade/list', payload)
    return result
  }

  async getHoldList(payload: any): Promise<any> {
    // const result = await this.create('/btoto/info/Kolinfo', payload)
    return [
      { id: '1', hold: 1, name: 'BTC', income: '312.4', rate: '23.3', operation: '关闭仓位', kaverage: '10520.9', sign: '现货', price1: '10520.3', price2: '10520.3', price3: '10520.3', price4: '10520.3', num0: '1.4', num1: '1.8', num2: '1.3', num3: '1.4', num4: '1.9', time1: '19.09.12 13:32', time2: '19.09.12 13:32', time3: '19.09.12 13:32', time4: '19.09.12 13:32' },
      { id: '2', hold: 1, name: 'BTC', income: '312.4', rate: '23.3', operation: '关闭仓位', kaverage: '10520.9', sign: '做空', price1: '10520.3', price2: '10520.3', price3: '10520.3', price4: '10520.3', num0: '1.3', num1: '1.8', num2: '1.3', num3: '1.4', num4: '1.9', time1: '19.09.12 13:32', time2: '19.09.12 13:32', time3: '19.09.12 13:32', time4: '19.09.12 13:32' },
      { id: '3', hold: 1, name: 'BTC', income: '312.4', rate: '23.3', operation: '关闭仓位', kaverage: '10520.9', sign: '现货', price1: '10520.3', price2: '10520.3', price3: '10520.3', price4: '10520.3', num0: '1.5', num1: '1.8', num2: '1.3', num3: '1.4', num4: '1.9', time1: '19.09.12 13:32', time2: '19.09.12 13:32', time3: '19.09.12 13:32', time4: '19.09.12 13:32' },
      { id: '4', hold: 1, name: 'BTC', income: '312.4', rate: '23.3', operation: '关闭仓位', kaverage: '10520.9', sign: '做多', price1: '10520.3', price2: '10520.3', price3: '10520.3', price4: '10520.3', num0: '1.4', num1: '1.8', num2: '1.3', num3: '1.4', num4: '1.9', time1: '19.09.12 13:32', time2: '19.09.12 13:32', time3: '19.09.12 13:32', time4: '19.09.12 13:32' }
    ]
  }

  async stopCopy(payload: Types.StopCopyParams): Promise<any> {
    const result = await this.create('/btoto/info/stopCopy', payload)
    return result
  }

  async getRelation(payload: any): Promise<any>  {
    const result = await this.create('/btoto/info/relation/status', payload)
    return result
  }

  async getFollowDetail(payload: any): Promise<any> {
    const result = await this.create('/btoto/info/copyTrade/info', payload)
    return result
  }

  async renew(payload: any): Promise<any>  {
    const result = await this.create('/btoto/info/copyTrade/renew', payload)
    return result
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get('/users')

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: 'ok', users: resultUsers }
    } catch {
      return { kind: 'bad-data' }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: 'ok', user: resultUser }
    } catch {
      return { kind: 'bad-data' }
    }
  }

  async getHttpsData () {
    this.apisauce.setBaseURL('https://api.dapaopingji.com/api')

    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get('/rating/getFreshRatings')
    console.log(response)
  }
}
