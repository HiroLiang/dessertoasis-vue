<script setup>
import { getOrder } from '@/api/index'
import { onMounted, ref } from 'vue';

const props = defineProps({
    ordId: {
        type: Number
    }
})

const order = ref(null)

onMounted(async () => {
    order.value = await getOrder(ordId)
})


</script>

<template>

</template>