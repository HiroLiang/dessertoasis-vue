<script setup>
import { NInput, NButton, NInputGroup } from 'naive-ui'
</script>

<template>
    <n-input-group>
        <n-input :style="{ width: '15%' }" />
        <n-button type="primary" ghost>
            搜索
        </n-button>
    </n-input-group>
</template>