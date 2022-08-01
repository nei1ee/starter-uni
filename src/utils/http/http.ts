import { cloneDeep } from 'lodash-es'
import qs from 'qs'
import { joinTimestamp } from './helper'
import { checkStatus } from './checkStatus'
import type { RequestOptions, Result } from './types'
import { isString } from '~/utils/is'
import { getToken } from '~/utils/auth'
import { RequestEnum, ResultEnum } from '~/enums/httpEnum'

const { showNotify } = usePageStoreWidthOut()

type UniRequestOptions = UniApp.RequestOptions & { params?: any }

export interface CreateRequestOptions extends UniRequestOptions {
  authenticationScheme?: string
  urlPrefix?: string
  requestOptions?: RequestOptions
}

export class VRequest {
  private readonly options: CreateRequestOptions

  constructor(options: CreateRequestOptions) {
    this.options = options
  }

  request<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    const configTemp: CreateRequestOptions = cloneDeep(Object.assign({}, this.options, config))
    const { requestOptions } = this.options
    const optionsTemp: RequestOptions = Object.assign({}, requestOptions, options)
    const {
      apiUrl, joinPrefix, joinTime = true, withToken, isReturnNativeResponse, isTransformResponse,
    } = optionsTemp

    if (joinPrefix)
      configTemp.url = `${configTemp.urlPrefix}${configTemp.url}`

    if (apiUrl && isString(apiUrl))
      configTemp.url = `${apiUrl}${configTemp.url}`

    const token = getToken()
    if (token && withToken !== false) {
      // jwt token
      Object.assign(configTemp.header, {
        Authorization: configTemp.authenticationScheme
          ? `${configTemp.authenticationScheme} ${token}`
          : token,
      })
    }

    let params = configTemp.params || {}
    if (configTemp.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params))
        params = qs.stringify((params), { arrayFormat: 'brackets' })

      configTemp.url = `${config.url}?${params}${joinTimestamp(joinTime, true)}`
      configTemp.params = undefined
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url: configTemp.url,
        data: configTemp.data || {},
        method: configTemp.method?.toUpperCase() as UniApp.RequestOptions['method'],
        header: configTemp.header || {},
        success: (res) => {
          const data = res.data as Result
          const _message: string = data?.message ?? ''
          if (res.statusCode && res.statusCode !== 200) {
            checkStatus(res.statusCode, _message)
            return
          }
          if (isReturnNativeResponse)
            resolve(res as any)

          if (!isTransformResponse)
            resolve(res.data as any)

          if (!data)
            throw new Error('[HTTP] Request has no return value')

          //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
          // @ts-expect-error
          const { code, data: result, message } = data

          // 这里逻辑可以根据项目进行修改
          const hasSuccess = data && Reflect.has(data, 'code') && code === (ResultEnum.SUCCESS || 200)
          if (hasSuccess)
            resolve(result as unknown as Promise<T>)

          let timeoutMsg = ''
          switch (code) {
            case ResultEnum.TIMEOUT:
              timeoutMsg = 'Login timed out, please log in again!'
              // @ts-expect-error
              // clean user state
              break
            default:
              if (message)
                timeoutMsg = message
          }
          showNotify({ type: 'error', message: timeoutMsg })

          throw new Error(timeoutMsg || 'The interface request failed, please try again later!')
        },
        fail: (e) => {
          reject(e.errMsg)
        },
        complete() { },
      })
    })
  }

  post<T = any>(config: UniRequestOptions, options?: any): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  get<T = any>(config: UniRequestOptions, options?: any): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  put<T = any>(config: UniRequestOptions, options?: any): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: UniRequestOptions, options?: any): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
}
