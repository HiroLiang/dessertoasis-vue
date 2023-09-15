<script setup>
import { deleteCart } from "@/api/index"
import { useCartStore } from "@/stores/cart";

const props = defineProps({
    cartId: {
        type: Number
    }
})

const emits = defineEmits(["delete"])

const cart = useCartStore()

const handleDeleteCart = async () => {
    await deleteCart(props.cartId)
    emits("delete")
    await cart.getCartCount()
}

</script>

<template>
    <button class="btn btn-danger" @click="handleDeleteCart">刪除</button>
</template>