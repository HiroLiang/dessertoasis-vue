<script setup>
import { reactive } from 'vue';
import { NButton } from 'naive-ui'

const props = defineProps({
    btnType: {
        type: Number
    },
    btnName: {
        type: String
    }
})

const btnTypes = reactive(['tertiary', 'primary', 'info', 'success', 'warning', 'error'])
</script>
<template>
    <n-button :type="btnTypes[props.btnType]" ghost>
        {{ btnName }}
    </n-button>
</template>