<script setup>
import { RouterView } from 'vue-router';

import { NBackTop, NLoadingBarProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'

const placement = "top-right"
const notiPlacement = "bottom-right"

</script>
<template>
  <n-message-provider :placement="placement" :max="8">
    <n-notification-provider :placement="notiPlacement" style="font-size: 32px;">
      <n-loading-bar-provider>
        <RouterView />
      </n-loading-bar-provider>
      <n-back-top :right="50" />
    </n-notification-provider>
  </n-message-provider>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>