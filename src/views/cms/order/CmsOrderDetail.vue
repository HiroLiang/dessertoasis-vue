<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import ProductOrderTable from '@/views/order/ProductOrderTable.vue'
import CourseOrderTable from '@/views/order/CourseOrderTable.vue'
import ReservationTable from '@/views/order/ReservationTable.vue'
import { reqGetOrder, reqUpdateOrdStatus, reqDeleteOrder } from '@/api'

const route = useRoute()
const router = useRouter()
const order = ref(null)
const ordId = route.query.id

// 取得訂單
const getOrder = async () => {
    const res = await reqGetOrder(ordId)
    order.value = res.data
}

getOrder()

const updateOrdStatus = async () => {
    const res = await reqUpdateOrdStatus(ordId, order.value.ordStatus)
    order.value.updateDate = res.data.updateDate
}

const deleteOrder = async () => {
    await reqDeleteOrder(ordId)
    router.push("/cms/order")
}

const handleClickDeleteButton = () => {
    let ans = confirm("確定要刪除此筆訂單？")
    if (ans) {
        deleteOrder()
    }
}

const formattedDate = (dateString) => {
    const inputDate = new Date(dateString)
    return inputDate.toLocaleString();
}

</script>

<template>
    <div class="container" v-if="order">
        <div class="w-75 mx-auto mt-5">
            <div class="card mb-3 px-5 py-3">
                <table>
                    <tr>
                        <th>訂單編號</th>
                        <td>{{ order.ordId }}</td>
                        <th>訂單狀態</th>
                        <td>
                            <select v-model="order.ordStatus" @change="updateOrdStatus">
                                <option value="已下訂">已下訂</option>
                                <option value="處理中">處理中</option>
                                <option value="已完成">已完成</option>
                            </select>
                        </td>
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
            <div class="text-end">
                <button class="btn btn-danger me-2" @click="handleClickDeleteButton">刪除</button>
                <button class="btn btn-primary" @click="router.push('/cms/order')">返回搜尋</button>
            </div>
        </div>
    </div>
</template>