<script setup lang="ts">
const pageStore = usePageStore()

onShow(() => {
  pageStore.setPageConfig({
    pageTitle: 'Dashboard',
  })
})
</script>

<template>
  <BasePage>
    <div class="p-6">
      <UButton type="danger" @click="pageStore.showNotify({ type: 'danger', msg: 'danger' })">
        Show Danger Notify
      </UButton>
      <UButton type="primary" @click="pageStore.showNotify({ type: 'primary', msg: 'primary' })">
        Show Primary Notify
      </UButton>
      <UButton bg="bg-orange" icon="i-carbon-notification" @click="pageStore.showNotify({ type: 'success', msg: 'success' })">
        Custom Button
      </UButton>
    </div>
  </BasePage>
</template>

<style scoped>
</style>
