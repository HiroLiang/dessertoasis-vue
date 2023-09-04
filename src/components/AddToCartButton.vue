<script setup>
import { ref } from 'vue'
import { addToCart, addToReservationCart } from '../api/index'

let memberId = 1;

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

const handleAddToCart = async () => {
    const data = {
        memberId,
        categoryId: props.data.categoryId,
        interestedId: props.data.interestedId,
        prodQuantity: (props.data.prodQuantity == undefined) ? null : props.data.prodQuantity
    }
    if (data.categoryId == 4) {
        const rcData = {
            roomId: props.rcData.roomId,
            reservationDate: props.rcData.reservationDate,
            reservationTime: props.rcData.reservationTime,
            detail: props.rcData.detail
        }
        const res = await addToReservationCart(rcData)
        data.interestedId = res.data.id
        console.log(res.data.id)
    }
    const res = await addToCart(data)
    console.log(res.data)
}

</script>

<template>
    <button @click="handleAddToCart">{{ btnName }}</button>
</template>