export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Whether to join url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // Whether to add a timestamp
  joinTime?: boolean
  // Whether to send token in header
  withToken?: boolean
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
}

export interface Result<T = any> {
  code: number
  type?: 'success' | 'error' | 'warning'
  message?: string
  result?: T
}
