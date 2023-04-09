import type { LoginParams, LoginResult } from './model/userModel'
import { defHttp } from '~/utils/http'

enum Api {
  Login = '/login/',
}

export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResult>({ url: Api.Login, data: params }, { withToken: false })
}
