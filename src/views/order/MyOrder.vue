<script setup>
import NavBar from '../../components/NavBar.vue';
import { ref } from 'vue';
import { reqGetMemberOrders } from '../../api';
import ProductOrderTable from '@/views/order/ProductOrderTable.vue'
import CourseOrderTable from '@/views/order/CourseOrderTable.vue'
import ReservationTable from '@/views/order/ReservationTable.vue'

const page = ref(0)
const orders = ref([])



const getOrders = async () => {
    const res = await reqGetMemberOrders(page.value)
    orders.value = res.data.orders
}

getOrders()

</script>

<template>
    <NavBar></NavBar>
    <div class="container">
        <h2>我的訂單</h2>
        <div v-for="order in orders" class="card mb-5 px-5 py-3 ">
            <div class="row">
                <div class="col-4">
                    <div>訂單編號: {{ order.ordId }}</div>
                    <div>下訂時間: {{ order.ordDate }}</div>
                    <div>訂單狀態: {{ order.ordStatus }}</div>
                    <div v-if="order.prodOrderItems && order.prodOrderAddress.length > 0">
                        商品運送地址: {{ order.prodOrderAddress }}
                    </div>
                </div>
                <div class="col-8">
                    <ProductOrderTable :orders=order.prodOrderItems></ProductOrderTable>
                    <CourseOrderTable :orders="order.courseOrderItems"></CourseOrderTable>
                    <ReservationTable :orders="order.reservations"></ReservationTable>
                </div>
            </div>
        </div>
    </div>
</template>