import { cloneDeep } from 'lodash-es'
import { joinTimestamp } from './helper'
import { checkStatus } from './checkStatus'
import type { RequestOptions, Result } from './types'
import { isString } from '~/utils/is'
import { getToken } from '~/utils/auth'
import { RequestEnum, ResultEnum } from '~/enums/httpEnum'
import { setObjToUrlParams } from '~/utils'

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
    const optionsTemp: RequestOptions = Object.assign({}, this.options.requestOptions, options)

    const {
      urlPrefix, apiUrl, joinPrefix, joinTime = true, withToken, joinParamsToUrl,
      isReturnNativeResponse, isTransformResponse,
    } = optionsTemp

    // token header
    const token = getToken()
    if (token && withToken !== false) {
      // jwt token
      Object.assign(configTemp.header, {
        Authorization: configTemp.authenticationScheme
          ? `${configTemp.authenticationScheme} ${token}`
          : token,
      })
    }

    // add prefix
    if (joinPrefix)
      configTemp.url = `${urlPrefix}${configTemp.url}`

    const params = configTemp.params || {}
    if (params) {
      if (configTemp.method?.toUpperCase() === RequestEnum.GET) {
        // add timestamp avoid cache
        if (!isString(params)) {
          configTemp.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
          if (joinParamsToUrl && configTemp.params) {
            configTemp.url = setObjToUrlParams(
              configTemp.url,
              Object.assign({}, configTemp.params, configTemp.data))
            configTemp.params = undefined
          }
        }
        else {
          // compatible with restful style
          configTemp.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
          configTemp.params = undefined
        }
      }
    }

    if (apiUrl && isString(apiUrl))
      configTemp.url = `${apiUrl}${configTemp.url}`

    return new Promise((resolve, reject) => {
      uni.request({
        url: configTemp.url,
        data: configTemp.data || {},
        method: configTemp.method?.toUpperCase() as UniApp.RequestOptions['method'],
        header: configTemp.header || {},
        success: (res) => {
          const data = res.data as Result
          const _message: string = data?.message ?? ''
          if (res.statusCode && res.statusCode !== 200) { checkStatus(res.statusCode, _message) }
          else if (!data) { throw new Error('[HTTP] Request has no return value') }
          else if (isReturnNativeResponse) { resolve(res as any) }
          else if (!isTransformResponse) { resolve(res.data as any) }
          else {
            //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
            // @ts-expect-error
            const { code, result, message } = data

            // 这里逻辑可以根据项目进行修改
            const hasSuccess = data && Reflect.has(data, 'code') && (code === ResultEnum.SUCCESS || code === 200)
            if (hasSuccess) { resolve(result as unknown as Promise<T>) }
            else {
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
            }
          }
        },
        fail: (e) => {
          reject(e.errMsg)
        },
        complete() { },
      })
    })
  }

  post<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  get<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  put<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
}
