<script setup>
import { onBeforeMount } from 'vue';
import { useCartStore } from '../../stores/cart'

const store = useCartStore()


onBeforeMount(() => {
    store.initCart()
})
</script>
<template></template>
<style scoped></style>