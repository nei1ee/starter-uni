import type { LoginParams, LoginResult } from './model/userModel'
import { defHttp } from '~/utils/http'

enum Api {
  Login = '/login/',
}

export const loginApi = (params: LoginParams) =>
  defHttp.post<LoginResult>({ url: Api.Login, data: params }, { withToken: false })

