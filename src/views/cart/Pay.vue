<script setup>
import { ref } from 'vue'
import { reqInsertOrder } from '@/api/index'
import { useCartStore } from '@/stores/cart'
import ProductOrderTable from '@/views/order/ProductOrderTable.vue'
import CourseOrderTable from '@/views/order/CourseOrderTable.vue'
import ReservationTable from '@/views/order/ReservationTable.vue'

const cart = useCartStore()


</script>

<template>
    <div class="container">
        <h1>訂單</h1>
        <div class="row">
            <div class="col-6">
                <ProductOrderTable :orders="cart.productCart"></ProductOrderTable>
                <CourseOrderTable :orders="cart.courseCart"></CourseOrderTable>
                <ReservationTable :orders="cart.rsvCart"></ReservationTable>
            </div>
            <div class="col-6">
                付款資訊
            </div>
        </div>
    </div>
</template>