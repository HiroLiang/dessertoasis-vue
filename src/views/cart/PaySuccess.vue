<script setup>
import { useRouter } from 'vue-router';
import { NResult, NButton } from 'naive-ui';

const router = useRouter()

</script>

<template>
    <n-result status="success" title="訂單已成立">
        <template #footer>
            <n-button @click="router.push('/order')">前往我的訂單</n-button>
            <!-- <n-button @click="router.push('/product')">繼續去逛逛</n-button> -->
        </template>
    </n-result>
</template>