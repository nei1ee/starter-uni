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
      color: 'success',
      content: '登录成功',
    })
  }
}
</script>

<template>
  <UBasePage>
    <div class="p-6" flex="~ col gap2" justify-center>
      <AButton color="danger" block @click="showNotify({ color: 'danger', content: 'error' })">
        Show Error Notify
      </AButton>
      <AButton color="primary" block @click="showNotify({ color: 'primary', content: 'primary' })">
        Show Primary Notify
      </AButton>
      <AButton cc="bg-orange border-orange" block icon="i-carbon-notification" @click="handleTestApi">
        Custom Button
      </AButton>
    </div>
    <div class="bg-base-second m-6 rounded-lg p-6 border-base">
      <div class="text-center">
        abcdefghijklmnopqrstuvwxyz
        <div class="color-base-second" text="red right" p-2>
          1234567890
        </div>
      </div>
    </div>
  </UBasePage>
</template>

<style scoped>

</style>
