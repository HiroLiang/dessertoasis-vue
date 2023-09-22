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

const formattedDate = (dateString) => {
    const inputDate = new Date(dateString)
    return inputDate.toLocaleString();
}

</script>

<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="w-75 mx-auto">
            <h2>我的訂單</h2>
            <div v-for="order in orders" class="card mb-5 px-5 py-3">
                <table>
                    <tr>
                        <th>訂單編號</th>
                        <td>{{ order.ordId }}</td>
                        <th>訂單狀態</th>
                        <td>{{ order.ordStatus }}</td>
                    </tr>
                    <tr>
                        <th>下訂時間</th>
                        <td>{{ formattedDate(order.ordDate) }}</td>
                        <th>狀態更新時間</th>
                        <td>{{ formattedDate(order.updateDate) }}</td>
                    </tr>
                    <tr>
                        <th>
                            商品運送地址
                        </th>
                        <td v-if="order.prodOrderItems">
                            {{ order.prodOrderAddress }}
                        </td>
                        <td v-else>
                            無
                        </td>
                        <th>
                            訂單金額
                        </th>
                        <td>
                            NT$ {{ order.total }}
                        </td>
                    </tr>
                </table>
                <div class="mt-3">
                    <div class="mb-3">
                        <ProductOrderTable :orders=order.prodOrderItems></ProductOrderTable>
                    </div>
                    <div class="mb-3">
                        <CourseOrderTable :orders="order.courseOrderItems"></CourseOrderTable>
                    </div>
                    <div>
                        <ReservationTable :orders="order.reservations"></ReservationTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>