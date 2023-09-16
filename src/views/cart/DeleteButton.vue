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
    <button type="button" class="btn-close" aria-label="Close" @click="handleDeleteCart"></button>
</template>