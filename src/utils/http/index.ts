import { VRequest } from './http'
import { deepMerge } from '~/utils'
import { ContentTypeEnum } from '~/enums/httpEnum'

const apiUrl = import.meta.env.VITE_GLOB_API_URL

function createRequest(options?: any) {
  return new VRequest(deepMerge(
    {
      url: '',
      timeout: 5 * 1000,
      // authenticationScheme: 'Bearer',
      authenticationScheme: '',

      header: { 'Content-Type': ContentTypeEnum.JSON },
      // 配置项，下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        urlPrefix: '',
        joinPrefix: false,
        // 接口地址
        apiUrl,
        // 消息提示类型
        errorMessageMode: 'message',
        // 请求参数拼接到url
        joinParamsToUrl: true,
        //  是否加入时间戳
        joinTime: true,
        // 请求头是否携带token
        withToken: true,
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        isReturnNativeResponse: false,
        // 需要对返回数据进行处理
        isTransformResponse: true,
      },
    },
    options || {},
  ))
}

export const defHttp = createRequest()

// other api url
// export const otherHttp = createRequest({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
