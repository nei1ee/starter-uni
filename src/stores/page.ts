import type { NotifyOptions } from 'ano-ui'
import { pinia } from '~/modules/pinia'
interface PageConfig {
  showNavBar?: boolean
  showBackAction?: boolean
  showCustomAction?: boolean
  pageTitle?: string
}

export const usePageStore = defineStore('page', () => {
  const showNavBar = ref(true)
  const showBackAction = ref(false)
  const showCustomAction = ref(false)
  const pageTitle = ref('')
  const notifyRef = ref<{ showNotify: (options: NotifyOptions) => {} }>()

  const setPageConfig = (config: PageConfig = {}) => {
    showNavBar.value = config.showNavBar ?? true
    showBackAction.value = config.showBackAction ?? false
    showCustomAction.value = config.showCustomAction ?? false
    pageTitle.value = config.pageTitle ?? ''
  }

  const showNotify = (options: NotifyOptions) =>
    notifyRef.value!.showNotify(options)

  const pageReset = () => {
    showNavBar.value = true
    showBackAction.value = false
    showCustomAction.value = false
    pageTitle.value = ''
    notifyRef.value = undefined
  }

  return {
    setPageConfig,
    showNavBar,
    pageTitle,
    showBackAction,
    showCustomAction,
    notifyRef,
    showNotify,
    pageReset,
  }
})

// Need to be used outside the setup
export function usePageStoreWidthOut() {
  return usePageStore(pinia)
}
