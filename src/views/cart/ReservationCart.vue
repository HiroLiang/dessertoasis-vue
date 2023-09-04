<script setup>
import { getReservationCart } from "@/api/index"
import { onMounted, ref, computed, watch } from "vue";
import DeleteButton from "./DeleteButton.vue";

let memberId = 1

const cart = ref([])

const loadReservationCart = async () => {
    const res = await getReservationCart(memberId)
    cart.value = res.data
    checkReservations()
}

onMounted(() => { loadReservationCart() })

const timeMap = {
    A: "早上",
    B: "下午",
    C: "晚上"
}

// 計算總和
const total = computed(() => {
    let t = 0
    cart.value.forEach(item => {
        t += item.price
    })
    return t
})



const emits = defineEmits(["getReservations"])

const checked = ref(true)

const checkReservations = () => {
    if (checked.value && cart.value.length > 0) {
        emits("getReservations", cart.value, total.value)
    } else {
        emits("getReservations", null, 0)
    }
}

watch(() => checked.value, () => checkReservations())

</script>

<template>
    <div class="container" v-if="cart.length > 0">
        <h2>
            教室預約 <input type="checkbox" v-model="checked">
        </h2>
        <table class="table caption-top">
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
            <tfoot>
                <td colspan="4"></td>
                <td>總共: {{ total }}</td>
            </tfoot>
        </table>
    </div>
</template>