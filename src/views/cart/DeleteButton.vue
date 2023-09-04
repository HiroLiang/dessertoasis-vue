<script setup>
import { deleteCart } from "@/api/index"

const props = defineProps({
    cartId: {
        type: Number
    }
})

const emits = defineEmits(["delete"])

const handleDeleteCart = async () => {
    await deleteCart(props.cartId)
    emits("delete")
}

</script>

<template>
    <button @click="handleDeleteCart">刪除</button>
</template>