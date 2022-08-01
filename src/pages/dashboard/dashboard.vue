<script setup lang="ts">
const { setPageConfig, showNotify, showToast } = usePageStore()

onShow(() => {
  setPageConfig({
    pageTitle: 'Dashboard',
  })
})
</script>

<template>
  <UBasePage>
    <div class="p-6">
      <UButton type="error" @click="showNotify({ type: 'error', message: 'error' })">
        Show error Notify
      </UButton>
      <UButton type="primary" @click="showNotify({ type: 'primary', message: 'primary' })">
        Show Primary Notify
      </UButton>
      <UButton bg="bg-orange" icon="i-carbon-notification" @click="showNotify({ type: 'success', message: 'success' })">
        Custom Button
      </UButton>
    </div>
    <div class="bg-base-second m-6 rounded-lg p-6 border-base">
      <div class="text-center">
        abcdefghijklmnopqrstuvwxyz
        <div class="color-base-second">
          1234567890
        </div>
      </div>
    </div>
    <div class="p-6">
      <UButton type="default" @click="showToast({ type: 'default', message: 'error' })">
        Show Toast
      </UButton>
    </div>
  </UBasePage>
</template>

<style scoped>
</style>
