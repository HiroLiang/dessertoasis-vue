<script setup>
import { ref } from 'vue'
import { reqInsertOrder } from '@/api/index'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import ProductOrderTable from '@/views/order/ProductOrderTable.vue'
import CourseOrderTable from '@/views/order/CourseOrderTable.vue'
import ReservationTable from '@/views/order/ReservationTable.vue'

const cart = useCartStore()

const address = ref('')

const getProductTotal = () => {
    let total = 0
    if (cart.productCart) {
        cart.productCart.forEach(item => {
            total += item.prodQuantity * item.prodPrice
        });
    }
    return total;
}

const getCourseTotal = () => {
    let total = 0
    if (cart.courseCart) {
        cart.courseCart.forEach(item => {
            total += item.coursePrice
        })
    }
    return total
}

const getRsvTotal = () => {
    let total = 0
    if (cart.rsvCart) {
        cart.rsvCart.forEach(item => {
            total += item.price
        })
    }
    return total
}

const getTotal = () => {
    return getProductTotal() + getCourseTotal() + getRsvTotal()
}


const router = useRouter()
const placeOrder = async () => {
    const data = {
        prodOrderAddress: (address.value == '') ? 'N' : address.value,
        productCartDTOs: cart.productCart,
        courseCartDTOs: cart.courseCart,
        reservationCartDTOs: cart.rsvCart
    }
    const res = await reqInsertOrder(data)
    if (res.data == 1) {
        router.push("/order")
    } else {
        console.log(res.data)
    }
}

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <h2>訂單</h2>
                <div class="mb-5" v-if="cart.productCart">
                    <ProductOrderTable :orders="cart.productCart"></ProductOrderTable>
                </div>
                <div class="mb-5" v-if="cart.courseCart">
                    <CourseOrderTable :orders="cart.courseCart"></CourseOrderTable>
                </div>
                <div v-if="cart.rsvCart">
                    <ReservationTable :orders="cart.rsvCart"></ReservationTable>
                </div>
            </div>
            <div class="col-4 px-5 py-3 card">
                <h2>結帳</h2>
                <div v-if="cart.productCart">
                    <label id="address" class="mb-3">商品運送地址</label>
                    <input type="text" id="address" v-model="address" class="form-control">
                </div>
                <hr v-if="cart.productCart">
                <div>
                    <label id="credit-card" class="mb-3">信用卡</label>
                    <input type="text" id="credit-card" placeholder="信用卡號碼" class="form-control mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" placeholder="到期日 (MM/YY)" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <input type="text" placeholder="安全驗證碼" class="form-control">
                        </div>
                    </div>
                </div>
                <hr>
                <div>
                    <div class="mb-3">訂單總和</div>
                    <div v-if="cart.productCart">商品: {{ getProductTotal() }}</div>
                    <div v-if="cart.courseCart">課程: {{ getCourseTotal() }}</div>
                    <div v-if="cart.rsvCart">預約教室: {{ getRsvTotal() }}</div>
                    <hr>
                    <div class="mb-3">NT$ {{ getTotal() }}</div>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="button" @click="placeOrder">結帳</button>
                </div>
            </div>
        </div>
    </div>
</template>