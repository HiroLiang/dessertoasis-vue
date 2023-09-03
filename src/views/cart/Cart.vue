<script setup>
import NavBar from '@/components/NavBar.vue'
import { getCartsByMemberId } from '../../api';
import { ref, onMounted } from 'vue';
import ReservationCart from './ReservationCart.vue';

let memberId = 1

const productCart = ref(null)
const courseCart = ref(null)
const rsvCart = ref(null)

// get all cart
onMounted(async () => {
    const res = await getCartsByMemberId(memberId)
    productCart.value = res.data.productCart
    courseCart.value = res.data.courseCart
    rsvCart.value = res.data.reservationCart
})


</script>

<template>
    <NavBar></NavBar>
    <div class="container">
        <ReservationCart :cartItems=rsvCart></ReservationCart>
    </div>
</template>

<style scoped></style>