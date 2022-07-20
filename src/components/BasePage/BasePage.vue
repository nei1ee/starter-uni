<script setup lang="ts">
import type { UNotifyOptions } from '../UNotify/types'

const appStore = useAppStore()
const pageStore = usePageStore()

const handleNavigateBack = () => uni.navigateBack({})

const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>()

onMounted(() => pageStore.notifyRef = notifyRef.value)
onShow(() => pageStore.notifyRef = notifyRef.value)
onHide(() => pageStore.pageReset())
onUnload(() => pageStore.pageReset())
</script>

<template>
  <div class="font-mono color-base relative text-base" :class="appStore.darkMode ? 'dark' : ''">
    <div class="bg-base-soft pb-safe color-base">
      <!-- custom navigation bar -->
      <div
        v-if="pageStore.showNavBar"
        class="bg-light-blue-500 text-white w-full top-0 z-200 fixed dark:bg-light-blue-600"
        :style="{ height: `${appStore.customBarHeight}px` }"
      >
        <div
          :style="{ 'padding-top': `${appStore.statusBarHeight}px`, 'height': `${appStore.customBarHeight - appStore.statusBarHeight}px` }"
        >
          <div class="h-full text-center px-6 relative">
            <div
              v-if="pageStore.showBackAction || pageStore.showCustomAction"
              class="flex h-full text-xl left-4 absolute justify-center items-center"
            >
              <slot name="navAction">
                <div
                  v-if="pageStore.showBackAction && !pageStore.showCustomAction" class="i-carbon-chevron-left"
                  @click="handleNavigateBack"
                />
              </slot>
            </div>
            <div class="flex h-full text-lg justify-center items-center">
              <slot name="navContent">
                {{ pageStore.pageTitle }}
              </slot>
            </div>
          </div>
        </div>
      </div>
      <UNotify ref="notifyRef" />
      <!-- page container -->
      <div
        class="overflow-auto"
        :style="{ 'height': `calc(100vh - ${appStore.customBarHeight}px)`, 'padding-top': `${appStore.customBarHeight}px` }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

