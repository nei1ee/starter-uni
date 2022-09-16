export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  refresh: string
}
