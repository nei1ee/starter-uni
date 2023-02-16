<script setup lang="ts">
import { loginApi } from '~/apis/sys/user'

const { setPageConfig, showNotify } = usePageStore()

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
    <div class="p-6">
      <AButton type="danger" block mt2 @click="showNotify({ type: 'danger', message: 'error' })">
        Show Error Notify
      </AButton>
      <AButton type="primary" block mt2 @click="showNotify({ type: 'primary', message: 'primary' })">
        Show Primary Notify
      </AButton>
      <AButton cc="bg-light-blue border-none" block mt2 icon="i-carbon-notification" @click="handleTestApi">
        Custom Button
      </AButton>
    </div>
    <div class="u-bg-2 m-6 rounded-lg p-6">
      <div class="text-center">
        abcdefghijklmnopqrstuvwxyz
        <div class="u-text-color-2" text="red right" p-2>
          1234567890
        </div>
      </div>
    </div>
  </UBasePage>
</template>

<style scoped>

</style>
