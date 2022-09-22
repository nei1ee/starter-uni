<script setup lang="ts">
import { loginApi } from '~/apis/sys/user'

const { setPageConfig, showNotify, showToast } = usePageStore()

onShow(() => {
  setPageConfig({
    pageTitle: 'Dashboard',
  })
})
const handleTestApi = async () => {
  const res = await loginApi({ username: 'admin', password: '123456' })
  if (res.token) {
    showNotify({
      type: 'success',
      message: '登录成功',
    })
  }
}
</script>

<template>
  <UBasePage>
    <div class="p-6" flex="~ col gap2" justify-center>
      <UButton type="error" class="w-full" @click="showNotify({ type: 'error', message: 'error' })">
        Show Error Notify
      </UButton>
      <UButton type="primary" class="w-full" @click="showNotify({ type: 'primary', message: 'primary' })">
        Show Primary Notify
      </UButton>
      <UButton bg="bg-orange" class="w-full" icon="i-carbon-notification" @click="handleTestApi">
        Custom Button
      </UButton>
    </div>
    <div class="bg-base-second m-6 rounded-lg p-6 border-base">
      <div class="text-center">
        abcdefghijklmnopqrstuvwxyz
        <div class="color-base-second" text="red right" p-2>
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
