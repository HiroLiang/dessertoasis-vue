<script setup>
import { RouterView } from 'vue-router';
import { NBackTop, NLoadingBarProvider, NMessageProvider } from 'naive-ui'

</script>
<template>
  <n-message-provider>
    <n-loading-bar-provider>
      <RouterView />
    </n-loading-bar-provider>
    <n-back-top :right="50" />
  </n-message-provider>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>