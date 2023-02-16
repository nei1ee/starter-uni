<script setup lang="ts">
import type { NotifyOptions } from 'ano-ui'

const { darkMode, customBarHeight, statusBarHeight } = storeToRefs(useAppStore())
const { pageReset } = usePageStore()
const {
  showNavBar, showBackAction, showCustomAction, pageTitle, notifyRef: _notifyRef,
} = storeToRefs(usePageStore())

const handleNavigateBack = () => uni.navigateBack({})

const notifyRef = ref<{ showNotify: (options: NotifyOptions) => {} }>()

onMounted(() => {
  _notifyRef.value = notifyRef.value
})

onUnmounted(() => pageReset())
</script>

<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="relative text-base u-bg u-text-color">
      <!-- custom navigation bar -->
      <div
        v-if="showNavBar" class="fixed top-0 z-200 w-full font-bold text-white bg-primary"
        :style="{ height: `${customBarHeight}px` }"
      >
        <div :style="{ 'padding-top': `${statusBarHeight}px`, 'height': `${customBarHeight - statusBarHeight}px` }">
          <div class="relative h-full px-6 text-center">
            <div
              v-if="showBackAction || showCustomAction"
              class="absolute left-4 h-full flex items-center justify-center text-xl"
            >
              <slot name="navAction">
                <div
                  v-if="showBackAction && !showCustomAction" class="i-carbon-chevron-left"
                  @click="handleNavigateBack"
                />
              </slot>
            </div>
            <div class="h-full flex items-center justify-center text-lg">
              <slot name="navContent">
                {{ pageTitle }}
              </slot>
            </div>
          </div>
        </div>
      </div>
      <ANotify ref="notifyRef" :cs="{ top: `${customBarHeight}px` }" cc="z-150" />
      <!-- page container -->
      <div
        class="overflow-auto"
        :style="{ 'height': `calc(100vh - ${customBarHeight}px)`, 'padding-top': `${customBarHeight}px` }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
