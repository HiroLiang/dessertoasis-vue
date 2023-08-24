<script setup lang="ts">
import { RouterView } from 'vue-router';
import { NBackTop, NLoadingBarProvider } from 'naive-ui'

</script>
<template>
  <n-loading-bar-provider>
    <RouterView />
  </n-loading-bar-provider>
  <n-back-top :right="50" />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
