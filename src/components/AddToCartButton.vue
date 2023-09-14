<script setup>
import { ref } from 'vue'
import { addToCart } from '../api/index'
import { useCartStore } from "../stores/cart";

const props = defineProps({
    /*
    { 
        categoryId: 分類Id (預約為 4), 
        interestedId: 商品、課程的 Id (prodId/courseId),
        prodQuantity: 商品要購買的數量, 課程、預約不用
    }
    */
    data: {
        default: {
            categoryId: null,
            interestedId: null,
            prodQuantity: null
        }
    },
    // reservationCart data
    rcData: {
        default: {
            roomId: null,
            reservationDate: null,
            reservationTime: null,
            detail: null
        }
    },
    btnName: {
        default: "加入購物車"
    }
})

const cart = useCartStore()

const handleAddToCart = async () => {
    const data = {
        categoryId: props.data.categoryId,
        interestedId: props.data.interestedId,
        prodQuantity: (props.data.prodQuantity == undefined) ? null : props.data.prodQuantity,

        roomId: props.rcData.roomId,
        reservationDate: props.rcData.reservationDate,
        reservationTime: props.rcData.reservationTime,
        detail: props.rcData.detail
    }
    const res = await addToCart(data)
    await cart.getCartCount()
    console.log(res.data)
}



</script>

<template>
    <button @click="handleAddToCart">{{ btnName }}</button>
</template>