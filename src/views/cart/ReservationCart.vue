<script setup>
import { getReservationCart } from "@/api/index"
import { onMounted, ref } from "vue";
import DeleteButton from "./DeleteButton.vue";

let memberId = 1

const cart = ref([])

const loadReservationCart = async () => {
    const res = await getReservationCart(memberId)
    cart.value = res.data
}

onMounted(() => { loadReservationCart() })

const timeMap = {
    A: "早上",
    B: "下午",
    C: "晚上"
}


</script>

<template>
    <div class="container" v-if="cart.length > 0">
        <div>教室預約</div>
        <table class="table">
            <thead>
                <tr>
                    <th>教室</th>
                    <th>教室位址</th>
                    <th>預約日期</th>
                    <th>預約時段</th>
                    <th>預約價格</th>
                    <th>刪除</th>
                </tr>
            </thead>
            <tbody v-for="cartItem in cart">
                <tr>
                    <td>{{ cartItem.classroom.roomName }}</td>
                    <td>{{ cartItem.classroom.roomLocation }}</td>
                    <td>{{ cartItem.reservationDate }}</td>
                    <td>{{ timeMap[cartItem.reservationTime] }}</td>
                    <td>{{ cartItem.price }}</td>
                    <td>
                        <DeleteButton :cart-id="cartItem.cartId" @delete="loadReservationCart"></DeleteButton>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>