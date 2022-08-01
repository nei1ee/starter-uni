export type UToastType = 'default' | 'success' | 'danger' | 'warning' | 'primary'

export interface UToastOptions {
  type?: UToastType
  msg: string
  duration?: number
}
