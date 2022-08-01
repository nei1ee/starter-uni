import { TOKEN_KEY } from '~/enums/cacheEnum'

export function getAuthCache<T>(key: string) {
  return uni.getStorageSync(key) as T
}

export function setAuthCache(key: string, value: any) {
  return uni.setStorageSync(key, value)
}

export function getToken() {
  return getAuthCache(TOKEN_KEY)
}
