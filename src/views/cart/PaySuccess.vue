<script setup>
import { getOrder } from '@/api/index'
import { onMounted, ref } from 'vue';

const props = defineProps({
    order: Object
})

const order = props.order


</script>

<template>
    order
</template>