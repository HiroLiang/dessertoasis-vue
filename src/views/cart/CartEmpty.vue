<script setup>
import { NResult, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <n-result status="418" title="購物車是空的">
      <template #footer>
        <n-button @click="router.push('/')">看看商品吧</n-button>
      </template>
    </n-result>
 </template>